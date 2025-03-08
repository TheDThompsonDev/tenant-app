/*
  Warnings:

  - You are about to alter the column `firstName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `lastName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `phoneNumber` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'APPLICANT', 'TENANT', 'PROPERTY_MANAGER', 'LEASING_AGENT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "phoneNumber" SET DATA TYPE VARCHAR(40);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "suiteNumber" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" SERIAL NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManagementCompany" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    "websiteURL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManagementCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "managementCompanyId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "propertyName" TEXT NOT NULL,
    "websiteURL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenity" (
    "id" SERIAL NOT NULL,
    "amenityName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "availabilityStatus" TIMESTAMP(3) NOT NULL,
    "requiresAccessCode" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyToAmenity" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "amenityId" INTEGER NOT NULL,

    CONSTRAINT "PropertyToAmenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apartment" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "unitNumber" INTEGER NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "squareFeet" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "beddrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ManagementCompany_addressId_key" ON "ManagementCompany"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Property_managementCompanyId_key" ON "Property"("managementCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "Property_addressId_key" ON "Property"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyToAmenity_propertyId_key" ON "PropertyToAmenity"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyToAmenity_amenityId_key" ON "PropertyToAmenity"("amenityId");

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_propertyId_key" ON "Apartment"("propertyId");

-- AddForeignKey
ALTER TABLE "ManagementCompany" ADD CONSTRAINT "ManagementCompany_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_managementCompanyId_fkey" FOREIGN KEY ("managementCompanyId") REFERENCES "ManagementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyToAmenity" ADD CONSTRAINT "PropertyToAmenity_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyToAmenity" ADD CONSTRAINT "PropertyToAmenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "Amenity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
