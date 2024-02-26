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
const UsersController = () => import('#controllers/users_controller')
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
  })
  .prefix('/api/v1')
  .use(middleware.auth({ guards: ['web'] }))
