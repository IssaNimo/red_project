import { Exception } from '@adonisjs/core/build/standalone'

export default class AppException extends Exception {
  public code: string
  public data: any

  public static fromCode(code: number, data: any = {}) {
    const error = new this(`Error code: ${code}`, 500)
    error.code = String(code)
    error.data = data
    return error
  }
} 