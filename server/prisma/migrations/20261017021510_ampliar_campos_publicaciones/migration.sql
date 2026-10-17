ALTER TABLE "Post"
  ADD COLUMN "aportePorPersona" DECIMAL(10,2),
  ADD COLUMN "cantidadPasajeros" INTEGER,
  ADD COLUMN "compartirGastos" TEXT,
  ADD COLUMN "costoActividad" TEXT,
  ADD COLUMN "descripcionAdicional" TEXT,
  ADD COLUMN "destino" TEXT,
  ADD COLUMN "diaMes" INTEGER,
  ADD COLUMN "diaSemana" TEXT,
  ADD COLUMN "diaSemanaMensual" TEXT,
  ADD COLUMN "estado" TEXT NOT NULL DEFAULT 'ACTIVA',
  ADD COLUMN "fechaActividad" TIMESTAMP(3),
  ADD COLUMN "fechaFin" TIMESTAMP(3),
  ADD COLUMN "fechaInicio" TIMESTAMP(3),
  ADD COLUMN "fechaViaje" TIMESTAMP(3),
  ADD COLUMN "frecuencia" TEXT,
  ADD COLUMN "horaActividad" TEXT,
  ADD COLUMN "horaViaje" TEXT,
  ADD COLUMN "horarioDisponible" TEXT,
  ADD COLUMN "importeActividad" DECIMAL(10,2),
  ADD COLUMN "localidades" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "lugarActividad" TEXT,
  ADD COLUMN "modalidadCobro" TEXT,
  ADD COLUMN "ordinalMensual" TEXT,
  ADD COLUMN "origen" TEXT,
  ADD COLUMN "plazasDisponibles" INTEGER,
  ADD COLUMN "precio" DECIMAL(10,2),
  ADD COLUMN "queBusca" TEXT,
  ADD COLUMN "queOfrece" TEXT,
  ADD COLUMN "reglaMensual" TEXT,
  ADD COLUMN "tipoActividad" TEXT,
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "Post"
  ALTER COLUMN "fecha" SET DEFAULT '',
  ALTER COLUMN "hora" SET DEFAULT '',
  ALTER COLUMN "fotos" SET DEFAULT ARRAY[]::TEXT[];

CREATE INDEX "Post_categoria_subCategoria_idx"
  ON "Post"("categoria", "subCategoria");

CREATE INDEX "Post_estado_createdAt_idx"
  ON "Post"("estado", "createdAt");