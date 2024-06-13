import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as csvParser from 'csv-parser'
import { PrismaService } from './prisma.service'

@Injectable()
export class StreamService {
  constructor(private readonly prisma: PrismaService) {}

  async readCSV(path: string) {
    let contador = 0

    return new Promise<void>((resolve, reject) => {
      const stream = fs
        .createReadStream(path)
        .pipe(csvParser({ separator: ';' }))

      stream.on('data', async (data) => {
        // Pausa o stream para esperar a operação assíncrona terminar
        stream.pause()

        contador++
        console.log('data', data)

        try {
          await this.prisma.propriety.create({
            data: {
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
            },
          })
          console.log('##############')
        } catch (error) {
          console.error('Error creating propriety:', error)
          reject(error)
        }

        // Retoma o stream após a operação assíncrona terminar
        stream.resume()
      })

      stream.on('end', () => {
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
