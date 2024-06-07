import { v4 as uuidv4 } from 'uuid'

export function uuidGenerator(): string {
  // Gerar 7 números aleatórios
  const sevenNumbers = Math.floor(1000000 + Math.random() * 9000000).toString()

  // Gerar um UUID de 32 digitos
  const uuidPart = uuidv4().replace(/-/g, '').toUpperCase()

  // Concatenar no formato desejado
  return `GO-${sevenNumbers}-${uuidPart}`
}
