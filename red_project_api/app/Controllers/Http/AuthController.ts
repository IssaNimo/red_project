import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SignUpTask from 'App/Tasks/SignUpTask'
import SignInTask from 'App/Tasks/SignInTask'
import SignUpValidator from 'App/Validators/SignUpValidator'
import SignInValidator from 'App/Validators/SignInValidator'
import AuthenticateTask from 'App/Tasks/AuthenticateTask'
import { SuccessCode } from 'App/Enums/SuccessCode'

export default class AuthController {
  public async signUp({ request }: HttpContextContract) {
    const payload = await request.validate(SignUpValidator)
    
    return {
      success: true,
      success_code: SuccessCode.SIGN_UP,
      success_message: 'Successfully registered',
      data: await new SignUpTask().run(payload)
    }
  }

  public async signIn({ request }: HttpContextContract) {
    const payload = await request.validate(SignInValidator)
    
    return {
      success: true,
      success_code: SuccessCode.SIGN_IN,
      success_message: 'Successfully logged in',
      data: await new SignInTask().run(payload)
    }
  }

  public async logout({ request }: HttpContextContract) {
    const token = request.header('Authorization')?.replace('Bearer ', '')
    
    if (token) {
      await new AuthenticateTask().logout(token)
    }

    return {
      success: true,
      success_code: SuccessCode.LOGOUT,
      success_message: 'Successfully logged out'
    }
  }

  public async logoutAll({ request }: HttpContextContract) {
    await new AuthenticateTask().logoutAll(request.user.id)

    return {
      success: true,
      success_code: SuccessCode.LOGOUT_ALL,
      success_message: 'Successfully logged out from all devices'
    }
  }
} 