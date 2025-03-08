import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({ 
   data: {
      id: 1,
      firstName: 'Tatiana',
      lastName: 'Bertazoli',
      email: 'tatianabertazoli@gmail.com',
      password: 'password',
      dateOfBirth: new Date('2002-02-02'),
      phoneNumber: '123-456-7890',
      createdAt: new Date(),      
    },
})

  console.log({ user })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })