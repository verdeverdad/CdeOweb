import MostrarPublicaciones from "../components/MostrarPubliaciones";

export default function Mascotas() {
    return (
        <>
        <h1 style={{textAlign: 'center', backgroundColor: 'var(--violeta)', color: 'var(--blanco)', fontSize: '2.4rem'}}>ENCONTRANDO PATITAS</h1>
            <MostrarPublicaciones filtroCategoria="ENCONTRANDO_PATITAS" />

        </>
    );
}