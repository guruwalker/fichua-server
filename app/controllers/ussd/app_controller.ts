// import type { HttpContext } from '@adonisjs/core/http'
// import { UssdMenu } from 'ussd-builder'
import LoginController from '#controllers/ussd/login_controller'
import ReportController from '#controllers/ussd/report_controller'

import menu from '../../services/menu_builder.ts'

export default async function AppController(request: any, response: any) {
  try {
    // console.log('request', request)
    // console.log('response', response)

    // return response.json({
    //   success: true,
    //   message: 'Reached successfully',
    // })
    // Define menu states
    // menu.startState({
    //   run: () => {
    //     // use menu.con() to send response without terminating session
    //     menu.con(
    //       'Welcome to Fichua! <br />' +
    //         '\n1. Login to report a new case' +
    //         '\n2. Report a new case anonymously'
    //     )
    //   },
    //   // next object links to next state based on user input
    //   next: {
    //     1: 'entry-point-to-login-controller',
    //     2: 'entry-point-to-report-controller',
    //   },
    // })
    menu.startState({
      run: async () => {
        try {
          /** ------------------------------------------------------
           *  ---------------------------------------
           *  First screen
           * ---------------------------------------
          ------------------------------------------------------* */
          menu.con(
            'Welcome to Fichua!\n' +
              '\n1. Login to report a new case' +
              '\n2. Report a new case anonymously'
          )
        } catch (error) {
          console.error(error)
        }
      },
      /** ------------------------------------------------------
     *  ---------------------------------------
     *  Entry points to other modules
     * ---------------------------------------
     ------------------------------------------------------* */
      next: {
        1: 'entry-point-to-login-controller',
        2: 'entry-point-to-report-controller',
      },
    })

    menu.state('entry-point-to-login-controller', {
      run() {
        console.log('called login controller')
        LoginController(request, response)
        // menu.end('Here is the one from login')
      },
    })

    menu.state('entry-point-to-report-controller', {
      run() {
        console.log('called report controller')
        ReportController(request, response)
      },
    })

    menu.run(request.body as any, (ussdResult: any) => {
      console.log('request.body', request.body)
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
