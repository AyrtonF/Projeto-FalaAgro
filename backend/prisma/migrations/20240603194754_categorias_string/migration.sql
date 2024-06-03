/*
  Warnings:

  - The `categories` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `categories` column on the `Store` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `openingHours` column on the `Store` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `description` on table `Store` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categories",
ADD COLUMN     "categories" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Store" ALTER COLUMN "description" SET NOT NULL,
DROP COLUMN "categories",
ADD COLUMN     "categories" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "openingHours",
ADD COLUMN     "openingHours" TEXT[] DEFAULT ARRAY[]::TEXT[];
