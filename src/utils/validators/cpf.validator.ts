import { z } from 'zod'

export const cpfCnpjSchema = z
  .string()
  .min(11)
  .refine((value) => {
    value = value.replace(/[^\d]+/g, '')

    if (value.length === 11) {
      const cpf = value // Remove todos os caracteres que não são dígitos
      if (/^(\d)\1{10}$/.test(cpf)) {
        return false // Verifica se o CPF tem 11 dígitos ou todos os dígitos são iguais
      }

      let sum = 0
      let remainder

      for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
      }

      remainder = (sum * 10) % 11

      if (remainder === 10 || remainder === 11) {
        remainder = 0
      }

      if (remainder !== parseInt(cpf.substring(9, 10))) {
        return false
      }

      sum = 0

      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
      }

      remainder = (sum * 10) % 11

      if (remainder === 10 || remainder === 11) {
        remainder = 0
      }

      if (remainder !== parseInt(cpf.substring(10, 11))) {
        return false
      }

      return true
    } else {
      if (value.length === 14) {
        const cnpj = value

        if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
          return false // Verifica se o CNPJ tem 14 dígitos ou todos os dígitos são iguais
        }

        let length = cnpj.length - 2
        let numbers = cnpj.substring(0, length)
        const digits = cnpj.substring(length)
        let sum = 0
        let pos = length - 7

        for (let i = length; i >= 1; i--) {
          sum += parseInt(numbers.charAt(length - i)) * pos--
          if (pos < 2) {
            pos = 9
          }
        }

        let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)

        if (result !== parseInt(digits.charAt(0))) {
          return false
        }

        length += 1
        numbers = cnpj.substring(0, length)
        sum = 0
        pos = length - 7

        for (let i = length; i >= 1; i--) {
          sum += parseInt(numbers.charAt(length - i)) * pos--
          if (pos < 2) {
            pos = 9
          }
        }

        result = sum % 11 < 2 ? 0 : 11 - (sum % 11)

        if (result !== parseInt(digits.charAt(1))) {
          return false
        }

        return true
      }
    }
  })
