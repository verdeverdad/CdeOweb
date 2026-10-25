import MostrarPublicaciones from "../components/MostrarPubliaciones";

export default function Comunidad() {
    return (
        <>
        <h1 style={{textAlign: 'center', backgroundColor: 'var(--naranja)', color: 'var(--negro)', fontSize: '2.4rem'}}>LA COMUNIDAD</h1>
            <MostrarPublicaciones filtroCategoria="COMUNIDAD"/>

        </>
    );
}