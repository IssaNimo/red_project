import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import AuthenticateTask from './AuthenticateTask'
import GetLoggedInUserTask from './GetLoggedInUserTask'
import AppException from 'App/Exceptions/AppException'

export default class SignInTask {
  public async run(payload: any) {
    const user = await User.query()
      .where('email', payload.email)
      .first()

    if (!user || !(await Hash.verify(user.password_hash, payload.password))) {
      throw new AppException('Invalid credentials', 401)
    }

    const token = await new AuthenticateTask().run(user)

    return {
      token,
      user: await new GetLoggedInUserTask().run(user.id),
    }
  }
} 