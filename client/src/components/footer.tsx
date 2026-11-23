import "../css/footer.css";
import footerBg from "../assets/footer.png"

const SECTIONS = [
    { label: "Inicio", href: "/index" },
    { label: "La Comunidad", href: "/la_comunidad" },
    { label: "Cultura", href: "/cultura" },
    { label: "Mercado", href: "/mercado" },
    { label: "Servicios", href: "/oficios_y_servicios" },
    { label: "Viajes", href: "/viajes" },
    { label: "Mascotas", href: "/encontrando_patitas" },
    { label: "Perfil", href: "/perfil" },
    { label: "Contacto", href: "/contacto" },
    { label: "Politicas de privacidad", href: "/politica_de_privacidad" },
    { label: "Terminos y condiciones", href: "/terminos_y_condiciones" },
    { label: "Reportar un problema", href: "/reportar_problema" },
];

export default function Footer() {
    return (
        <footer
            className="footer"
            style={{
                backgroundImage: `linear-gradient(to right, rgba(10, 22, 28, 0.08) 0%, rgba(10, 22, 28, 0.07) 60%, rgba(10, 22, 28, 0.74) 100%), url(${footerBg})`,
                backgroundSize: "cover",
                backgroundPosition: "left center",
                backgroundRepeat: "no-repeat",
            }}
            aria-label="Pie de página"
        >
            <div className="">
                <div className="footer__inner">

                    <nav className="footer__nav" aria-label="Secciones del sitio">
                        <ul className="footer__links">
                            {SECTIONS.map((item) => (
                                <li key={item.href} className="footer__item">
                                    <a href={item.href} className="footer__link">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <p className="footer__credit">
                    <span>creado por:  <a href="https://www.sdstudio.click" target="_blank" rel="noopener noreferrer"> SDSTUDIO </a></span>
                </p>
            </div>
        </footer>
    );
}