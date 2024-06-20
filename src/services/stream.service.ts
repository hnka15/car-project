import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as csvParser from 'csv-parser'
import { PrismaService } from './prisma.service'
import { Prisma } from '@prisma/client'
import { table } from 'console'

const date = new Date()

@Injectable()
export class StreamService {
  constructor(private readonly prisma: PrismaService) {}

  async readCSV(path: string) {
    // nome da tabela com hifen da erro na hora de criar
    const tableName =
      date.getMonth().toString() + '_' + date.getFullYear().toString() + '_CAR'

    const batchSize = 100 // Tamanho do lote para inserção em massa
    const batch = []

    let contador = 0

    // Checa se a tabela existe
    const result = await this.tableExists(tableName)

    if (!result) {
      console.log(
        `Tabela ${tableName} nao existe, criando uma tabela com este nome...`,
      )

      await this.createTable(tableName)
    }

    // Lendo o CSV
    return new Promise<void>((resolve, reject) => {
      const stream = fs
        .createReadStream(path)
        .pipe(csvParser({ separator: ';' }))

      stream.on('data', async (data) => {
        contador++

        batch.push([
          data.cod_imovel,
          parseFloat(data.mod_fiscal),
          parseFloat(data.num_area),
          data.municipio,
          data.nome_propr,
          data.cpf_cnpj,
          data.proprietar,
          data.situacao,
          parseFloat(data.shape_leng),
          parseFloat(data.shape_area),
        ])

        if (batch.length >= batchSize) {
          stream.pause()
          await this.insertData(tableName, batch)

          batch.length = 0
          console.log('Linhas lidas:', contador)
          stream.resume()
        }
      })

      stream.on('end', async () => {
        if (batch.length > 0) {
          try {
            await this.insertData(tableName, batch)
            console.log('Linhas lidas:', contador)
          } catch (error) {
            console.error('Error creating final propriety batch:', error)
            reject(error)
          }
        }
        resolve()
      })

      stream.on('error', (error) => {
        console.error('Error reading CSV file:', error)
        reject(error)
      })
    })
  }

  async createTable(tableName: string) {
    try {
      await this.prisma.$executeRawUnsafe(`
            CREATE TABLE ${tableName} (
                cod_imovel VARCHAR(255) PRIMARY KEY,
                mod_fiscal FLOAT,
                num_area FLOAT,
                municipio VARCHAR(255),
                nome_propr VARCHAR(255),
                cpf_cnpj VARCHAR(255),
                proprietar VARCHAR(255),
                situacao VARCHAR(255),
                shape_leng FLOAT,
                shape_area FLOAT
            );`)
      console.log(`Tabela ${tableName} criada com sucesso.`)
    } catch (error) {
      console.error('Erro ao criar a tabela "propriety":', error)
      throw error
    }
  }

  async tableExists(tableName: string) {
    const result = await this.prisma.$queryRaw`
    SELECT COUNT(*) as table_exists
    FROM information_schema.tables
    WHERE table_schema = 'car' AND table_name = ${tableName};`

    console.log(result[0].table_exists > 0)

    return result[0].table_exists > 0 // retorna array de objetos
  }

  async insertData(tableName: string, batch) {
    try {
      const res = await this.prisma.$executeRaw`
        INSERT IGNORE INTO ${Prisma.raw(`\`${tableName}\``)}
        ( cod_imovel, mod_fiscal,num_area, municipio,nome_propr,cpf_cnpj,proprietar, situacao, shape_leng, shape_area)
        VALUES ${Prisma.join(
          batch.map((row) => Prisma.sql`(${Prisma.join(row)})`),
        )}
        ;`

      console.log('retorno: ', res)
    } catch (error) {
      console.error(error)
    }
  }
}
