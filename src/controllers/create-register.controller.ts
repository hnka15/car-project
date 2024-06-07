import { Controller, Post, Body, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipes'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const createRegisterSchema = z.object({
  mod_fiscal: z.number(),
  num_area: z.number(),
  municipio: z.string(),
  nome_propr: z.string(),
  cpf_cnpj: z.string(),
  proprietar: z.string(),
  situacao: z.string(),
  shape_leng: z.number(),
  shape_area: z.number(),
})

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
