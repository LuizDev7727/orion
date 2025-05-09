import { PrismaClient } from "../generated/prisma"
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {

  const employeesToInsert = Array.from({ length: 500 }).map(() => {
    return {
      full_name: faker.person.fullName(),
      email: faker.internet.email(),
      department: faker.helpers.arrayElement([
        'Engineering',
        'Sales',
        'Marketing',
        'HR',
        'Finance',
        'Operations',
        'Support',
      ]),
      role: faker.person.jobTitle(),
      status: faker.helpers.arrayElement(['Active', 'On Leave', 'Terminated']),
      hire_date: faker.date.past({ years: 10 }).toISOString(), // ISO para compatibilidade com timestamp
      last_promotion: faker.datatype.boolean() ? faker.date.recent({ days: 1000 }).toISOString() : null,
      salary: parseFloat(faker.finance.amount({ min: 30000, max: 150000, dec: 2 })),
      performance_score: faker.number.float({ min: 1.0, max: 5.0 }),
      vacation_days_left: faker.number.int({ min: 0, max: 30 }),
      manager_id: faker.datatype.boolean() ? faker.string.uuid() : null,
      location: faker.location.city(),
    }
  })

  await prisma.employees.createMany({
    data: employeesToInsert
  })
}

main()
.then(() => {
  console.log('Database Seeded!')
})