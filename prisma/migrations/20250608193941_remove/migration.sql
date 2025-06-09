/*
  Warnings:

  - You are about to drop the column `clickCount` on the `Url` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Url" DROP COLUMN "clickCount",
ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';
