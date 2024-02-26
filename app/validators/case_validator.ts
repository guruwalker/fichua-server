import vine from '@vinejs/vine'

/**
 * Create
 */
export const createCaseValidator = vine.compile(
  vine.object({
    full_name: vine.string().trim().minLength(6),
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(6),
    phoneNumber: vine.string().trim().minLength(7),
    role: vine.string().trim().minLength(3),
    nationalID: vine.string().trim().minLength(7),
  })
)

/**
 * Update
 */
export const updateCaseValidator = vine.compile(
  vine.object({
    full_name: vine.string().trim().minLength(6),
    email: vine.string().trim().email(),
    phoneNumber: vine.string().trim().minLength(7),
    role: vine.string().trim().minLength(3),
    nationalID: vine.string().trim().minLength(7),
  })
)
