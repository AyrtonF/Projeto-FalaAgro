/*
  Warnings:

  - You are about to drop the column `AccessName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categories" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "image" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "quantityAvailable" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "AccessName";
