/*
  Warnings:

  - You are about to drop the column `apt_suite` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `amenity_name` on the `Amenity` table. All the data in the column will be lost.
  - You are about to drop the column `availability_status` on the `Amenity` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Amenity` table. All the data in the column will be lost.
  - You are about to drop the column `requires_access_code` on the `Amenity` table. All the data in the column will be lost.
  - You are about to drop the column `max_capacity` on the `Apartment` table. All the data in the column will be lost.
  - You are about to drop the column `square_feet` on the `Apartment` table. All the data in the column will be lost.
  - You are about to drop the column `unit_number` on the `Apartment` table. All the data in the column will be lost.
  - You are about to drop the column `expiration_date` on the `DigitalAccessKey` table. All the data in the column will be lost.
  - You are about to drop the column `lease_end` on the `Lease` table. All the data in the column will be lost.
  - You are about to drop the column `lease_start` on the `Lease` table. All the data in the column will be lost.
  - You are about to drop the column `monthly_rent` on the `Lease` table. All the data in the column will be lost.
  - You are about to drop the column `security_deposit` on the `Lease` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `LeasingAgent` table. All the data in the column will be lost.
  - You are about to drop the column `lease_length` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `listing_date` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `move_in_date` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `pet_friendly` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `website_url` on the `ManagementCompany` table. All the data in the column will be lost.
  - You are about to drop the column `notification_type` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `property_id` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `sent_at` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `access_code` on the `PackageLocker` table. All the data in the column will be lost.
  - You are about to drop the column `assigned_user_id` on the `PackageLocker` table. All the data in the column will be lost.
  - You are about to drop the column `last_accessed_at` on the `PackageLocker` table. All the data in the column will be lost.
  - You are about to drop the column `locker_number` on the `PackageLocker` table. All the data in the column will be lost.
  - You are about to drop the column `locker_status` on the `PackageLocker` table. All the data in the column will be lost.
  - You are about to drop the column `package_id` on the `PackageLocker` table. All the data in the column will be lost.
  - You are about to drop the column `assigned_user_id` on the `PackageLockerLog` table. All the data in the column will be lost.
  - You are about to drop the column `package_id` on the `PackageLockerLog` table. All the data in the column will be lost.
  - You are about to drop the column `package_locker_id` on the `PackageLockerLog` table. All the data in the column will be lost.
  - You are about to drop the column `performed_by` on the `PackageLockerLog` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `ParkingPass` table. All the data in the column will be lost.
  - You are about to drop the column `expiration_date` on the `ParkingPass` table. All the data in the column will be lost.
  - You are about to drop the column `license_plate` on the `ParkingPass` table. All the data in the column will be lost.
  - You are about to drop the column `property_name` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `website_url` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `RentalApplication` table. All the data in the column will be lost.
  - You are about to drop the column `DOB` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - Added the required column `amenityName` to the `Amenity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availabilityStatus` to the `Amenity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Amenity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requiresAccessCode` to the `Amenity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxCapacity` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `squareFeet` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitNumber` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expirationDate` to the `DigitalAccessKey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leaseEnd` to the `Lease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leaseStart` to the `Lease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyRent` to the `Lease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `securityDeposit` to the `Lease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leaseLength` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listingDate` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moveInDate` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petFriendly` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notificationType` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentAt` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessCode` to the `PackageLocker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lockerNumber` to the `PackageLocker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lockerStatus` to the `PackageLocker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageLockerId` to the `PackageLockerLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `performedBy` to the `PackageLockerLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expirationDate` to the `ParkingPass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licensePlate` to the `ParkingPass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyName` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PackageLockerLog" DROP CONSTRAINT "PackageLockerLog_package_locker_id_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "apt_suite",
ADD COLUMN     "aptSuite" TEXT;

-- AlterTable
ALTER TABLE "Amenity" DROP COLUMN "amenity_name",
DROP COLUMN "availability_status",
DROP COLUMN "created_at",
DROP COLUMN "requires_access_code",
ADD COLUMN     "amenityName" TEXT NOT NULL,
ADD COLUMN     "availabilityStatus" "AmenityAvailabilityStatus" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "requiresAccessCode" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Apartment" DROP COLUMN "max_capacity",
DROP COLUMN "square_feet",
DROP COLUMN "unit_number",
ADD COLUMN     "maxCapacity" INTEGER NOT NULL,
ADD COLUMN     "squareFeet" INTEGER NOT NULL,
ADD COLUMN     "unitNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DigitalAccessKey" DROP COLUMN "expiration_date",
ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Lease" DROP COLUMN "lease_end",
DROP COLUMN "lease_start",
DROP COLUMN "monthly_rent",
DROP COLUMN "security_deposit",
ADD COLUMN     "leaseEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "leaseStart" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "monthlyRent" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "securityDeposit" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "LeasingAgent" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "lease_length",
DROP COLUMN "listing_date",
DROP COLUMN "move_in_date",
DROP COLUMN "pet_friendly",
ADD COLUMN     "leaseLength" INTEGER NOT NULL,
ADD COLUMN     "listingDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "moveInDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "petFriendly" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "ManagementCompany" DROP COLUMN "website_url",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "websiteUrl" TEXT;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "notification_type",
DROP COLUMN "property_id",
DROP COLUMN "sent_at",
ADD COLUMN     "notificationType" "NotificationType" NOT NULL,
ADD COLUMN     "propertyId" TEXT,
ADD COLUMN     "sentAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PackageLocker" DROP COLUMN "access_code",
DROP COLUMN "assigned_user_id",
DROP COLUMN "last_accessed_at",
DROP COLUMN "locker_number",
DROP COLUMN "locker_status",
DROP COLUMN "package_id",
ADD COLUMN     "accessCode" TEXT NOT NULL,
ADD COLUMN     "assignedUserId" TEXT,
ADD COLUMN     "lastAccessedAt" TIMESTAMP(3),
ADD COLUMN     "lockerNumber" TEXT NOT NULL,
ADD COLUMN     "lockerStatus" TEXT NOT NULL,
ADD COLUMN     "packageId" TEXT;

-- AlterTable
ALTER TABLE "PackageLockerLog" DROP COLUMN "assigned_user_id",
DROP COLUMN "package_id",
DROP COLUMN "package_locker_id",
DROP COLUMN "performed_by",
ADD COLUMN     "assignedUserId" TEXT,
ADD COLUMN     "packageId" TEXT,
ADD COLUMN     "packageLockerId" TEXT NOT NULL,
ADD COLUMN     "performedBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ParkingPass" DROP COLUMN "created_at",
DROP COLUMN "expiration_date",
DROP COLUMN "license_plate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "licensePlate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "property_name",
DROP COLUMN "website_url",
ADD COLUMN     "propertyName" TEXT NOT NULL,
ADD COLUMN     "websiteUrl" TEXT;

-- AlterTable
ALTER TABLE "RentalApplication" DROP COLUMN "start_date",
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "DOB",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PackageLockerLog" ADD CONSTRAINT "PackageLockerLog_packageLockerId_fkey" FOREIGN KEY ("packageLockerId") REFERENCES "PackageLocker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
