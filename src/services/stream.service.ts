import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as csvParser from 'csv-parser'
import { PrismaService } from './prisma.service'

@Injectable()
export class StreamService {
  constructor(private readonly prisma: PrismaService) {}

  async readCSV(path: string) {
    let contador = 0
    const batchSize = 200 // Tamanho do lote para inserção em massa
    const batch = []

    return new Promise<void>((resolve, reject) => {
      const stream = fs
        .createReadStream(path)
        .pipe(csvParser({ separator: ';' }))

      stream.on('data', async (data) => {
        // Pausa o stream para esperar a operação assíncrona terminar

        contador++
        console.log('data', data)

        // Adiciona o dado ao lote
        batch.push({
          cod_imovel: data.cod_imovel,
          mod_fiscal: parseFloat(data.mod_fiscal),
          num_area: parseFloat(data.num_area),
          municipio: data.municipio,
          nome_propr: data.nome_propr,
          cpf_cnpj: data.cpf_cnpj,
          proprietar: data.proprietar,
          situacao: data.situacao,
          shape_leng: parseFloat(data.shape_leng),
          shape_area: parseFloat(data.shape_area),
        })

        // Se o lote atingir o tamanho definido, insere os dados no banco
        if (batch.length >= batchSize) {
          stream.pause()
          console.log('Linhas lidas:', contador)

          try {
            await this.prisma.propriety.createMany({
              data: batch,
              skipDuplicates: true, // Ignora duplicados (se aplicável)
            })
            console.log(`Inserido lote de ${batch.length} registros.`)
            batch.length = 0 // Limpa o lote após a inserção
          } catch (error) {
            console.error('Error creating propriety batch:', error)
            reject(error)
          }
        }

        // Retoma o stream após a operação assíncrona terminar
        stream.resume()
      })

      stream.on('end', async () => {
        // Insere qualquer dado remanescente no lote
        if (batch.length > 0) {
          try {
            await this.prisma.propriety.createMany({
              data: batch,
              skipDuplicates: true,
            })
            console.log(`Inserido lote final de ${batch.length} registros.`)
          } catch (error) {
            console.error('Error creating final propriety batch:', error)
            reject(error)
          }
        }
        console.log('CSV lido, contador: ', contador)
        resolve()
      })

      stream.on('error', (error) => {
        console.error('Error reading CSV file:', error)
        reject(error)
      })
    })
  }
}
