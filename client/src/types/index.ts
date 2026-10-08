export const Localidad =
    ['NEPTUNIA', 'PINAMAR', 'SALINAS', 'MARINDIA', 'EL FORTIN', 'VILLA ARGENTINA', 'ATLANTIDA'
        , 'LAS TOSCAS', 'PARQUE DEL PLATA', 'LAS VEGAS', 'LAS VEGAS NORTE', 'LA FLORESTA', 'ESTACION FLORESTA', 'COSTA AZUL', 'BELLO HORIZONTE', 'GUAZUVIRA NUEVO', 'GUAZUVIRA VIEJO', 'SAN LUIS', 'CUCHILLA ALTA',
        'LOS TITANES', 'LATUNA', 'ARAMINDA', 'SANTA LUCIA DEL ESTE', 'BIARRITZ', 'EL GALEON', 'SANTA ANA', 'BALNEARIO ARGENTINO', 'JAUREGUIBERRY',
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
    TRABAJO_Y_SERVICIOS: ['TRABAJOS_Y_SERVICIOS',
        'BUSCO_SERVICIO',
        'OFERTAS_DE_TRABAJO',
        'BUSCO_TRABAJO',
        'OFICIOS',
        'PROFESIONALES'],
    VIAJES: ['OFREZCO_VIAJE',
        'BUSCO_VIAJE',
        'OFERTAS_DE_VIAJE',
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
        nombre: string;
        telefono?: string;
    }
}

export interface User {
    userData: UserData;
    publicProfile?: PublicProfile;
}

export interface UserData {
    nombre?: string;
    email: string;
    telefono?: string;
    localidad?: Localidad;
    rol?: Rol;

}

export interface PublicProfile {
    descripcion?: string;
    instagram?: string;
    facebook?: string;
    googleMaps?: string;
}

export type Rol = 'VECINO' | 'PERFIL_PUBLICO' | 'ADMIN' | 'SUPERADMIN';
