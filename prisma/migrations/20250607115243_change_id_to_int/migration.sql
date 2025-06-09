/*
  Warnings:

  - The primary key for the `Url` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Url` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `urlId` on the `Click` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_urlId_fkey";

-- AlterTable
ALTER TABLE "Click" DROP COLUMN "urlId",
ADD COLUMN     "urlId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Url" DROP CONSTRAINT "Url_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days',
ADD CONSTRAINT "Url_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE CASCADE ON UPDATE CASCADE;
