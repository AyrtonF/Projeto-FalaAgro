/*
  Warnings:

  - You are about to drop the column `quantity` on the `SaleProduct` table. All the data in the column will be lost.
  - Added the required column `quantify` to the `SaleProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaleProduct" DROP COLUMN "quantity",
ADD COLUMN     "quantify" INTEGER NOT NULL;
