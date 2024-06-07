import { cpfCnpjSchema } from 'src/utils/validators/cpf.validator'
import { zodNumberSchema } from 'src/utils/validators/float-number.validator'
import { municipioSchema } from 'src/utils/validators/municipio.validator'
import { z } from 'zod'

export const createRegisterSchema = z.object({
  mod_fiscal: zodNumberSchema,
  num_area: zodNumberSchema,
  municipio: municipioSchema,
  nome_propr: z.string(),
  cpf_cnpj: cpfCnpjSchema,
  proprietar: z.string(),
  situacao: z.enum(['Ativo', 'Pendente', 'Cancelado']),
  shape_leng: zodNumberSchema,
  shape_area: zodNumberSchema,
})
