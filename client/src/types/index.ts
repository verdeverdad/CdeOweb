export const Localidad = [
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
  'JAUREGUIBERRY',
] as const;

export type Localidad = typeof Localidad[number];

export const CATEGORIAS = {
    CULTURA: ['EVENTOS',
        'DEPORTE',
        'CURSOS',
        'TALLERES',
        'ARTE',
        'MUSICA',
        'CINE_TEATRO_DANZA'],
    MERCADO: [
        'TRUEQUE',
        'COMPRA',
        'VENTA',
        'GRATIFERIA',
    ],
    ENCONTRANDO_PATITAS: [
        'PERDIDOS',
        'ENCONTRADOS',
        'ADOPCION',
        'TRANSITO',
        'AYUDA',
        'SERVICIOS'],

    COMUNIDAD: [
        'NOTICIAS',
        'AVISOS',
        'HISTORIAS',
        'PARTICIPACION',
        'GALERIA',
    ],
    OFICIOS_Y_SERVICIOS: [
        'BUSCO_SERVICIO',
        'OFERTAS_DE_TRABAJO',
        'BUSCO_TRABAJO',
        'SERVICIOS'],
    VIAJES: [
        'BUSCO_VIAJE',
        'OFREZCO_VIAJE',
        'TRASLADOS',
        'TRANSPORTE']
} as const;

export type Categoría = keyof typeof CATEGORIAS;

export type SubCategoria =
  typeof CATEGORIAS[keyof typeof CATEGORIAS][number];

export interface Post {
  id: string;
  titulo: string;
  contenido: string | null;
  

  localidad: Localidad | null;
  localidades: Localidad[];

  categoria: Categoría;
  subCategoria: SubCategoria;

  // Fotos: conservamos image para no romper usos existentes
  fotos?: string[];

  fecha: string;
  hora: string;
  createdAt: string;
  updatedAt?: string;
  estado?: string;

  author: {
    id: string;
    nombre: string;
    telefono?: string | null;
  };

  // Mercado
  queOfrece?: string | null;
  queBusca?: string | null;
  descripcionAdicional?: string | null;
  precio?: number | string | null;

  // Cultura
  tipoActividad?: string | null;
  fechaActividad?: string | null;
  fechaInicio?: string | null;
  fechaFin?: string | null;
  frecuencia?: string | null;
  diaSemana?: string | null;
  reglaMensual?: string | null;
  diaMes?: number | null;
  ordinalMensual?: string | null;
  diaSemanaMensual?: string | null;
  horaActividad?: string | null;
  lugarActividad?: string | null;
  costoActividad?: string | null;
  importeActividad?: number | string | null;

  // Viajes
  origen?: string | null;
  destino?: string | null;
  fechaViaje?: string | null;
  horaViaje?: string | null;
  cantidadPasajeros?: number | null;
  plazasDisponibles?: number | null;
  compartirGastos?: string | null;
  aportePorPersona?: number | string | null;
  horarioDisponible?: string | null;
  modalidadCobro?: string | null;
}

export interface User {
    userData: UserData;
    publicProfile?: PublicProfile;
}

export interface UserData {
    id?: string;
    nombre?: string;
    email: string;
    telefono?: string;
    localidad?: Localidad;
    rol?: Role;

}

export interface PublicProfile {
    descripcion?: string;
    instagram?: string;
    facebook?: string;
    googleMaps?: string;
}

export type Role = 'VECINO' | 'PERFIL_PUBLICO' | 'ADMIN' | 'SUPER_ADMIN';
