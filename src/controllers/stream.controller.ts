import { Body, Controller, Post } from '@nestjs/common'
import { StreamService } from 'src/services/stream.service'
import { readCsvSchema } from 'src/dto/read-csv.dto'
import { z } from 'zod'
// import { prisma } from '../client'
type ReadCsvSchema = z.infer<typeof readCsvSchema>

@Controller('read')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Post()
  async handle(@Body() body: ReadCsvSchema) {
    const { path } = body
    return await this.streamService.readCSV(path)
  }
}
