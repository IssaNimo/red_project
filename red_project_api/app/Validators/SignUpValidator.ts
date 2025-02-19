import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignUpValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' })
    ]),
    phone_number: schema.string.optional({ trim: true }),
    password: schema.string([rules.minLength(6)]),
    is_admin: schema.boolean.optional()
  })

  public messages: CustomMessages = {
 
    'name.required': 'Name is required',
    'email.required': 'Email is required',
    'password.required': 'Password is required',

    'email.email': 'Please provide a valid email address',
    'email.unique': 'This email is already registered',

    'password.minLength': 'Password must be at least 6 characters long',

    'is_admin.boolean': 'Admin status must be true or false',

    'phone_number.string': 'Phone number must be a valid string'
  }
} 