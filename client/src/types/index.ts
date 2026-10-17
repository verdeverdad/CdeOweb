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
    PATITAS: [
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
    TRABAJO_Y_SERVICIOS: [
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
    contenido: string;
    localidad: Localidad;
    categoria: Categoría;
    subCategoria: SubCategoria;
    image?: string;
    fecha: string;
    hora: string;
    createdAt: string;
    author: {
        id: string;
        nombre: string;
        telefono?: string;
    }
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
