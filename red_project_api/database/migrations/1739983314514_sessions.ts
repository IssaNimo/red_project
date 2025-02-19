import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SessionsSchema extends BaseSchema {
  protected tableName = 'sessions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('token').notNullable().unique()
      table.string('ip_address').nullable()
      table.string('user_agent').nullable()
      table.timestamp('last_activity_at', { useTz: true }).notNullable()
      table.timestamp('expires_at', { useTz: true }).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
