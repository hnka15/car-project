import { z } from 'zod'

export const zodNumberSchema = z.number().refine(
  (value) => {
    // Verificar se o valor tem no máximo 19 dígitos antes do ponto decimal
    const [integerPart, fractionalPart] = value.toString().split('.')

    return (
      integerPart.length <= 11 &&
      (!fractionalPart || fractionalPart.length <= 19)
    )
  },
  {
    message:
      'The number must be a float with up to 8 digits before the decimal point and up to 11 digits after the decimal point.',
  },
)
