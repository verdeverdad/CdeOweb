import VolverAtras from "../components/BackButton";
import MostrarPublicaciones from "../components/MostrarPubliaciones";

export default function Mercado() {
    return (
        <>
            <h1 style={{ textAlign: 'center', backgroundColor: 'var(--rosa)', color: 'var(-negro)', fontSize: '2.4rem' }}>MERCADO</h1>
            <VolverAtras></VolverAtras>
            <MostrarPublicaciones filtroCategoria="MERCADO" />


        </>
    );
}