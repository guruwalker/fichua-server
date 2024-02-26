import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Cases extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ serializeAs: 'case_uuid' })
  declare case_uuid: string | number

  @column({ serializeAs: 'reported_by' })
  declare reported_by: string

  @column({ serializeAs: 'crime_type' })
  declare crime_type: string

  @column()
  declare statement: string

  @column()
  declare location: string

  @column()
  declare status: string

  @column({ serializeAs: 'assigned_officer' })
  declare assigned_officer: string

  @column()
  declare attachments: string

  @column()
  declare priority: string

  @column({ serializeAs: 'date_closed' })
  declare date_closed: string | DateTime

  @column.dateTime({ autoCreate: true, serializeAs: 'created_at' })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updated_at' })
  declare updated_at: DateTime | null
}
