export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'NEGOCIO' | 'VECINO';

export type Localidad =
    | 'NEPTUNIA' | 'PINAMAR' | 'SALINAS' | 'MARINDIA' | 'EL_FORTIN' | 'VILLA_ARGENTINA' | 'ATLANTIDA'
    | 'LAS_TOSCAS' | 'PARQUE_DEL_PLATA' | 'LAS_VEGAS' | 'LAS_VEGAS_NORTE' | 'LA_FLORESTA' | 'ESTACION_FLORESTA' | 'COSTA_AZUL' | 'BELLO_HORIZONTE' | 'GUAZUVIRA_NUEVO' | 'GUAZUVIRA_VIEJO' |'SAN_LUIS' | 'CUCHILLA_ALTA' | 'SAN_LUIS' |
    'LOS_TITANES' | 'LATUNA' | 'ARAMINDA' | 'SANTA_LUCIA_DEL_ESTE' | 'BIARRITZ' | 'CUCHILLA_ALTA' | 'EL_GALEON' | 'SANTA_ANA' | 'BALNEARIO_ARGENTINO' | 'JAUREGUIBERRY'
    ;

export interface Post {
    id?: string;
    titulo: string;
    contenido: string;
    localidad: Localidad;
    categoria: string;
    subCategoria: string;
    fecha: string;
    hora: string;
    authorId: string;
}