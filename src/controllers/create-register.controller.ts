import { Controller, Post, Body, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from 'src/utils/pipes/zod-validation-pipes'
import { PrismaService } from 'src/services/prisma.service'
import { z } from 'zod'
import { createRegisterSchema } from 'src/dto/create-register.dto'
import { uuidGenerator } from 'src/utils/uuid-generator'

// pra definir o tipo do body
type CreateRegisterSchema = z.infer<typeof createRegisterSchema>

@Controller('register')
export class CreateRegisterController {
  // declara o serviço como ma dependencia desse codigo
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createRegisterSchema))
  async handle(@Body() body: CreateRegisterSchema) {
    const {
      mod_fiscal,
      num_area,
      municipio,
      nome_propr,
      cpf_cnpj,
      proprietar,
      situacao,
      shape_leng,
      shape_area,
    } = body

    await this.prisma.propriety.create({
      data: {
        cod_imovel: uuidGenerator(),
        mod_fiscal,
        num_area,
        municipio,
        nome_propr,
        cpf_cnpj,
        proprietar,
        situacao,
        shape_leng,
        shape_area,
      },
    })
  }
}
