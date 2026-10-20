import MostrarPublicaciones from "../components/MostrarPubliaciones";

export default function Viajes() {
    return (
        <>
        <h1 style={{ color: "red"} }>VIAJES Y TRASLADOS</h1>
            <MostrarPublicaciones filtroCategoria="VIAJES"/>

        </>
    );
}