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
      listingId: listing1.id,
      name: "contact name",
      email: "contact@contact.com",
      phoneNumber: "123-456-7890",
      title: "contact title",
      message: "contact message",
      createdAt: new Date(),
    },
  });

  console.log("seed file completed");
}

// async function main() {

//   // ============================================================================
//   // CREATE CORE USERS (Internal Staff)
//   // ----------------------------------------------------------------------------
//   // Property Manager (from company)
//   const managerUser = await prisma.user.create({
//     data: {
//       firstName: "George",
//       lastName: "Manager",
//       dob: new Date("1970-05-10"),
//       email: "george.manager@bluecrownproperties.com",
//       password: "managerpassword",
//     },
//   });
//   await prisma.propertyManager.create({
//     data: { userId: managerUser.id, userRole: "Property Manager" },
//   });

//   // Admin (from company) – now using the company domain
//   const adminUser = await prisma.user.create({
//     data: {
//       firstName: "Alice",
//       lastName: "Admin",
//       dob: new Date("1965-03-22"),
//       email: "admin@bluecrownproperties.com",
//       password: "adminpassword",
//     },
//   });
//   await prisma.admin.create({ data: { userId: adminUser.id } });

//   // Leasing Agent (from company)
//   const leasingAgentUser = await prisma.user.create({
//     data: {
//       firstName: "Lara",
//       lastName: "Agent",
//       dob: new Date("1982-09-14"),
//       email: "lara.agent@bluecrownproperties.com",
//       password: "agentpassword",
//     },
//   });
//   const leasingAgentRecord = await prisma.leasingAgent.create({
//     data: { userId: leasingAgentUser.id, userRole: "Leasing Agent", createdAt: new Date() },
//   });
//   // ----------------------------------------------------------------------------
//   // These users represent internal staff that manage and lease properties.
//   // ============================================================================

//   // ============================================================================
//   // CREATE MANAGEMENT COMPANY: Blue Crown Properties
//   // ----------------------------------------------------------------------------
//   // Create mailing address for Blue Crown Properties.
//   const managementAddress = await prisma.address.create({
//     data: {
//       number: "13901",
//       street: "Midway Road",
//       aptSuite: "#102-127",
//       city: "Dallas",
//       state: "TX",
//       zipcode: "75244",
//       country: "USA",
//     },
//   });
//   // Create the management company record.
//   const managementCompany = await prisma.managementCompany.create({
//     data: {
//       name: "Blue Crown Properties",
//       addressId: managementAddress.id,
//       websiteUrl: "https://bluecrownproperties.com",
//       email: "info@bluecrownproperties.com",
//     },
//   });
//   // ----------------------------------------------------------------------------
//   // This section sets up corporate details for Blue Crown Properties.
//   // ============================================================================

//   // ============================================================================
//   // CREATE PROPERTY: Cirque Residences
//   // ----------------------------------------------------------------------------
//   // Create property address for Cirque Residences.
//   const propertyAddress = await prisma.address.create({
//     data: {
//       number: "2500",
//       street: "N Houston St",
//       aptSuite: "",
//       city: "Dallas",
//       state: "TX",
//       zipcode: "75219",
//       country: "USA",
//     },
//   });
//   // Create the property record and link it to the management company.
//   const property = await prisma.property.create({
//     data: {
//       managementCompanyId: managementCompany.id,
//       addressId: propertyAddress.id,
//       propertyName: "Cirque Residences",
//       websiteUrl: "https://cirquedallas.com",
//     },
//   });
//   // Link the leasing agent to this property.
//   await prisma.leasingAgent.update({
//     where: { id: leasingAgentRecord.id },
//     data: { propertyId: property.id },
//   });
//   // ----------------------------------------------------------------------------
//   // "Cirque Residences" is the property being managed.
//   // ============================================================================

