import vine from '@vinejs/vine'

/**
 * Create user
 */
export const createUserValidator = vine.compile(
  vine.object({
    full_name: vine.string().trim().minLength(6),
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(6),
    phone_number: vine.string().trim().minLength(7),
    role: vine.string().trim().minLength(3),
    national_id: vine.string().trim().minLength(7),
  })
)

/**
 * Update user
 */
export const updateUserValidator = vine.compile(
  vine.object({
    full_name: vine.string().trim().minLength(6),
    email: vine.string().trim().email(),
    phone_number: vine.string().trim().minLength(7),
    role: vine.string().trim().minLength(3),
    national_id: vine.string().trim().minLength(7),
  })
)

/**
 * Reset password
 */
export const resetPasswordValidator = vine.object({
  password: vine.string().minLength(8),
  confirm_password: vine.string().minLength(8),
})

/**
 * Forgot password
 */
export const forgotPasswordValidator = vine.object({
  email: vine.string().email().minLength(5),
})
