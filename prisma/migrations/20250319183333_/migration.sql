-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_leaseId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "leaseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "Lease"("id") ON DELETE SET NULL ON UPDATE CASCADE;
