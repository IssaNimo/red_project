import User from 'App/Models/User'
import { tokenService } from 'App/Services/TokenService'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthenticateTask {
  public async run(user: User, ctx?: HttpContextContract) {
    const token = await tokenService.generateToken(user.id, ctx)

    return token
  }

  public async logout(token: string) {
    await tokenService.revokeToken(token)
  }

  public async logoutAll(userId: number) {
    await tokenService.revokeAllUserTokens(userId)
  }
} 