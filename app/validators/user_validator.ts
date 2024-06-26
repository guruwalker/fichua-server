import vine from '@vinejs/vine'

/**
 * Create
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
 * Update
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
