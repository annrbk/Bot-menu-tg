/*
  Warnings:

  - Made the column `callback` on table `Dish` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Dish" ALTER COLUMN "callback" SET NOT NULL;
