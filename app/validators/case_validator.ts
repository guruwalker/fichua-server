import vine from '@vinejs/vine'

/**
 * Create
 */
export const createCaseValidator = vine.compile(
  vine.object({
    case_uuid: vine.string().trim().minLength(6),
    reported_by: vine.number().optional(),
    is_anonymous: vine.boolean().optional(),
    crime_type: vine.string().trim().minLength(3),
    statement: vine.string().trim().minLength(10),
    location: vine.string().trim().minLength(3),
    status: vine.string().trim().minLength(3),
    assigned_officer: vine.number().optional(),
    is_closed: vine.boolean().optional(),
    closed_by: vine.number().optional(),
    priority: vine.string().trim().minLength(3).optional(),
    date_closed: vine.string().trim().minLength(3).optional(),
  })
)

/**
 * Update
 */
export const updateCaseValidator = vine.compile(
  vine.object({
    case_uuid: vine.string().trim().minLength(6),
    reported_by: vine.number().optional(),
    is_anonymous: vine.boolean().optional(),
    crime_type: vine.string().trim().minLength(3),
    statement: vine.string().trim().minLength(10),
    location: vine.string().trim().minLength(3),
    status: vine.string().trim().minLength(3),
    assigned_officer: vine.number().optional(),
    is_closed: vine.boolean().optional(),
    closed_by: vine.number().optional(),
    priority: vine.string().trim().minLength(3).optional(),
    date_closed: vine.string().trim().minLength(3).optional(),
  })
)
