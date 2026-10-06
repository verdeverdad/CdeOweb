export type Localidad =
    | 'NEPTUNIA' | 'PINAMAR' | 'SALINAS' | 'MARINDIA' | 'EL_FORTIN' | 'VILLA_ARGENTINA' | 'ATLANTIDA'
    | 'LAS TOSCAS' | 'PARQUE DEL PLATA' | 'LAS VEGAS' | 'LAS VEGAS NORTE' | 'LA FLORESTA' | 'ESTACION FLORESTA' | 'COSTA AZUL' | 'BELLO HORIZONTE' | 'GUAZUVIRA NUEVO' | 'GUAZUVIRA VIEJO' | 'SAN LUIS' | 'CUCHILLA ALTA' | 'SAN LUIS' |
    'LOS TITANES' | 'LATUNA' | 'ARAMINDA' | 'SANTA LUCIA DEL ESTE' | 'BIARRITZ' | 'CUCHILLA ALTA' | 'EL GALEON' | 'SANTA ANA' | 'BALNEARIO ARGENTINO' | 'JAUREGUIBERRY'
    ;

export const CATEGORIAS = {
  MERCADO: 'MERCADO',
  PATITAS: 'PATITAS',
  CULTURA: 'CULTURA',
  TRABAJO: 'TRABAJO',
  SERVICIOS: 'SERVICIOS'
} as const;

export type Categoría = typeof CATEGORIAS[keyof typeof CATEGORIAS];

export interface Post {
    id: string;
    titulo: string;
    contenido: string;
    localidad: Localidad;
    categoria: Categoría;
    subCategoria: string;
    image?: string;
    fecha: string;
    hora: string;
    createdAt: string;
    author: {
        nombre: string;
        telefono?: string;
    }
}

export type Rol = 'VECINO' | 'PERFIL_PUBLICO' | 'ADMIN' | 'SUPERADMIN';
