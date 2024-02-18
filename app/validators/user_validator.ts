import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const createUserValidator = vine.compile(
  vine.object({
    full_name: vine.string().trim().minLength(6),
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(6),
  })
)

/**
 * Validates the post's update action
 */
export const updateUserValidator = vine.compile(
  vine.object({
    full_name: vine.string().trim().minLength(6),
    email: vine.string().trim().email(),
  })
)
