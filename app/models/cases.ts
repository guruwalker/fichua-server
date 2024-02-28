import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from '../models/user.ts'
export default class Cases extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ serializeAs: 'case_uuid' })
  declare case_uuid: string | number

  @column({ serializeAs: 'reported_by' })
  declare reported_by: string | number

  @column({ serializeAs: 'crime_type' })
  declare crime_type: string

  @column()
  declare statement: string

  @column()
  declare location: string

  @column()
  declare status: string

  @column({ serializeAs: 'assigned_officer' })
  declare assigned_officer: number

  @column()
  declare is_closed: boolean

  @column({ serializeAs: 'closed_by' })
  declare closed_by: number

  @column()
  declare priority: string

  @column({ serializeAs: 'date_closed' })
  declare date_closed: string | DateTime

  @column.dateTime({ autoCreate: true, serializeAs: 'created_at' })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updated_at' })
  declare updated_at: DateTime | null

  // Reported by relation
  @belongsTo(() => User, { foreignKey: 'reported_by' })
  declare reporter: BelongsTo<typeof User>

  // Officer assigned to the case
  @belongsTo(() => User, { foreignKey: 'assigned_officer' })
  declare assigned: BelongsTo<typeof User>

  // Officer assigned to the case
  @belongsTo(() => User, { foreignKey: 'closed_by' })
  declare closed: BelongsTo<typeof User>
}
