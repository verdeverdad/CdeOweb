import VolverAtras from "../components/BackButton";
import MostrarPublicaciones from "../components/MostrarPubliaciones";

export default function Cultura() {
    return (
        <>
            <h1 style={{ textAlign: 'center', backgroundColor: 'var(--amarillo)', color: 'var(--violeta)', fontSize: '2.4rem' }}>CULTURA</h1>
            <VolverAtras></VolverAtras>
            <MostrarPublicaciones filtroCategoria="CULTURA" />

        </>
    );
}