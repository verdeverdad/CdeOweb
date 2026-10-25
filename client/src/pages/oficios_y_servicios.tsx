import VolverAtras from "../components/BackButton";
import MostrarPublicaciones from "../components/MostrarPubliaciones";

export default function OficiosYServicios() {
    return (
        <>
            <h1 style={{ textAlign: 'center', backgroundColor: 'var(--turqueza)', color: 'var(--negro)', fontSize: '2.4rem' }}>OFICIOS Y SERVICIOS</h1>
            <VolverAtras></VolverAtras>
            <MostrarPublicaciones filtroCategoria="OFICIOS_Y_SERVICIOS" />


        </>
    );
}