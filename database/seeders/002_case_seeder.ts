import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Case from '#models/cases'

export default class CaseSeeder extends BaseSeeder {
  async run() {
    const cases = [
      {
        case_uuid: 'waeflkejwlfkew1',
        reported_by: 1,
        crime_type: 'robbery',
        statement:
          'A convenience store was robbed at gunpoint late last night. The perpetrator threatened the cashier and fled with cash and cigarettes.',
        location: 'Nairobi',
        status: 'assigned',
        assigned_officer: 1,
        attachments: '',
        priority: 'high',
        date_closed: '',
      },
      {
        case_uuid: 'waeflkejwlfkew2',
        reported_by: 2,
        crime_type: 'assault',
        statement:
          'A man was assaulted outside a nightclub. The victim suffered minor injuries and was taken to the hospital for treatment.',
        location: 'Mombasa',
        status: 'assigned',
        assigned_officer: 2,
        attachments: '',
        priority: 'medium',
        date_closed: '',
      },
      {
        case_uuid: 'waeflkejwlfkew3',
        reported_by: 3,
        crime_type: 'burglary',
        statement:
          'A residence was broken into while the occupants were away on vacation. Jewelry and electronics were stolen from the house.',
        location: 'Eldoret',
        status: 'assigned',
        assigned_officer: 3,
        attachments: '',
        priority: 'high',
        date_closed: '',
      },
      {
        case_uuid: 'waeflkejwlfkew1',
        reported_by: 4,
        crime_type: 'robbery',
        statement:
          'A convenience store was robbed at gunpoint late last night. The perpetrator threatened the cashier and fled with cash and cigarettes.',
        location: 'Nairobi',
        status: 'assigned',
        assigned_officer: 4,
        attachments: '',
        priority: 'high',
        date_closed: '',
      },
      {
        case_uuid: 'waeflkejwlfkew2',
        reported_by: 5,
        crime_type: 'assault',
        statement:
          'A man was assaulted outside a nightclub. The victim suffered minor injuries and was taken to the hospital for treatment.',
        location: 'Mombasa',
        status: 'assigned',
        assigned_officer: 5,
        attachments: '',
        priority: 'medium',
        date_closed: '',
      },
      {
        case_uuid: 'waeflkejwlfkew3',
        reported_by: 6,
        crime_type: 'burglary',
        statement:
          'A residence was broken into while the occupants were away on vacation. Jewelry and electronics were stolen from the house.',
        location: 'Eldoret',
        status: 'assigned',
        assigned_officer: 6,
        attachments: '',
        priority: 'high',
        date_closed: '',
      },
      {
        case_uuid: 'waeflkejwlfkew4',
        reported_by: 7,
        crime_type: 'fraud',
        statement:
          'An elderly person was defrauded by an online scam. The victim lost a significant amount of money after providing personal information to a fraudulent website.',
        location: 'Nakuru',
        status: 'assigned',
        assigned_officer: 7,
        attachments: '',
        priority: 'high',
        date_closed: '',
      },
      {
        case_uuid: 'waeflkejwlfkew5',
        reported_by: 8,
        crime_type: 'drug possession',
        statement:
          'Police discovered a stash of illegal drugs hidden in a vehicle during a routine traffic stop. The suspect was arrested and taken into custody.',
        location: 'Kisumu',
        status: 'assigned',
        assigned_officer: 8,
        attachments: '',
        priority: 'medium',
        date_closed: '',
      },
      {
        case_uuid: 'waeflkejwlfkew6',
        reported_by: 9,
        crime_type: 'hit and run',
        statement:
          'A pedestrian was struck by a vehicle that fled the scene without stopping. The victim sustained serious injuries and was rushed to the hospital.',
        location: 'Thika',
        status: 'assigned',
        assigned_officer: 9,
        attachments: '',
        priority: 'high',
        date_closed: '',
      },
      {
        case_uuid: 'waeflkejwlfkew7',
        reported_by: 10,
        crime_type: 'cyberbullying',
        statement:
          'A teenager became the target of cyberbullying on social media platforms. The victim experienced harassment and threats from anonymous users.',
        location: 'Naivasha',
        status: 'assigned',
        assigned_officer: 10,
        attachments: '',
        priority: 'medium',
        date_closed: '',
      },
    ]
    await Case.createMany(cases)
  }
}
