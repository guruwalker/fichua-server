import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column({ serializeAs: 'full_name' })
  declare full_name: string | null

  @column()
  declare email: string

  @column({ serializeAs: 'phone_number' })
  declare phone_number: string

  @column()
  declare password: string

  @column()
  declare role: string

  @column({ serializeAs: 'national_id' })
  declare national_id: string

  @column.dateTime({ autoCreate: true, serializeAs: 'created_at' })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updated_at' })
  declare updated_at: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'fich',
    table: 'access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}
