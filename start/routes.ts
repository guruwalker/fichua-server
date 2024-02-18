/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')

router.get('/', ({ response }) => {
  return response.status(200).json({
    success: true,
    message: 'Fichua API running 🚀',
  })
})

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
        router.post('', [UsersController, 'create'])
        router.delete('/:id', [UsersController, 'destroy'])
      })
      .prefix('users')
  })
  .prefix('/api/v1')
