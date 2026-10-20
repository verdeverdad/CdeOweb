import MostrarPublicaciones from "../components/MostrarPubliaciones";

export default function Comunidad() {
    return (
        <>
        <h1 style={{ color: "red"} }>Comunidad</h1>
            <MostrarPublicaciones filtroCategoria="COMUNIDAD"/>

        </>
    );
}