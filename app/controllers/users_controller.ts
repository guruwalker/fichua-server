import type { HttpContext } from '@adonisjs/core/http'
// import mail from '@adonisjs/mail/services/main'
import User from '../models/user.ts'
import { updateUserValidator } from '#validators/user_validator'

export default class UsersController {
  /**
   * *
   * Get all users
   * *
   */
  async index({ response, request }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = 10
      const user = await User.query().select('*').from('users').paginate(page, limit)

      return response.json({
        success: true,
        message: 'Users fetched successfully',
        data: user,
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
   * *
   * Get single user
   * *
   */
  async show({ params, response }: HttpContext) {
    try {
      const users = await User.find(params.id)
      return response.json({
        success: true,
        message: 'User fetched successfully',
        data: users,
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
   * *
   * Update single user
   * *
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateUserValidator)
      const user = await User.findByOrFail('id', params.id)
      user.merge(payload)
      await user.save()

      return response.json({
        success: true,
        message: 'User updated successfully!',
        data: user,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: 'Error updating user:',
        data: error,
      })
    }
  }

  /**
   * *
   * Delete single user
   * *
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.json({
        success: true,
        message: 'Successfully deleted the user',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The user does not exist',
          data: null,
          code: 'E_ROW_NOT_FOUND',
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the user because it has related records',
          data: null,
          code: 'ER_ROW_IS_REFERENCED_2',
        })
      }

      return response.status(500).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }
}