//   // ============================================================================
//   // CREATE APARTMENT UNITS FOR THE PROPERTY
//   // ----------------------------------------------------------------------------
//   // 1 Bed / 1 Bath Units:
//   const apt901 = await prisma.apartment.create({
//     data: {
//       propertyId: property.id,
//       unitNumber: "901",
//       maxCapacity: 2,
//       squareFeet: 939,
//       image: "https://cirquedallas.com/images/901.jpg",
//       bedrooms: 1,
//       baths: 1,
//     },
//   });
//   const apt1511 = await prisma.apartment.create({
//     data: {
//       propertyId: property.id,
//       unitNumber: "1511",
//       maxCapacity: 2,
//       squareFeet: 951,
//       image: "https://cirquedallas.com/images/1511.jpg",
//       bedrooms: 1,
//       baths: 1,
//     },
//   });
//   const apt1512 = await prisma.apartment.create({
//     data: {
//       propertyId: property.id,
//       unitNumber: "1512",
//       maxCapacity: 2,
//       squareFeet: 951,
//       image: "https://cirquedallas.com/images/1512.jpg",
//       bedrooms: 1,
//       baths: 1,
//     },
//   });
//   // 2 Bed / 2 Bath Units:
//   const apt1008 = await prisma.apartment.create({
//     data: {
//       propertyId: property.id,
//       unitNumber: "1008",
//       maxCapacity: 4,
//       squareFeet: 1557,
//       image: "https://cirquedallas.com/images/1008.jpg",
//       bedrooms: 2,
//       baths: 2,
//     },
//   });
//   const apt1708 = await prisma.apartment.create({
//     data: {
//       propertyId: property.id,
//       unitNumber: "1708",
//       maxCapacity: 4,
//       squareFeet: 1557,
//       image: "https://cirquedallas.com/images/1708.jpg",
//       bedrooms: 2,
//       baths: 2,
//     },
//   });
//   const apt2508 = await prisma.apartment.create({
//     data: {
//       propertyId: property.id,
//       unitNumber: "2508",
//       maxCapacity: 4,
//       squareFeet: 1557,
//       image: "https://cirquedallas.com/images/2508.jpg",
//       bedrooms: 2,
//       baths: 2,
//     },
//   });
//   // ----------------------------------------------------------------------------
//   // These units represent real apartment data (both 1 bed/1 bath and 2 bed/2 bath units).
//   // Pricing and availability will be handled in lease and listing records.
//   // ============================================================================

