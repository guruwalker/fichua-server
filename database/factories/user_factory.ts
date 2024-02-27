import User from '#models/user'
import Factory from '@adonisjs/lucid/factories'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    full_name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone_number: faker.phone.number(),
    role: faker.helpers.arrayElement(['admin', 'officer', 'user']),
    national_id: faker.random.alphaNumeric(7),
  }
}).build()
