/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const CasesController = () => import('#controllers/cases_controller')
const UsersController = () => import('#controllers/users_controller')
const PagesController = () => import('#controllers/pages_controller')
const AuthenticationController = () => import('#controllers/authentication_controller')

router.get('/', ({ response }) => {
  return response.status(200).json({
    success: true,
    message: 'Fichua API running 🚀',
  })
})

/**
 * ============================================
 *  Authentication routes
 * ============================================
 */
router
  .group(() => {
    router
      .group(() => {
        router.post('/login', [AuthenticationController, 'login'])
        router.post('/register', [AuthenticationController, 'register'])
      })
      .prefix('/auth')
  })
  .prefix('/api/v1')

/**
 * ============================================
 *  Protected routes
 * ============================================
 */
router
  .group(() => {
    /**
     * ============================================
     *  Users
     * ============================================
     */
    router
      .group(() => {
        router.get('', [UsersController, 'index'])
        router.get('/:id', [UsersController, 'show'])
        router.put('/:id', [UsersController, 'update'])
        router.delete('/:id', [UsersController, 'destroy'])
      })
      .prefix('users')
    /**
     * ============================================
     *  Cases
     * ============================================
     */
    router
      .group(() => {
        router.get('', [CasesController, 'index'])
        router.post('', [CasesController, 'create'])
        router.get('/:id', [CasesController, 'show'])
        router.put('/:id', [CasesController, 'update'])
        router.delete('/:id', [CasesController, 'destroy'])
      })
      .prefix('cases')
    /**
     * ============================================
     *  Pages routes
     * ============================================
     */
    router
      .group(() => {
        router.get('/profile/:id', [PagesController, 'profile'])
        router.get('/updates', [PagesController, 'updates'])
        router.get('/overview', [PagesController, 'overview'])
        router.get('/analytics', [PagesController, 'analytics'])
      })
      .prefix('pages')
  })
  .prefix('/api/v1')
// .use(
//   middleware.auth({
//     guards: ['api'],
//   })
// )
