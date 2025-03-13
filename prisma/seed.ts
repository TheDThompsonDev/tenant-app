import { PrismaClient } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

async function main() {
  // ============================================================================
  // CLEAR EXISTING DATA
  // ----------------------------------------------------------------------------
  // Delete records in child-to-parent order to avoid foreign key issues.

  await prisma.packageLocker.deleteMany();
  await prisma.contactUs.deleteMany();
  await prisma.packageLockerAccess.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.digitalAccessKey.deleteMany();
  await prisma.smartLock.deleteMany();
  await prisma.parkingPass.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.lease.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.rentalApplication.deleteMany();
  await prisma.applicant.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.apartment.deleteMany();
  await prisma.property.deleteMany();
  await prisma.managementCompany.deleteMany();
  await prisma.address.deleteMany();
  await prisma.leasingAgent.deleteMany();
  await prisma.propertyManager.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.user.deleteMany();
  // ----------------------------------------------------------------------------
  // This ensures the database is clean before seeding new data.
  // ============================================================================

  const user1 = await prisma.user.create({
    data: {
      firstName: "Test",
      lastName: "Test",
      email: "test@gmail.com",
      password: "password",
      dateOfBirth: new Date("2002-02-02"),
      phoneNumber: "123-456-7890",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      password: "securepassword",
      dateOfBirth: new Date("1990-01-01"),
      phoneNumber: "987-654-3210",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const user3 = await prisma.user.create({
    data: {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
      password: "anotherpassword",
      dateOfBirth: new Date("1985-05-15"),
      phoneNumber: "555-555-5555",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const user4 = await prisma.user.create({
    data: {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      password: "yetanotherpassword",
      dateOfBirth: new Date("1992-07-20"),
      phoneNumber: "444-444-4444",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  const user5 = await prisma.user.create({
    data: {
      firstName: "Bob",
      lastName: "Brown",
      email: "bob.brown@example.com",
      password: "finalpassword",
      dateOfBirth: new Date("1988-11-11"),
      phoneNumber: "555-555-5555",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // create admin
  const admin1 = await prisma.admin.create({
    data: {
      userId: user1.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create addresses
  const address1 = await prisma.address.create({
    data: {
      number: 123,
      street: "Main Street",
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
      number: 456,
      street: "Elm Street",
      suiteNumber: 202,
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const address3 = await prisma.address.create({
    data: {
      number: 789,
      street: "Pine Street",
      suiteNumber: 303,
      city: "San Francisco",
      state: "CA",
      zipCode: "94101",
      country: "USA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const address4 = await prisma.address.create({
    data: {
      number: 101,
      street: "Oak Street",
      suiteNumber: 404,
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const address5 = await prisma.address.create({
    data: {
      number: 321,
      street: "Maple Avenue",
      suiteNumber: 505,
      city: "Houston",
      state: "TX",
      zipCode: "77002",
      country: "USA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create management company
  const managementCompany1 = await prisma.managementCompany.create({
    data: {
      companyName: "Sunrise Management",
      addressId: address1.id,
      websiteURL: "https://sunrisemgmt.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  //property manager
  const propertyManager1 = await prisma.propertyManager.create({
    data: {
      userId: user2.id,
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

  const amenity4 = await prisma.amenity.create({
    data: {
      amenityName: "Conference Room",
      description: "Private conference room for meetings",
      location: "Second Floor",
      availabilityStatus: "AVAILABLE",
      requiresAccessCode: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const amenity5 = await prisma.amenity.create({
    data: {
      amenityName: "Parking Garage",
      description: "Secure parking garage with assigned spots",
      location: "Basement",
      availabilityStatus: "UNAVAILABLE",
      requiresAccessCode: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  //leasing agent
  const leasingAgent1 = await prisma.leasingAgent.create({
    data: {
      userId: user3.id,
      addressId: address3.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create properties
  const property = await prisma.property.create({
    data: {
      managementCompanyId: managementCompany1.id,
      propertyManagerId: propertyManager1.id,
      addressId: address2.id,
      propertyName: "Sunset Apartments",
      websiteURL: "https://sunsetapts.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      amenities: {
        connect: [
          { id: amenity1.id },
          { id: amenity2.id },
          { id: amenity3.id },
        ],
      },
      leasingAgents: {
        connect: [{ id: leasingAgent1.id }],
      },
    },
  });

  // Create apartments
  const apartment1 = await prisma.apartment.create({
    data: {
      propertyId: property.id,
      unitNumber: 101,
      maxCapacity: 4,
      squareFeet: 1200,
      image: "https://example.com/apartment1.jpg",
      bedrooms: 2,
      bathrooms: 2,
      apartmentAvailabilityStatus: "AVAILABLE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const apartment2 = await prisma.apartment.create({
    data: {
      propertyId: property.id,
      unitNumber: 102,
      maxCapacity: 3,
      squareFeet: 900,
      image: "https://example.com/apartment2.jpg",
      bedrooms: 1,
      bathrooms: 1,
      apartmentAvailabilityStatus: "AVAILABLE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const apartment3 = await prisma.apartment.create({
    data: {
      propertyId: property.id,
      unitNumber: 103,
      maxCapacity: 5,
      squareFeet: 1500,
      image: "https://example.com/apartment3.jpg",
      bedrooms: 3,
      bathrooms: 2,
      apartmentAvailabilityStatus: "UNAVAILABLE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const apartment4 = await prisma.apartment.create({
    data: {
      propertyId: property.id,
      unitNumber: 104,
      maxCapacity: 2,
      squareFeet: 800,
      image: "https://example.com/apartment4.jpg",
      bedrooms: 1,
      bathrooms: 1,
      apartmentAvailabilityStatus: "AVAILABLE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const apartment5 = await prisma.apartment.create({
    data: {
      propertyId: property.id,
      unitNumber: 105,
      maxCapacity: 4,
      squareFeet: 1100,
      image: "https://example.com/apartment5.jpg",
      bedrooms: 2,
      bathrooms: 2,
      apartmentAvailabilityStatus: "UNAVAILABLE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create listings
  const listing1 = await prisma.listing.create({
    data: {
      apartmentId: apartment1.id,
      petFriendly: true,
      furnished: false,
      leaseLength: 12,
      monthlyRent: 2000,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "AVAILABLE",
    },
  });

  const listing2 = await prisma.listing.create({
    data: {
      apartmentId: apartment2.id,
      petFriendly: false,
      furnished: true,
      leaseLength: 6,
      monthlyRent: 1500,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "AVAILABLE",
    },
  });

  const rentalApplication1 = await prisma.rentalApplication.create({
    data: {
      listingId: listing1.id,
      status: "PENDING",
      startDate: new Date("2025-03-15"),
      leaseLength: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const rentalApplication2 = await prisma.rentalApplication.create({
    data: {
      listingId: listing2.id,
      status: "APPROVED",
      startDate: new Date("2025-04-01"),
      leaseLength: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  //create vehicle
  const vehicle1 = await prisma.vehicle.create({
    data: {
      licensePlate: "TX-901",
      maker: "Honda",
      model: "Civic",
      color: "Silver",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const vehicle2 = await prisma.vehicle.create({
    data: {
      licensePlate: "TX-1511",
      maker: "Toyota",
      model: "Corolla",
      color: "Blue",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const vehicle3 = await prisma.vehicle.create({
    data: {
      licensePlate: "TX-1008",
      maker: "Ford",
      model: "Focus",
      color: "Black",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  //leasing applicant
  const applicant1 = await prisma.applicant.create({
    data: {
      userId: user4.id,
      addressId: address4.id,
      rentalApplicationId: rentalApplication1.id,
      governmentId: "GOV-001",
      socialSecurity: "111-11-1111",
      vehicleId: vehicle1.id,
      smoker: false,
      annualIncome: 55000,
      pet: true,
      signatureStatus: "Signed",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const applicant2 = await prisma.applicant.create({
    data: {
      userId: user5.id,
      addressId: address5.id,
      rentalApplicationId: rentalApplication1.id,
      governmentId: "GOV-002",
      socialSecurity: "222-22-2222",
      vehicleId: vehicle2.id,
      smoker: true,
      annualIncome: 60000,
      pet: true,
      signatureStatus: "Signed",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  //Create Lease
  const lease1 = await prisma.lease.create({
    data: {
      rentalApplicationId: rentalApplication1.id,
      leaseStart: new Date("2023-08-01"),
      leaseEnd: new Date("2024-07-31"),
      monthlyRent: 2594,
      securityDeposit: 2594,
      leaseStatus: "ACTIVE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create tenant
  const tenant1 = await prisma.tenant.create({
    data: {
      applicantId: applicant1.id,
      leaseId: lease1.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const tenant2 = await prisma.tenant.create({
    data: {
      applicantId: applicant2.id,
      leaseId: lease1.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create guest
  const guest1 = await prisma.guest.create({
    data: {
      tenantId: tenant1.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // create parking pass
  const parkingPass1 = await prisma.parkingPass.create({
    data: {
      guestId: guest1.id,
      vehicleId: vehicle3.id,
      parkingPassNumber: "PP-1008",
      createdAt: new Date(),
      expirationDate: new Date("2024-07-31"),
    },
  });

  //create digital access key
  const digitalAccessKey1 = await prisma.digitalAccessKey.create({
    data: {
      tenantId: tenant1.id,
      code: "CR901KEY",
      createdAt: new Date("2025-03-11T05:14:32.412Z"),
      updatedAt: new Date("2025-03-11T05:14:32.412Z"),
      expirationDate: new Date("2026-07-31T00:00:00.000Z"),
    },
  });

  const digitalAccessKey2 = await prisma.digitalAccessKey.create({
    data: {
      tenantId: tenant2.id,
      code: "CR902KEY",
      createdAt: new Date(),
      updatedAt: new Date(),
      expirationDate: new Date("2026-07-31"),
    },
  });

  //create smart lock
  const smartLock1 = await prisma.smartLock.create({
    data: {
      apartmentId: apartment1.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      digitalAccessKey: {
        connect: [{ id: digitalAccessKey1.id }, { id: digitalAccessKey2.id }],
      },
    },
  });

  // Create notification
  const notification1 = await prisma.notification.create({
    data: {
      tenantId: tenant1.id,
      notificationType: "NOISE_COMPLAINT",
      title: "Noise Complaint Received",
      message: "noise complaint received for unit 101",
      status: "UNREAD",
      priority: "LOW",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const notification2 = await prisma.notification.create({
    data: {
      tenantId: tenant2.id,
      notificationType: "REPAIR",
      title: "Maintenance Request Received",
      message:
        "Dear Bob, your maintenance request has been received and is being processed.",
      status: "READ",
      priority: "HIGH",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // create package locker
  const packageLocker1 = await prisma.packageLocker.create({
    data: {
      propertyId: property.id,
      lockerNumber: "101",
      location: "Mail Room",
      packageLockerStatus: "AVAILABLE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // create package locker access
  const packageLockerLog1 = await prisma.packageLockerAccess.create({
    data: {
      packageLockerId: packageLocker1.id,
      tenantId: tenant1.id,
      accessCode: "PL101KEY",
      action: "READY_FOR_PICKUP",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // contact us
  const contactUs1 = await prisma.contactUs.create({
    data: {
      fullName: "contact name",
      email: "contact@contact.com",
      phoneNumber: "123-456-7890",
      title: "contact title",
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
