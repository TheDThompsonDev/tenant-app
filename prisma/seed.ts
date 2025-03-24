import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ============================================================================
  // CLEAR EXISTING DATA
  // ----------------------------------------------------------------------------
  // Delete records in child-to-parent order to avoid foreign key issues.

  await prisma.notification.deleteMany();
  await prisma.packageLocker.deleteMany();
  await prisma.smartDoorKey.deleteMany();
  await prisma.parkingPass.deleteMany();
  await prisma.user.deleteMany();
  await prisma.lease.deleteMany();
  await prisma.property.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.address.deleteMany();
  await prisma.contactUs.deleteMany();

  // ----------------------------------------------------------------------------
  // This ensures the database is clean before seeding new data.
  // ============================================================================

  // Create addresses
  const address1 = await prisma.address.create({
    data: {
      address: "123 Main Street",
      suiteNumber: 101,
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  const address2 = await prisma.address.create({
    data: {
      address: "456 Elm Street",
      suiteNumber: 202,
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create amenities
  const amenity1 = await prisma.amenity.create({
    data: {
      amenityName: "Swimming Pool",
      description: "Outdoor swimming pool with lounge area",
      location: "Ground Floor",
      availabilityStatus: "AVAILABLE",
      requiresAccessCode: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const amenity2 = await prisma.amenity.create({
    data: {
      amenityName: "Fitness Center",
      description: "Fully equipped gym with modern equipment",
      location: "First Floor",
      availabilityStatus: "AVAILABLE",
      requiresAccessCode: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const amenity3 = await prisma.amenity.create({
    data: {
      amenityName: "Rooftop Lounge",
      description: "Lounge area with panoramic city views",
      location: "Rooftop",
      availabilityStatus: "AVAILABLE",
      requiresAccessCode: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create properties
  const property = await prisma.property.create({
    data: {
      managementCompanyName: "ABC Property Management",
      addressId: address1.id,
      propertyName: "Sunset Apartments",
      phoneNumber: "123-456-7890",
      websiteURL: "https://sunsetapts.com",
      propertyManagerName: "John Doe",
      createdAt: new Date(),
      updatedAt: new Date(),
      Amenities: {
        connect: [
          { id: amenity1.id },
          { id: amenity2.id },
          { id: amenity3.id },
        ],
      },
    },
  });

  //Create Lease
  const lease1 = await prisma.lease.create({
    data: {
      propertyId: property.id,
      firstName: "John",
      lastName: "Doe",
      apartmentNumber: "101",
      dateOfBirth: new Date("1990-01-01"),
      socialSecurity: "123-45-6789",
      governmentId: "987654321",
      leaseStart: new Date("2023-08-01"),
      leaseEnd: new Date("2024-07-31"),
      monthlyRent: 2594,
      securityDeposit: 2594,
      leaseStatus: "ACTIVE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const user4 = await prisma.user.create({
    data: {
      appwriteId: "1eb751ba-527c-4771-81eb-ef3872488298",
      firstName: "Danny",
      lastName: "Thompson",
      email: "danny@test1.com",
      apartmentNumber: "205",
      userRole: "TENANT",
      createdAt: new Date(),
    },
  });

  const user5 = await prisma.user.create({
    data: {
      appwriteId: "67d4d9ba0019ae07cb3c",
      firstName: "admin",
      lastName: "admin",
      email: "admin@test.com",
      apartmentNumber: "00",
      userRole: "ADMIN",
      createdAt: new Date(),
    },
  });

  const user6 = await prisma.user.create({
    data: {
      appwriteId: "15d59072-7977-4306-be6f-6313e2ffd573",
      firstName: "staci",
      lastName: "south",
      email: "goldbear@gmail.com",
      apartmentNumber: "00",
      userRole: "TENANT",
      createdAt: new Date(),
    },
  });

  // create parking pass
  const parkingPass1 = await prisma.parkingPass.create({
    data: {
      userId: user4.id,
      make: "Toyota",
      model: "Camry",
      color: "Blue",
      licensePlate: "ABC123",
      parkingPassNumber: "PP-1008",
      createdAt: new Date(),
      expirationDate: new Date("2024-07-31"),
    },
  });

  //create smart lock
  const smartLock1 = await prisma.smartDoorKey.create({
    data: {
      userId: user4.id,
      accessCode: "SL101KEY",
      lockStatus: true,
      createdAt: new Date(),
      expirationDate: new Date(),
      lastAccessed: new Date(),
    },
  });

  // Create notification
  const notification1 = await prisma.notification.create({
    data: {
      senderId: user4.id,
      receiverId: user5.id,
      notificationType: "NOISE_COMPLAINT",
      subject: "Noise Complaint Received",
      message: "noise complaint received for unit 101",
      status: "UNREAD",
      priority: "LOW",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // create package locker acess
  const packageLocker1 = await prisma.packageLocker.create({
    data: {
      userId: user4.id,
      lockerNumber: "101",
      packageLockerStatus: "READY_FOR_PICKUP",
      accessCode: "PL101KEY",
      createdAt: new Date(),
      lastAcessed: new Date(),
    },
  });

  // contact us
  const contactUs1 = await prisma.contactUs.create({
    data: {
      fullName: "contact name",
      email: "contact@contact.com",
      phoneNumber: "123-456-7890",
      subject: "contact title",
      message: "contact message",
      createdAt: new Date(),
    },
  });

  console.log("seed file completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
