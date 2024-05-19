-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "contactInfo" JSONB,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "followers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "openingHours" TEXT[],
ADD COLUMN     "returnPolicy" TEXT;
