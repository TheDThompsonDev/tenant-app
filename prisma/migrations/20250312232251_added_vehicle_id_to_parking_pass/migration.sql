/*
  Warnings:

  - You are about to drop the column `propertyId` on the `Tenant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vehicleId]` on the table `ParkingPass` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_propertyId_fkey";

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "propertyId";

-- CreateIndex
CREATE UNIQUE INDEX "ParkingPass_vehicleId_key" ON "ParkingPass"("vehicleId");
