import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'mysql',
  connections: {
    mysql: {
      client: 'mysql2',
      connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Wahome@2020',
        database: 'fichua',
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },
  },
})

export default dbConfig