//   // ============================================================================
//   // CREATE TENANT USERS & ASSIGN ACTIVE LEASES (Leased Units Scenario)
//   // ----------------------------------------------------------------------------
//   // Tenant 1: Cassiopeia Cavazos (Unit 901)
//   const tenantUser1 = await prisma.user.create({
//     data: {
//       firstName: "Cassiopeia",
//       lastName: "Cavazos",
//       dob: new Date("1990-01-15"),
//       email: "cassiopeiacavazos@gmail.com",
//       password: "tenantpass1",
//     },
//   });
//   const tenantAddress1 = await prisma.address.create({
//     data: {
//       number: "30",
//       street: "Memorial Drive",
//       aptSuite: "",
//       city: "Avon",
//       state: "MA",
//       zipcode: "2322",
//       country: "USA",
//     },
//   });
//   await prisma.applicant.create({
//     data: {
//       userId: tenantUser1.id,
//       userRole: "Tenant Applicant",
//       addressId: tenantAddress1.id,
//       governmentId: "GOV-001",
//       socialSecurity: "111-11-1111",
//       vehicles: 1,
//       smoker: "No",
//       annualIncome: 55000,
//       pet: "None",
//       signatureStatus: "Signed",
//     },
//   });
//   // Create a lease for Unit 901 with Cassiopeia.
//   const lease901 = await prisma.lease.create({
//     data: {
//       apartmentId: apt901.id,
//       leaseStart: new Date("2023-08-01"),
//       leaseEnd: new Date("2024-07-31"),
//       monthlyRent: 2594, // Price for Unit 901
//       securityDeposit: 2594,
//       leaseStatus: "Active",
//     },
//   });
//   const tenantRecord1 = await prisma.tenant.create({
//     data: {
//       userId: tenantUser1.id,
//       leaseId: lease901.id,
//     },
//   });
//   // Notification, listing, parking pass, and smart lock for Unit 901.
//   await prisma.notification.create({
//     data: {
//       tenantId: tenantRecord1.id,
//       propertyId: property.id,
//       notificationType: "Email",
//       title: "Welcome to Cirque Residences - Unit 901",
//       sentAt: new Date(),
//       message: "Dear Cassiopeia, your lease for Unit 901 is now active.",
//       status: "Sent",
//       priority: "High",
//     },
//   });
//   await prisma.listing.create({
//     data: {
//       apartmentId: apt901.id,
//       listingDate: new Date("2023-07-15"),
//       moveInDate: new Date("2023-08-01"),
//       leaseLength: 12,
//       petFriendly: true,
//       furnished: false,
//       propertyId: property.id,
//     },
//   });
//   await prisma.parkingPass.create({
//     data: {
//       apartmentId: apt901.id,
//       licensePlate: "TX-901",
//       make: "Honda",
//       model: "Civic",
//       color: "Silver",
//       createdAt: new Date(),
//       expirationDate: new Date("2024-07-31"),
//     },
//   });
//   const smartLock901 = await prisma.smartLock.create({
//     data: { apartmentId: apt901.id },
//   });
//   await prisma.digitalAccessKey.create({
//     data: {
//       smartLockId: smartLock901.id,
//       code: "CR901KEY",
//       expirationDate: new Date("2024-07-31"),
//     },
//   });

//   // Tenant 2: Tatiana Bertazoli (Unit 1511)
//   const tenantUser2 = await prisma.user.create({
//     data: {
//       firstName: "Tatiana",
//       lastName: "Bertazoli",
//       dob: new Date("1991-02-20"),
//       email: "tatianabertazoli@gmail.com",
//       password: "tenantpass2",
//     },
//   });
//   const tenantAddress2 = await prisma.address.create({
//     data: {
//       number: "250",
//       street: "Hartford Avenue",
//       aptSuite: "",
//       city: "Bellingham",
//       state: "MA",
//       zipcode: "2019",
//       country: "USA",
//     },
//   });
//   await prisma.applicant.create({
//     data: {
//       userId: tenantUser2.id,
//       userRole: "Tenant Applicant",
//       addressId: tenantAddress2.id,
//       governmentId: "GOV-002",
//       socialSecurity: "222-22-2222",
//       vehicles: 0,
//       smoker: "No",
//       annualIncome: 60000,
//       pet: "Cat",
//       signatureStatus: "Signed",
//     },
//   });
//   // Create a lease for Unit 1511 with Tatiana.
//   const lease1511 = await prisma.lease.create({
//     data: {
//       apartmentId: apt1511.id,
//       leaseStart: new Date("2023-09-01"),
//       leaseEnd: new Date("2024-08-31"),
//       monthlyRent: 2614,
//       securityDeposit: 2614,
//       leaseStatus: "Active",
//     },
//   });
//   const tenantRecord2 = await prisma.tenant.create({
//     data: {
//       userId: tenantUser2.id,
//       leaseId: lease1511.id,
//     },
//   });
//   await prisma.notification.create({
//     data: {
//       tenantId: tenantRecord2.id,
//       propertyId: property.id,
//       notificationType: "Email",
//       title: "Welcome to Cirque Residences - Unit 1511",
//       sentAt: new Date(),
//       message: "Dear Tatiana, your lease for Unit 1511 is now active.",
//       status: "Sent",
//       priority: "High",
//     },
//   });
//   await prisma.listing.create({
//     data: {
//       apartmentId: apt1511.id,
//       listingDate: new Date("2023-08-20"),
//       moveInDate: new Date("2023-09-01"),
//       leaseLength: 12,
//       petFriendly: false,
//       furnished: true,
//       propertyId: property.id,
//     },
//   });
//   await prisma.parkingPass.create({
//     data: {
//       apartmentId: apt1511.id,
//       licensePlate: "TX-1511",
//       make: "Toyota",
//       model: "Corolla",
//       color: "Blue",
//       createdAt: new Date(),
//       expirationDate: new Date("2024-08-31"),
//     },
//   });
//   const smartLock1511 = await prisma.smartLock.create({
//     data: { apartmentId: apt1511.id },
//   });
//   await prisma.digitalAccessKey.create({
//     data: {
//       smartLockId: smartLock1511.id,
//       code: "CR1511KEY",
//       expirationDate: new Date("2024-08-31"),
//     },
//   });

