# 🛶 Costa de Oro - Sistema de Gestión (CdeO)

Este proyecto es una plataforma Full Stack diseñada para la gestión de servicios en la zona de la Costa de Oro (comenzando con **Actividades culturales** y **intereses de la zona**). Construido con un enfoque en **accesibilidad digital**, rendimiento y escalabilidad.

## 🚀 Estado del Proyecto
- **Frontend:** Desplegado en [Vercel](https://cde-oweb.vercel.app)
- **Backend:** API REST en [Render](https://render.com)
- **Base de Datos:** PostgreSQL en [Supabase](https://supabase.com)

---

## 📅 Bitácora de Desarrollo (Log Semanal)

### 🗓️ Semana 1: Cimientos e Infraestructura (20/04 - 05/05)
**Objetivo:** Lograr el flujo "End-to-End" (Front → Back → DB).

*   **Infraestructura:**
    *   Configuración de entornos de producción y variables de entorno (`.env`).
    *   Aprovisionamiento de base de datos relacional en **Supabase**.
*   **Diseño e Identidad (UX/UI):**
    *   Definición de **Style Guide** (Paleta cromática, tipografía y assets).
    *   Desarrollo de **Navbar** estético con navegación semántica.
    *   Implementación de video-backgrounds y prototipado de branding en Canva.
*   **Backend & Data:**
    *   Modelado de datos con **Prisma ORM**.
    *   Implementación de Adaptador de Prisma para **PostgreSQL**.
    *   **Hito Técnico:** Persistencia de datos exitosa (Ciclo completo de publicación).

---

### 🗓️ Semana 2: Backend Base y Estabilización (07/05 - En curso)
**Objetivo:** API robusta, arquitectura limpia y datos de prueba.

*   **Configuración de Servidor:**
    *   [x] Implementación de Middlewares: `CORS` y `JSON Parser`.
    *   [ ] Integración de `Morgan` para logging de peticiones.
    *   [ ] Modularización de rutas (Separación de archivos por entidad).
*   **Datos & Testing:**
    *   [ ] Script de **Seed** para poblar la cartelera con anuncios reales de la zona.
    *   [ ] Validaciones de esquemas de datos para robustez del backend.
*   **UX/UI:**
    *   [x] Ajustes de **Responsive Design** (Gestión de espacios en blanco y márgenes).
    *   [x] Auditoría de accesibilidad en componentes de navegación.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Frontend** | React, TypeScript, Bootstrap |
| **Backend** | Node.js, Express |
| **ORM** | Prisma |
| **Base de Datos** | PostgreSQL (Supabase) |
| **Despliegue** | Vercel (Front) / Render (Back) |

---

## ♿ Compromiso de Accesibilidad
Este proyecto se desarrolla bajo las pautas de la **WCAG**, priorizando:
*   Contraste de color verificado.
*   Navegación fluida por teclado.
*   Etiquetado semántico para lectores de pantalla.

---

## 📝 Notas de la Autora
> "Este proyecto nace de la necesidad de conectar a los vecinos de la Costa de Oro de forma eficiente y humana, centralizando la información local sin el ruido de las redes sociales convencionales."