/*
  Warnings:

  - The values [PATITAS,SERVICIOS,TRABAJO] on the enum `Categoria` will be removed. If these variants are still used in the database, this will fail.
  - The values [NEGOCIO] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Categoria_new" AS ENUM ('COMUNIDAD', 'MERCADO', 'CULTURA', 'ENCONTRANDO_PATITAS', 'VIAJES', 'OFICIOS_Y_SERVICIOS');
ALTER TYPE "Categoria" RENAME TO "Categoria_old";
ALTER TYPE "Categoria_new" RENAME TO "Categoria";
DROP TYPE "public"."Categoria_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'PERFIL_PUBLICO', 'VECINO');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'VECINO';
COMMIT;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "descripcion" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordHash" TEXT NOT NULL;
