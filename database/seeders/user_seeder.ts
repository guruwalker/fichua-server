import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        full_name: 'Virk',
        email: 'virk@adonisjs.com',
        password: 'secret',
        phone_number: '12345674343',
        role: 'admin',
        national_id: '1234567',
      },
      {
        email: 'romain@adonisjs.com',
        password: 'supersecret',
        phone_number: '123qq45674343',
        role: 'officer',
        national_id: '123422567',
        full_name: 'Romain',
      },
    ])
  }
}
