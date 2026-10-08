import MostrarPublicaciones from "../components/MostrarPubliaciones";

export default function Mercado() {
    return (
        <>
        <h1 style={{ color: "red"} }>M E R C A D O</h1>
            <MostrarPublicaciones filtroCategoria="MERCADO" />

        </>
    );
}