//   // Tenant 3: Andrew Smith (Unit 1008)
//   const tenantUser3 = await prisma.user.create({
//     data: {
//       firstName: "Andrew",
//       lastName: "Smith",
//       dob: new Date("1989-03-10"),
//       email: "andrew.smith@gmail.com", // Updated to Gmail per instructions
//       password: "tenantpass3",
//     },
//   });
//   const tenantAddress3 = await prisma.address.create({
//     data: {
//       number: "700",
//       street: "Oak Street",
//       aptSuite: "",
//       city: "Brockton",
//       state: "MA",
//       zipcode: "2301",
//       country: "USA",
//     },
//   });
//   await prisma.applicant.create({
//     data: {
//       userId: tenantUser3.id,
//       userRole: "Tenant Applicant",
//       addressId: tenantAddress3.id,
//       governmentId: "GOV-003",
//       socialSecurity: "333-33-3333",
//       vehicles: 1,
//       smoker: "No",
//       annualIncome: 65000,
//       pet: "Dog",
//       signatureStatus: "Signed",
//     },
//   });
//   // Create a lease for Unit 1008 with Andrew.
//   const lease1008 = await prisma.lease.create({
//     data: {
//       apartmentId: apt1008.id,
//       leaseStart: new Date("2023-10-01"),
//       leaseEnd: new Date("2024-09-30"),
//       monthlyRent: 3884,
//       securityDeposit: 3884,
//       leaseStatus: "Active",
//     },
//   });
//   const tenantRecord3 = await prisma.tenant.create({
//     data: {
//       userId: tenantUser3.id,
//       leaseId: lease1008.id,
//     },
//   });
//   await prisma.notification.create({
//     data: {
//       tenantId: tenantRecord3.id,
//       propertyId: property.id,
//       notificationType: "Email",
//       title: "Welcome to Cirque Residences - Unit 1008",
//       sentAt: new Date(),
//       message: "Dear Andrew, your lease for Unit 1008 is now active.",
//       status: "Sent",
//       priority: "High",
//     },
//   });
//   await prisma.listing.create({
//     data: {
//       apartmentId: apt1008.id,
//       listingDate: new Date("2023-09-10"),
//       moveInDate: new Date("2023-10-01"),
//       leaseLength: 12,
//       petFriendly: true,
//       furnished: false,
//       propertyId: property.id,
//     },
//   });
//   await prisma.parkingPass.create({
//     data: {
//       apartmentId: apt1008.id,
//       licensePlate: "TX-1008",
//       make: "Ford",
//       model: "Focus",
//       color: "Black",
//       createdAt: new Date(),
//       expirationDate: new Date("2024-09-30"),
//     },
//   });
//   const smartLock1008 = await prisma.smartLock.create({
//     data: { apartmentId: apt1008.id },
//   });
//   await prisma.digitalAccessKey.create({
//     data: {
//       smartLockId: smartLock1008.id,
//       code: "CR1008KEY",
//       expirationDate: new Date("2024-09-30"),
//     },
//   });

