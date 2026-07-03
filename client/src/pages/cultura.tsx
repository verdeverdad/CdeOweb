import MostrarPublicaciones from "../components/MostrarPubliaciones";
import { CATEGORIAS } from "../types";

export default function Cultura() {
    return (
        <>
        <h1 style={{ color: "red"} }>C U L T U R A</h1>
            <MostrarPublicaciones filtroCategoria={CATEGORIAS.CULTURA} />

        </>
    );
}