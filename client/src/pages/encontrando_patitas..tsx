import MostrarPublicaciones from "../components/MostrarPubliaciones";

export default function Mascotas() {
    return (
        <>
        <h1 style={{ color: "red"} }>ENCONTRANDO PATITAS</h1>
            <MostrarPublicaciones filtroCategoria="PATITAS" />

        </>
    );
}