//   // Tenant 4: Staci Southerland (Unit 1708)
//   const tenantUser4 = await prisma.user.create({
//     data: {
//       firstName: "Staci",
//       lastName: "Southerland",
//       dob: new Date("1992-04-18"),
//       email: "staci.southerland@gmail.com", // Changed to Gmail per instructions
//       password: "tenantpass4",
//     },
//   });
//   const tenantAddress4 = await prisma.address.create({
//     data: {
//       number: "66-4",
//       street: "Parkhurst Rd",
//       aptSuite: "",
//       city: "Chelmsford",
//       state: "MA",
//       zipcode: "1824",
//       country: "USA",
//     },
//   });
//   await prisma.applicant.create({
//     data: {
//       userId: tenantUser4.id,
//       userRole: "Tenant Applicant",
//       addressId: tenantAddress4.id,
//       governmentId: "GOV-004",
//       socialSecurity: "444-44-4444",
//       vehicles: 0,
//       smoker: "No",
//       annualIncome: 60000,
//       pet: "None",
//       signatureStatus: "Signed",
//     },
//   });
//   // Create a lease for Unit 1708 with Staci.
//   const lease1708 = await prisma.lease.create({
//     data: {
//       apartmentId: apt1708.id,
//       leaseStart: new Date("2023-11-01"),
//       leaseEnd: new Date("2024-10-31"),
//       monthlyRent: 3934,
//       securityDeposit: 3934,
//       leaseStatus: "Active",
//     },
//   });
//   const tenantRecord4 = await prisma.tenant.create({
//     data: {
//       userId: tenantUser4.id,
//       leaseId: lease1708.id,
//     },
//   });
//   await prisma.notification.create({
//     data: {
//       tenantId: tenantRecord4.id,
//       propertyId: property.id,
//       notificationType: "Email",
//       title: "Welcome to Cirque Residences - Unit 1708",
//       sentAt: new Date(),
//       message: "Dear Staci, your lease for Unit 1708 is now active.",
//       status: "Sent",
//       priority: "High",
//     },
//   });
//   await prisma.listing.create({
//     data: {
//       apartmentId: apt1708.id,
//       listingDate: new Date("2023-10-15"),
//       moveInDate: new Date("2023-11-01"),
//       leaseLength: 12,
//       petFriendly: false,
//       furnished: true,
//       propertyId: property.id,
//     },
//   });
//   await prisma.parkingPass.create({
//     data: {
//       apartmentId: apt1708.id,
//       licensePlate: "TX-1708",
//       make: "Chevrolet",
//       model: "Malibu",
//       color: "White",
//       createdAt: new Date(),
//       expirationDate: new Date("2024-10-31"),
//     },
//   });
//   const smartLock1708 = await prisma.smartLock.create({
//     data: { apartmentId: apt1708.id },
//   });
//   await prisma.digitalAccessKey.create({
//     data: {
//       smartLockId: smartLock1708.id,
//       code: "CR1708KEY",
//       expirationDate: new Date("2024-10-31"),
//     },
//   });

//   // ============================================================================
//   // CREATE RENTAL APPLICATIONS FOR VACANT UNITS (Vacancy Scenario)
//   // ----------------------------------------------------------------------------
//   // For units that are vacant, we create rental applications and applicant records to simulate prospective tenants.
//   // Unit 1512 is vacant.
//   const rentalApp1512 = await prisma.rentalApplication.create({
//     data: {
//       apartmentId: apt1512.id,
//       status: "Pending",
//       startDate: new Date("2023-12-01"),
//       length: 12,
//     },
//   });
//   await prisma.applicant.create({
//     data: {
//       userId: (await prisma.user.create({
//         data: {
//           firstName: "Prospect",
//           lastName: "One",
//           dob: new Date("1995-05-05"),
//           email: "prospect.one@gmail.com",
//           password: "prospectpass1",
//         },
//       })).id,
//       userRole: "Applicant",
//       rentalApplicationId: rentalApp1512.id,
//       addressId: (await prisma.address.create({
//         data: {
//           number: "123",
//           street: "Elm Street",
//           aptSuite: "",
//           city: "Dallas",
//           state: "TX",
//           zipcode: "75220",
//           country: "USA",
//         },
//       })).id,
//       governmentId: "GOV-PROS-001",
//       socialSecurity: "555-55-5555",
//       vehicles: 1,
//       smoker: "No",
//       annualIncome: 70000,
//       pet: "Dog",
//       signatureStatus: "Pending",
//     },
//   });

