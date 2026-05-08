import MostrarPublicaciones from "../components/MostrarPubliaciones";
import { CATEGORIAS } from "../types";

export default function Cultura() {
    return (
        <>
        <h1>dalee</h1>
            <MostrarPublicaciones filtroCategoria={CATEGORIAS.CULTURA} />

        </>
    );
}