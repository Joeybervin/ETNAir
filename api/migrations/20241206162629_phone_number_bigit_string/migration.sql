-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lasrName" DROP NOT NULL,
ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT;