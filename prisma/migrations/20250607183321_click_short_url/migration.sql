/*
  Warnings:

  - You are about to drop the column `urlId` on the `Click` table. All the data in the column will be lost.
  - Added the required column `shortUrl` to the `Click` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_urlId_fkey";

-- AlterTable
ALTER TABLE "Click" DROP COLUMN "urlId",
ADD COLUMN     "shortUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Url" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_shortUrl_fkey" FOREIGN KEY ("shortUrl") REFERENCES "Url"("shortUrl") ON DELETE CASCADE ON UPDATE CASCADE;
