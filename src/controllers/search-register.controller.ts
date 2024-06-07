import { Controller, Get, Query } from '@nestjs/common'
import { SearchRegisterDto } from 'src/dto/search-register.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('register')
export class SearchRegisterController {
  constructor(private prisma: PrismaService) {}

  @Get('search')
  async handle(@Query() query: SearchRegisterDto) {
    const result = this.prisma.propriety.findMany({
      where: query,
    })
    return result
  }
}
