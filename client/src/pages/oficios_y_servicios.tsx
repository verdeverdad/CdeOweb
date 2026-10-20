import MostrarPublicaciones from "../components/MostrarPubliaciones";

export default function OficiosYServicios() {
    return (
        <>
        <h1 style={{ color: "red"} }>OFICIOS Y SERVICIOS</h1>
            <MostrarPublicaciones filtroCategoria="OFICIOS_Y_SERVICIOS"/>

        </>
    );
}