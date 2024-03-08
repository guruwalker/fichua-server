// import type { HttpContext } from '@adonisjs/core/http'

import menu from '../../services/menu_builder.ts'

export default async function ReportController(request: any, response: any) {
  try {
    console.log('reached report controller!!!')
    menu.state('entry-point-to-report-controller', {
      run: () => {
        menu.con(`Report here option:
            1. Optical care
            2. Dental care
            3. Physiotherapy
            4. General consultation
            5. Other (specify)
            `)
      },
      next: {
        '*': 'specify-care-controller',
      },
    })

    // nesting states
    menu.run(request.body as any, (ussdResult: any) => {
      response.send(ussdResult)
    })
  } catch (error) {
    return response.json({
      success: false,
      message: error.message,
      data: error,
    })
  }
}