//   // Unit 2508 is vacant.
//   const rentalApp2508 = await prisma.rentalApplication.create({
//     data: {
//       apartmentId: apt2508.id,
//       status: "Pending",
//       startDate: new Date("2023-12-15"),
//       length: 12,
//     },
//   });
//   await prisma.applicant.create({
//     data: {
//       userId: (await prisma.user.create({
//         data: {
//           firstName: "Prospect",
//           lastName: "Two",
//           dob: new Date("1996-06-06"),
//           email: "prospect.two@gmail.com",
//           password: "prospectpass2",
//         },
//       })).id,
//       userRole: "Applicant",
//       rentalApplicationId: rentalApp2508.id,
//       addressId: (await prisma.address.create({
//         data: {
//           number: "456",
//           street: "Pine Street",
//           aptSuite: "",
//           city: "Dallas",
//           state: "TX",
//           zipcode: "75221",
//           country: "USA",
//         },
//       })).id,
//       governmentId: "GOV-PROS-002",
//       socialSecurity: "666-66-6666",
//       vehicles: 0,
//       smoker: "No",
//       annualIncome: 72000,
//       pet: "None",
//       signatureStatus: "Pending",
//     },
//   });

//   // ============================================================================
//   // (OPTIONAL) CREATE AMENITIES AND LINK THEM TO THE PROPERTY
//   // ----------------------------------------------------------------------------
//   const amenityPool = await prisma.amenity.create({
//     data: {
//       amenityName: "Rooftop Pool",
//       description: "Heated pool with skyline views",
//       location: "Rooftop",
//       availabilityStatus: "Available",
//       requiresAccessCode: false,
//       createdAt: new Date(),
//     },
//   });
//   const amenityGym = await prisma.amenity.create({
//     data: {
//       amenityName: "State-of-the-Art Gym",
//       description: "Modern gym equipment and classes",
//       location: "Basement",
//       availabilityStatus: "Available",
//       requiresAccessCode: false,
//       createdAt: new Date(),

//   const user = await prisma.user.create({
//     data: {
//       firstName: 'Test',
//       lastName: 'Test',
//       email: 'test@gmail.com',
//       password: 'password',
//       dateOfBirth: new Date('2002-02-02'),
//       phoneNumber: '123-456-7890',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   });

//   await prisma.propertyToAmenity.createMany({
//     data: [
//       { propertyId: property.id, amenityId: amenityPool.id },
//       { propertyId: property.id, amenityId: amenityGym.id },
//     ],
//   });

//   // ============================================================================
//   // (OPTIONAL) CREATE A PACKAGE LOCKER AND LOG
//   // ----------------------------------------------------------------------------
//   const packageLocker = await prisma.packageLocker.create({
//     data: {
//       propertyId: property.id,
//       lockerNumber: "PL-001",
//       location: "Lobby",
//       lockerStatus: "Active",
//       lastAccessedAt: new Date(),
//       accessCode: "LOCK-PL001",
//       assignedUserId: managerUser.id,
//       packageId: "PKG-001",
//     },
//   });
//   await prisma.packageLockerLog.create({
//     data: {
//       packageLockerId: packageLocker.id,
//       packageId: "PKG-001",
//       assignedUserId: managerUser.id,
//       action: "Opened",
//       timestamp: new Date(),
//       performedBy: "George Manager",
//     },
//   });

//   console.log("Seeding completed successfully with real apartment data and all relationships.")
// }

// })
// }

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
