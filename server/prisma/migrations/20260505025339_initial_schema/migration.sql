/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Equipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rental` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'NEGOCIO', 'VECINO');

-- CreateEnum
CREATE TYPE "Localidad" AS ENUM ('NEPTUNIA', 'PINAMAR', 'SALINAS', 'MARINDIA', 'EL_FORTIN', 'VILLA_ARGENTINA', 'ATLANTIDA', 'LAS_TOSCAS', 'PARQUE_DEL_PLATA', 'LAS_VEGAS', 'LAS_VEGAS_NORTE', 'LA_FLORESTA', 'ESTACION_FLORESTA', 'COSTA_AZUL', 'BELLO_HORIZONTE', 'GUAZUVIRA_NUEVO', 'GUAZUVIRA_VIEJO', 'SAN_LUIS', 'LOS_TITANES', 'LA_TUNA', 'ARAMINDA', 'SANTA_LUCIA_DEL_ESTE', 'BIARRITZ', 'CUCHILLA_ALTA', 'EL_GALEON', 'SANTA_ANA', 'BALNEARIO_ARGENTINO', 'JAUREGUIBERRY');

-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('MERCADO', 'PATITAS', 'CULTURA', 'SERVICIOS', 'TRABAJO');

-- DropForeignKey
ALTER TABLE "Rental" DROP CONSTRAINT "Rental_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Rental" DROP CONSTRAINT "Rental_equipmentId_fkey";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Equipment";

-- DropTable
DROP TABLE "Rental";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT,
    "localidad" "Localidad" NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'VECINO',
    "fotoUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "googleMaps" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "tiktok" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "localidad" "Localidad" NOT NULL,
    "categoria" TEXT NOT NULL,
    "subCategoria" TEXT NOT NULL,
    "fotos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
