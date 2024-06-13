import { v4 as uuidv4 } from 'uuid'

// const cod_municipio = {}

export function uuidGenerator(): string {
  // Gerar 7 números aleatórios
  const sevenNumbers = '1234567'

  // Gerar um UUID de 32 digitos
  const uuidPart = uuidv4().replace(/-/g, '').toUpperCase()

  // Concatenar no formato desejado
  return `GO-${sevenNumbers}-${uuidPart}`
}
