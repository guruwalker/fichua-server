import type { HttpContext } from '@adonisjs/core/http'
import Cases from '../models/cases.ts'
// import { updateUserValidator } from '#validators/user_validator'

export default class CasesController {
  /**
   * *
   * Get all cases
   * *
   */
  async index({ response, request }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = 10
      const cases = await Cases.query()
        .select('*')
        .from('cases')
        .preload('reporter')
        .preload('assigned')
        .paginate(page, limit)

      return response.json({
        success: true,
        message: 'All cases fetched successfully',
        data: cases,
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
   * Create new case
   */
  async create({ request, response }: HttpContext) {
    try {
      // const payload = await request.validateUsing(createUserValidator)
      const payload = request.all()
      const cases = await Cases.create(payload)

      return response.json({
        success: true,
        message: 'Case created successfully',
        data: cases,
      })
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return response.status(400).json({
          success: false,
          message: 'Case already exists',
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
   * *
   * Get single case
   * *
   */
  async show({ params, response }: HttpContext) {
    try {
      // const cases = await Cases.find(params.id)
      const cases = await Cases.query()
        .where('id', params.id)
        .preload('reporter')
        .preload('assigned')
        .first()
      return response.json({
        success: true,
        message: 'Case fetched successfully',
        data: cases,
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
   * Update single case
   * *
   */
  async update({ params, request, response }: HttpContext) {
    try {
      // const payload = await request.validateUsing(updateUserValidator)
      const payload = await request.all()
      const cases = await Cases.findByOrFail('id', params.id)
      cases.merge(payload)
      await cases.save()

      return response.json({
        success: true,
        message: 'Case updated successfully!',
        data: cases,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: 'Error updating case:',
        data: error.message || 'Unknown error',
      })
    }
  }

  /**
   * *
   * Delete single case
   * *
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const cases = await Cases.findOrFail(params.id)

      await cases.delete()
      return response.json({
        success: true,
        message: 'Successfully deleted the case',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The case does not exist',
          data: null,
          code: 'E_ROW_NOT_FOUND',
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the case because it has related records',
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
