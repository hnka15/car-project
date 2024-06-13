import { Controller, Get } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'

@Controller('register')
export class ListRegisterController {
  constructor(private prisma: PrismaService) {}

  @Get('list')
  async handle() {
    const registers = await this.prisma.propriety.findMany()
    return { registers } // retorna um objeto e nao o array direto
  }
}
