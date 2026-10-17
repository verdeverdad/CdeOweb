
BEGIN;

CREATE TYPE "Localidad_new" AS ENUM (
  'NEPTUNIA',
  'PINAMAR',
  'SALINAS',
  'MARINDIA',
  'EL_FORTIN_DE_SANTA_ROSA',
  'VILLA_ARGENTINA',
  'ATLANTIDA',
  'LAS_TOSCAS',
  'PARQUE_DEL_PLATA',
  'LAS_VEGAS',
  'ESTACION_FLORESTA',
  'LA_FLORESTA',
  'COSTA_AZUL',
  'BELLO_HORIZONTE',
  'GUAZUVIRA_NUEVO',
  'GUAZUVIRA',
  'SAN_LUIS',
  'LOS_TITANES',
  'LA_TUNA',
  'ARAMINDA',
  'SANTA_LUCIA_DEL_ESTE',
  'BIARRITZ',
  'CUCHILLA_ALTA',
  'EL_GALEON',
  'SIERRAS_DEL_MAR',
  'SANTA_ANA',
  'BALNEARIO_ARGENTINO',
  'PARAISO_SUIZO',
  'JAUREGUIBERRY'
);

ALTER TABLE "User"
  ALTER COLUMN "localidad" TYPE "Localidad_new"
  USING ("localidad"::text::"Localidad_new");

ALTER TABLE "Post"
  ALTER COLUMN "localidad" TYPE "Localidad_new"
  USING ("localidad"::text::"Localidad_new");

ALTER TABLE "Post"
  ALTER COLUMN "localidades" DROP DEFAULT;

ALTER TABLE "Post"
  ALTER COLUMN "localidades" TYPE "Localidad_new"[]
  USING ("localidades"::text[]::"Localidad_new"[]);

ALTER TABLE "Post"
  ALTER COLUMN "localidades"
  SET DEFAULT ARRAY[]::"Localidad_new"[];
  
ALTER TYPE "Localidad" RENAME TO "Localidad_old";
ALTER TYPE "Localidad_new" RENAME TO "Localidad";
DROP TYPE "public"."Localidad_old";

COMMIT;
