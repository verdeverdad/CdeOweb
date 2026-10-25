import MostrarPublicaciones from "../components/MostrarPubliaciones";

export default function Viajes() {
    return (
        <>
        <h1 style={{textAlign: 'center', backgroundColor: 'var(--verde)', color: 'var(--negro)', fontSize: '2.4rem'}}>VIAJES Y TRASLADOS</h1>
            <MostrarPublicaciones filtroCategoria="VIAJES"/>

        </>
    );
}