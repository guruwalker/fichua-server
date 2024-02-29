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
      // Horizontal bar chart
      const allClosedCases = await Cases.query()
        .select('*')
        .from('cases')
        .where('is_closed', true)
        .preload('assigned')

      // Initialize an object to store closed cases by officer ID
      const closedCasesByOfficer: Record<
        number,
        { number_of_closed_cases: number; officer_details: any }
      > = {}

      // Iterate over closed cases to populate closedCasesByOfficer
      allClosedCases.forEach((item) => {
        const officerId: number = item.closed_by
        if (!closedCasesByOfficer[officerId]) {
          closedCasesByOfficer[officerId] = {
            number_of_closed_cases: 0,
            officer_details: item.assigned, // Include assigned officer details
          }
        }
        closedCasesByOfficer[officerId].number_of_closed_cases++
      })

      // Convert the closedCasesByOfficer object to barChartData array
      const barChartData = Object.entries(closedCasesByOfficer).map(([officerId, data]) => ({
        officer_id: Number(officerId),
        number_of_closed_cases: data.number_of_closed_cases,
        officer_details: data.officer_details,
      }))

      // Pie chart
      const closedCases = await Cases.query().where('is_closed', true)
      const openCases = await Cases.query().where('is_closed', false)

      // Monthly cases
      const cases = await Cases.query().select('created_at')
      const caseRows = cases.map((row) => row.created_at)

      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      const finalResult = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      }

      caseRows.forEach((createdAt) => {
        const monthNumber = new Date(createdAt).getMonth()
        const monthName = months[monthNumber]
        finalResult[monthName]++ // Increment the corresponding month value
      })

      // console.log(finalResult)

      return response.json({
        success: true,
        message: 'Overview data fetched successfully',
        data: {
          pie_chart: {
            open_cases: openCases.length,
            closed_cases: closedCases.length,
          },
          horizontal_bar_chart: barChartData,
          bar_chart: finalResult,
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
