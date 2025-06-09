-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "clickCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';
