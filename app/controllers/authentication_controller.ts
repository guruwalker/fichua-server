import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import User from '../models/user.ts'
import { createUserValidator } from '#validators/user_validator'
import hash from '@adonisjs/core/services/hash'

export default class AuthenticationController {
  /**
   * Register New User
   */
  async register({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createUserValidator)
      const userData = await User.create(payload)

      const emailResponse = await mail.send((message) => {
        message
          .to(payload.email)
          .from('guruthewalker@gmail.com')
          .subject('Verify your email address')
          .htmlView('emails/verify_email', { payload })
      })

      console.log('emailResponse', emailResponse)

      return response.json({
        success: true,
        message: 'User created successfully',
        data: userData,
      })
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return response.status(400).json({
          success: false,
          message: 'User already exists',
          data: null,
          code: 'ER_DUP_ENTRY',
        })
      }
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  /**
   * Login
   */
  async login({ request, auth, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])
      const user = await User.verifyCredentials(email, password)
      // authenticate
      // await auth.use('api').login(user)
      // const user1 = await auth.authenticate()
      // const user = await auth.authenticateUsing('api')

      // assign token
      const token = await User.accessTokens.create(user)
      console.log('token', token)
      // console.log('user1', user1)

      return response.json({
        success: true,
        message: 'User logged in successfully',
        data: {
          user,
          token,
        },
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }
}
