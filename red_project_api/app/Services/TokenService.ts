import { DateTime } from 'luxon'
import Encryption from '@ioc:Adonis/Core/Encryption'
import Session from 'App/Models/Session'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class TokenService {
  public async generateToken(
    userId: number, 
    ctx?: HttpContextContract,
    expiresIn: number = 30 // days
  ) {
    const token = Encryption.encrypt(
      `${userId}|${DateTime.now().toMillis()}`,
      '2h'
    )

    const session = await Session.create({
      userId,
      token,
      ip_address: ctx?.request.ip(),
      user_agent: ctx?.request.header('user-agent'),
      last_activity_at: DateTime.now(),
      expires_at: DateTime.now().plus({ days: expiresIn }),
    })

    return session.token
  }

  public async verifyToken(token: string): Promise<Session | null> {
    const session = await Session.query()
      .where('token', token)
      .where('expires_at', '>', DateTime.now().toSQL())
      .preload('user')
      .first()

    if (!session) {
      return null
    }

    session.last_activity_at = DateTime.now()
    await session.save()

    return session
  }

  public async revokeToken(token: string) {
    await Session.query().where('token', token).delete()
  }

  public async revokeAllUserTokens(userId: number) {
    await Session.query().where('user_id', userId).delete()
  }
}

export const tokenService = new TokenService() 