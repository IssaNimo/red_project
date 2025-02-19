import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { tokenService } from 'App/Services/TokenService'

export default class AuthMiddleware {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const token = request.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return response.unauthorized({ error: 'Authentication required' })
    }

    const session = await tokenService.verifyToken(token)
    if (!session) {
      return response.unauthorized({ error: 'Invalid or expired token' })
    }

    request.user = session.user
    request.session = session

    await next()
  }
} 