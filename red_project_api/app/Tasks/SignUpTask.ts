import User from 'App/Models/User'
import AuthenticateTask from './AuthenticateTask'
import GetLoggedInUserTask from './GetLoggedInUserTask'
import SendEmailVerificationMail from 'App/Mailers/SendEmailVerificationMail'
import AppException from 'App/Exceptions/AppException'
import { formatPhoneNumber } from 'App/Helpers/PhoneHelper'

export default class SignUpTask {
  public async run(payload: any) {
    const phone_number = formatPhoneNumber(payload.phone_number)
    
    await this.validateUniquePhone(phone_number)

    const user = await User.create({
      email: payload.email,
      phone_number: phone_number,
      name: payload.name,
      password_hash: payload.password,
      is_admin: payload.is_admin || false
    })

    await new SendEmailVerificationMail(user).send()

    const token = await new AuthenticateTask().run(user)

    return {
      token,
      user: await new GetLoggedInUserTask().run(user.id),
    }
  }

  private async validateUniquePhone(phone_number: string) {
    const existingUser = await User.findBy('phone_number', phone_number)
    if (existingUser) {
      throw new AppException('Phone number already in use', 428)
    }
  }
} 