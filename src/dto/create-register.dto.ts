import { zodNumberSchema } from 'src/utils/validators/float-number.validator'
import { z } from 'zod'

export const createRegisterSchema = z.object({
  mod_fiscal: zodNumberSchema,
  num_area: zodNumberSchema,
  municipio: z.string().min(3),
  nome_propr: z.string(),
  cpf_cnpj: z.string().min(11),
  proprietar: z.string(),
  situacao: z.enum(['Ativo', 'Pendente', 'Cancelado']),
  shape_leng: zodNumberSchema,
  shape_area: zodNumberSchema,
})
