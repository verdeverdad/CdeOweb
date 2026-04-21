# 🛶 Costa de Oro - Sistema de Gestión (CdeO)

Este proyecto es una plataforma Full Stack diseñada para la gestión de servicios en la zona de la Costa de Oro (comenzando con **Actividades culturales** y **intereses de la zona**). Construido con un enfoque en **accesibilidad digital**, rendimiento y escalabilidad.

## 🚀 Tecnologías Utilizadas

### Frontend
* **React 18** con **Vite** para un desarrollo ultra rápido.
* **TypeScript** para asegurar la integridad de los datos.
* **CSS Bootstrap** (ajustar según tu elección) para un diseño responsivo.

### Backend
* **Node.js & Express** para el servidor API REST.
* **Prisma 7** como ORM de última generación.
* **PostgreSQL** hospedado en **Supabase** para una persistencia de datos robusta.
* **TypeScript** en el servidor para un entorno Full-Stack Type-Safe.

## 🏗️ Arquitectura del Proyecto

El repositorio está organizado como un monorepo simple:
* `/client`: Aplicación frontend en React.
* # 🛶 Costa de Oro - Sistema de Gestión (CdeO)

Este proyecto es una plataforma Full Stack diseñada para la gestión de servicios en la zona de la Costa de Oro. Construido con un enfoque en **accesibilidad digital**, rendimiento y escalabilidad. Puedes ver el caso de estudio de UX en el siguiente link https://www.sdstudio.click/costadeoro.html

## 🚀 Tecnologías Utilizadas

### Frontend
* **React 18** con **Vite** para un desarrollo ultra rápido.
* **TypeScript** para asegurar la integridad de los datos.
* **CSS Modules / Tailwind** (ajustar según tu elección) para un diseño responsivo.

### Backend
* **Node.js & Express** para el servidor API REST.
* **Prisma 7** como ORM de última generación.
* **PostgreSQL** hospedado en **Supabase** para una persistencia de datos robusta.
* **TypeScript** en el servidor para un entorno Full-Stack Type-Safe.

## 🏗️ Arquitectura del Proyecto

El repositorio está organizado como un monorepo simple:
* `/client`: Aplicación frontend en React.
* `/server`: Servidor de API, lógica de negocio y base de datos.







```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
