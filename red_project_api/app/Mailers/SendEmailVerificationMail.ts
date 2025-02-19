import User from 'App/Models/User'

export default class SendEmailVerificationMail {
  constructor(private user: User) {}

  public async send() {
   
    console.log(`Verification email would be sent to ${this.user.email}`)
  }
} 