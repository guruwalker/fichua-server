import type { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'
import mail from '@adonisjs/mail/services/main'
import User from '../models/user.ts'
import { createUserValidator } from '#validators/user_validator'

import { forgotPasswordValidator, resetPasswordValidator } from '#validators/auth_validator'
// import hash from '@adonisjs/core/services/hash'

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
          .htmlView('emails/register_verify_email', { payload })
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
  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])
      // authenticate
      const user = await User.verifyCredentials(email, password)
      // assign token
      const token = await User.accessTokens.create(user)

      return response.json({
        success: true,
        message: 'User logged in successfully',
        data: {
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            fullName: user.full_name,
            nationalID: user.national_id,
          },
          token: token.value!.release(),
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

  /**
   * Reset Password
   */
  async resetPassword({ request, response }: HttpContext) {
    try {
      const payload = request.all()
      console.log('payload', payload)

      const user = await User.findByOrFail('id', payload.user_id)

      if (!user) {
        return response.json({
          success: false,
          message: 'User not does not exist',
          data: null,
        })
      }

      if (payload.password !== payload.confirm_password) {
        return response.status(400).json({
          success: false,
          message: 'Passwords do not match',
          data: null,
        })
      } else {
        // Update user password
        user.password = payload.password
        await user.save()
      }

      // Implement your logic to reset password here
      user.password = payload.password
      await user.save()

      // Send password reset email
      await mail.send((message) => {
        message
          .to(user.email)
          .from('guruthewalker@gmail.com')
          .subject('Password Reset')
          .html('You requested a password reset.')
      })

      return response.json({
        success: true,
        message: 'Password reset successfully. Check your email for the new password.',
        data: null,
      })
    } catch (error) {
      // Handle errors
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  /**
   * Forgot Password
   */
  async forgotPassword({ request, response }: HttpContext) {
    try {
      const payload = request.all()
      console.log('payload', payload)

      const user = await User.findBy('email', payload.email)

      if (!user) {
        return response.json({
          success: false,
          message: 'User not does not exist',
          data: null,
        })
      }

      // Generate password reset token
      const generateResetToken = (userId: number): string => {
        const secretKey = 'your_secret_key'
        const expiresIn = '24h'

        const jwtPayload = {
          user_id: userId,
          type: 'resetPassword',
        }

        return jwt.sign(jwtPayload, secretKey, { expiresIn })
      }

      const token = generateResetToken(user.id)

      // Send password reset email
      await mail.send((message) => {
        message
          .to(user.email)
          .from('guruthewalker@gmail.com')
          .subject('Forgot Password')
          .html(
            'To reset your password, click <a href="http://localhost:3000/reset-password?token=' +
              token +
              '">here</a>.'
          )
      })

      return response.json({
        success: true,
        message: 'Password reset instructions sent to your email',
        data: null,
      })
    } catch (error) {
      // Handle errors
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }
}
