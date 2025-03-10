/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Applicant` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `LeasingAgent` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PropertyManager` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rentalApplicationId]` on the table `Applicant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[leaseId]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userRole` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Made the column `governmentId` on table `Applicant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `socialSecurity` on table `Applicant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `smoker` on table `Applicant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pet` on table `Applicant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `signatureStatus` on table `Applicant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `leaseId` on table `Tenant` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `DOB` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LeaseStatus" AS ENUM ('Active', 'Expired', 'Terminated');

-- CreateEnum
CREATE TYPE "RentalApplicationStatus" AS ENUM ('Pending', 'Approved', 'Denied');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('Email', 'SMS', 'Push');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('Sent', 'Pending', 'Failed');

-- CreateEnum
CREATE TYPE "NotificationPriority" AS ENUM ('Low', 'Medium', 'High');

-- CreateEnum
CREATE TYPE "AmenityAvailabilityStatus" AS ENUM ('Available', 'Unavailable');

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Applicant" DROP COLUMN "createdAt",
ADD COLUMN     "addressId" TEXT,
ADD COLUMN     "userRole" TEXT NOT NULL,
ALTER COLUMN "governmentId" SET NOT NULL,
ALTER COLUMN "socialSecurity" SET NOT NULL,
ALTER COLUMN "smoker" SET NOT NULL,
ALTER COLUMN "smoker" SET DATA TYPE TEXT,
ALTER COLUMN "pet" SET NOT NULL,
ALTER COLUMN "pet" SET DATA TYPE TEXT,
ALTER COLUMN "signatureStatus" SET NOT NULL;

-- AlterTable
ALTER TABLE "LeasingAgent" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "propertyId" TEXT;

-- AlterTable
ALTER TABLE "PropertyManager" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "createdAt",
ALTER COLUMN "leaseId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "dob",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phoneNumber",
ADD COLUMN     "DOB" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RentalApplication" (
    "id" TEXT NOT NULL,
    "apartmentId" TEXT,
    "status" "RentalApplicationStatus" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "length" INTEGER NOT NULL,

    CONSTRAINT "RentalApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lease" (
    "id" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "lease_start" TIMESTAMP(3) NOT NULL,
    "lease_end" TIMESTAMP(3) NOT NULL,
    "monthly_rent" DECIMAL(10,2) NOT NULL,
    "security_deposit" DECIMAL(10,2) NOT NULL,
    "leaseStatus" "LeaseStatus" NOT NULL,

    CONSTRAINT "Lease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManagementCompany" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "website_url" TEXT,

    CONSTRAINT "ManagementCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "apt_suite" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "managementCompanyId" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "property_name" TEXT NOT NULL,
    "website_url" TEXT,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apartment" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "unit_number" TEXT NOT NULL,
    "max_capacity" INTEGER NOT NULL,
    "square_feet" INTEGER NOT NULL,
    "image" TEXT,
    "bedrooms" INTEGER NOT NULL,
    "baths" INTEGER NOT NULL,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "listing_date" TIMESTAMP(3) NOT NULL,
    "move_in_date" TIMESTAMP(3) NOT NULL,
    "lease_length" INTEGER NOT NULL,
    "pet_friendly" BOOLEAN NOT NULL,
    "furnished" BOOLEAN NOT NULL,
    "propertyId" TEXT,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notification_id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "property_id" TEXT,
    "notification_type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL,
    "priority" "NotificationPriority" NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "ParkingPass" (
    "id" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiration_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParkingPass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmartLock" (
    "id" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,

    CONSTRAINT "SmartLock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DigitalAccessKey" (
    "id" TEXT NOT NULL,
    "smartLockId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DigitalAccessKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenity" (
    "id" TEXT NOT NULL,
    "amenity_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "availability_status" "AmenityAvailabilityStatus" NOT NULL,
    "requires_access_code" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyToAmenity" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "amenityId" TEXT NOT NULL,

    CONSTRAINT "PropertyToAmenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageLocker" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "locker_number" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "locker_status" TEXT NOT NULL,
    "last_accessed_at" TIMESTAMP(3),
    "access_code" TEXT NOT NULL,
    "assigned_user_id" TEXT,
    "package_id" TEXT,

    CONSTRAINT "PackageLocker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageLockerLog" (
    "id" TEXT NOT NULL,
    "package_locker_id" TEXT NOT NULL,
    "package_id" TEXT,
    "assigned_user_id" TEXT,
    "action" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "performed_by" TEXT NOT NULL,

    CONSTRAINT "PackageLockerLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RentalApplication_apartmentId_key" ON "RentalApplication"("apartmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Lease_apartmentId_key" ON "Lease"("apartmentId");

-- CreateIndex
CREATE UNIQUE INDEX "ManagementCompany_addressId_key" ON "ManagementCompany"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "SmartLock_apartmentId_key" ON "SmartLock"("apartmentId");

-- CreateIndex
CREATE UNIQUE INDEX "DigitalAccessKey_smartLockId_key" ON "DigitalAccessKey"("smartLockId");

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_rentalApplicationId_key" ON "Applicant"("rentalApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_leaseId_key" ON "Tenant"("leaseId");

-- AddForeignKey
ALTER TABLE "RentalApplication" ADD CONSTRAINT "RentalApplication_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_rentalApplicationId_fkey" FOREIGN KEY ("rentalApplicationId") REFERENCES "RentalApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeasingAgent" ADD CONSTRAINT "LeasingAgent_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lease" ADD CONSTRAINT "Lease_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "Lease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManagementCompany" ADD CONSTRAINT "ManagementCompany_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_managementCompanyId_fkey" FOREIGN KEY ("managementCompanyId") REFERENCES "ManagementCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingPass" ADD CONSTRAINT "ParkingPass_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmartLock" ADD CONSTRAINT "SmartLock_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DigitalAccessKey" ADD CONSTRAINT "DigitalAccessKey_smartLockId_fkey" FOREIGN KEY ("smartLockId") REFERENCES "SmartLock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyToAmenity" ADD CONSTRAINT "PropertyToAmenity_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyToAmenity" ADD CONSTRAINT "PropertyToAmenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageLocker" ADD CONSTRAINT "PackageLocker_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageLockerLog" ADD CONSTRAINT "PackageLockerLog_package_locker_id_fkey" FOREIGN KEY ("package_locker_id") REFERENCES "PackageLocker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
