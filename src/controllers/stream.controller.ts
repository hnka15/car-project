import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { StreamService } from 'src/services/stream.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('upload')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handle(@UploadedFile() file) {
    if (!file) {
      throw new Error('No file uploaded.')
    }

    return await this.streamService.readCSV(file.path)
  }
}
