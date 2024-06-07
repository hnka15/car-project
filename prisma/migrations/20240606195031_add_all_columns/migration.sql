/*
  Warnings:

  - Added the required column `mod_fiscal` to the `propriety` table without a default value. This is not possible if the table is not empty.
  - Added the required column `num_area` to the `propriety` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shape_area` to the `propriety` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shape_leng` to the `propriety` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situacao` to the `propriety` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "propriety" ADD COLUMN     "mod_fiscal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "num_area" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "shape_area" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "shape_leng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "situacao" TEXT NOT NULL;
