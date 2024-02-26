import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cases'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('case_uuid').nullable()
      table.string('reported_by').notNullable()
      table.string('crime_type').notNullable()
      table.text('statement').nullable()
      table.string('location').nullable()
      table.string('status').nullable()
      table.string('assigned_officer').nullable()
      table.text('attachments').nullable()
      table.string('priority').nullable()
      table.string('date_closed').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
