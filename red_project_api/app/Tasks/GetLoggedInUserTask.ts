import User from 'App/Models/User'

export default class GetLoggedInUserTask {
  public async run(userId: number) {
    return await User.findOrFail(userId)
  }
} 