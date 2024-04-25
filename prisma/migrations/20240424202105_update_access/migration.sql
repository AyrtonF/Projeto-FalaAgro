/*
  Warnings:

  - You are about to drop the `Acess` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_acessId_fkey";

-- DropTable
DROP TABLE "Acess";

-- CreateTable
CREATE TABLE "Access" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Access_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Access_name_key" ON "Access"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_acessId_fkey" FOREIGN KEY ("acessId") REFERENCES "Access"("id") ON DELETE SET NULL ON UPDATE CASCADE;
