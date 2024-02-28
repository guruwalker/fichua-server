import type { HttpContext } from '@adonisjs/core/http'
import Cases from '../models/cases.ts'
import User from '../models/user.ts'

export default class PagesController {
  /**
   * *
   * Profile page
   * *
   */
  async profile({ response, params }: HttpContext) {
    try {
      const userData = await User.find(params.id)

      const cases = await Cases.query().where('reported_by', params.id).preload('assigned')

      return response.json({
        success: true,
        message: 'User profile fetched successfully',
        data: {
          user: userData,
          cases: cases,
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
   * *
   * Updates page
   * *
   */
  async updates({ response }: HttpContext) {
    try {
      const updates = await Cases.query().orderBy('id', 'desc').limit(10)

      return response.json({
        success: true,
        message: 'Updates fetched successfully',
        data: updates,
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
   * Overview page
   * *
   */
  async overview({ response }: HttpContext) {
    try {
      const officers = await User.query().select('*').from('users').where('role', 'officer')
      const regularUsers = await User.query().select('*').from('users').where('role', 'user')
      const numberOfCases = await Cases.query().select('*').from('cases')
      const numberOfUsers = await Cases.query().select('*').from('users')
      const closedCases = await Cases.query().where('is_closed', true)
      const openCases = await Cases.query().where('is_closed', false)

      return response.json({
        success: true,
        message: 'Overview data fetched successfully',
        data: {
          officers: officers.length,
          regularUsers: regularUsers.length,
          numberOfCases: numberOfCases.length,
          numberOfUsers: numberOfUsers.length,
          closedCases: closedCases.length,
          openCases: openCases.length,
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
   * *
   * Analytics page
   * *
   */
  async analytics({ response }: HttpContext) {
    try {
      // Query to get the number of closed cases for each officer
      const allClosedCases = await Cases.query().select('*').from('cases').where('is_closed', true)
      const closedCasesByOfficer: Record<number, number> = allClosedCases.reduce(
        (acc: Record<number, number>, item: any) => {
          const officerId: number = item.closed_by
          acc[officerId] = acc[officerId] ? acc[officerId] + 1 : 1
          return acc
        },
        {}
      )
      // Construct data for the bar chart
      const barChartData = Object.keys(closedCasesByOfficer).map((officerId: string) => ({
        officer_id: Number.parseInt(officerId),
        number_of_closed_cases: closedCasesByOfficer[Number.parseInt(officerId)],
      }))
      // const officers = await User.query().select('*').from('users').where('role', 'officer')
      // const regularUsers = await User.query().select('*').from('users').where('role', 'user')
      // const numberOfCases = await Cases.query().select('*').from('cases')
      // const numberOfUsers = await Cases.query().select('*').from('users')
      const closedCases = await Cases.query().where('is_closed', true)
      const openCases = await Cases.query().where('is_closed', false)

      return response.json({
        success: true,
        message: 'Overview data fetched successfully',
        data: {
          pie_chart: {
            open_cases: openCases.length,
            closed_cases: closedCases.length,
          },
          bar_chart: barChartData,
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
