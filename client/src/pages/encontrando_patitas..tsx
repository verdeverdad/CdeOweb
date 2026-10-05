import MostrarPublicaciones from "../components/MostrarPubliaciones";
import { CATEGORIAS } from "../types";

export default function Mascotas() {
    return (
        <>
        <h1 style={{ color: "red"} }>ENCONTRANDO PATITAS</h1>
            <MostrarPublicaciones filtroCategoria={CATEGORIAS.PATITAS} />

        </>
    );
}