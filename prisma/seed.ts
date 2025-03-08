import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({ 
   data: {
      firstName: 'Tatiana',
      lastName: 'Bertazoli',
      email: 'tatianabertazoli@gmail.com',
      password: 'password',
      dateOfBirth: new Date('2002-02-02'),
      phoneNumber: '123-456-7890',
      createdAt: new Date(),
      updatedAt: new Date(),      
    },
})

  // Create addresses
  const address1 = await prisma.address.create({
    data: {
      number: 123,
      street: 'Main Street',
      suiteNumber: 101,
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const address2 = await prisma.address.create({
    data: {
      number: 456,
      street: 'Elm Street',
      suiteNumber: 202,
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create management company
  const managementCompany = await prisma.managementCompany.create({
    data: {
      name: 'Sunrise Management',
      addressId: address1.id,
      websiteURL: 'https://sunrisemgmt.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create properties
  const property = await prisma.property.create({
    data: {
      managementCompanyId: managementCompany.id,
      addressId: address2.id,
      propertyName: 'Sunset Apartments',
      websiteURL: 'https://sunsetapts.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create amenities
  const amenity = await prisma.amenity.create({
    data: {
      amenityName: 'Swimming Pool',
      description: 'Outdoor heated pool',
      location: 'Backyard',
      availabilityStatus: new Date(),
      requiresAccessCode: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });


  // Create apartments
  const apartment = await prisma.apartment.create({
    data: {
      propertyId: property.id,
      unitNumber: 101,
      maxCapacity: 4,
      squareFeet: 1200,
      image: 'https://example.com/apartment.jpg',
      beddrooms: 2,
      bathrooms: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  console.log({ user, address1, address2, managementCompany, property, amenity, apartment })
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