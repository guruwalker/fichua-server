import type { HttpContext } from '@adonisjs/core/http'

import User from '../models/user.ts'

import { createUserValidator } from '#validators/user_validator'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const users = await User.query().select('*').from('users')
      return response.json({
        success: true,
        message: 'Users fetched successfully',
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
   * Display form to create a new record
   */
  async create({ request, response }: HttpContext) {
    try {
      // const data = request.all()
      // const payload = await createUserValidator.validate(data)
      const payload = await request.validateUsing(createUserValidator)
      const userData = await User.create(payload)
      return response.json({
        success: true,
        message: 'User created successfully',
        data: userData,
      })
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // Duplicate entry error
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
   * Show individual record
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
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {}

  /**
   * Delete record
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
