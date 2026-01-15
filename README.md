# RUEDA

**Plataforma de trading moderna para el mercado argentino**

---

## Aplicación React Native + Expo

- **Dashboard financiero** con balance total y gráficos
- **Market** con búsqueda y filtros por tipo de activo
- **Portfolio** con posiciones y rendimiento detallado
- **Favoritos** para seguimiento de activos preferidos
- **Historial** completo de órdenes y transacciones
- **Trading** con órdenes de mercado y límite

**Stack:** React Native + Expo + TypeScript • Expo Router • React Native Paper • TanStack Query • i18next • AsyncStorage • Axios

---

## Arquitectura

El proyecto utiliza **Feature-Based Architecture**, organizando cada funcionalidad en módulos independientes (`src/features/`) con sus propios componentes, hooks, estilos y tipos. Los elementos compartidos están centralizados para facilitar el mantenimiento y escalabilidad.

```
app/                 # Rutas (Expo Router)
├── _layout.tsx       # Providers + Stack
└── (tabs)/           # Tabs principales
    ├── _layout.tsx
    ├── index.tsx
    ├── market.tsx
    ├── favorites.tsx
    ├── portfolio.tsx
    └── history.tsx

src/
├── features/           # Módulos por funcionalidad
│   ├── home/          # Dashboard principal
│   ├── market/        # Listado de instrumentos
│   ├── portfolio/     # Gestión de posiciones
│   ├── favorites/     # Activos favoritos
│   └── orders/        # Historial + recibo de órdenes
├── shared/            # Elementos compartidos
│   ├── components/    # Componentes reutilizables
│   ├── hooks/         # Custom hooks
│   ├── theme/         # Colores y estilos
│   └── utils/         # Utilidades
```

### Routing

La navegación está implementada con **Expo Router** (file-based routing). Los params de navegación se pasan como IDs (`assetId`, `orderId`) para mantener URLs/deeplinks simples.

### i18n

La UI está internacionalizada con **i18next** (namespace por feature: `home`, `market`, `portfolio`, `favorites`, `history` + `common`).

### Persistencia

Favoritos e historial de órdenes se persisten con **AsyncStorage**. Si hay errores de lectura/escritura, se notifica con toast y se intenta recuperar estado (por ejemplo, limpiando storage corrupto).

---

## Requisitos

- **Node.js** 20.0.0 o superior
- **iOS:** iOS 13.0+ / Xcode 14+
- **Android:** API 21+ / Android Studio

---

## Instalación

```bash
# 1) Clonar el repositorio
git clone https://github.com/TommStark/rueda.git
cd rueda

# 2) Instalar dependencias
yarn

# 3) Configurar variables de entorno
cp .env.example .env
# Editar .env con las configuraciones necesarias

# 4) Iniciar el proyecto
yarn start

# 5) Ejecutar en dispositivo
# Escanear QR con Expo Go (desarrollo)
# O usar simulador/emulador
```

---

## Scripts Disponibles

```bash
yarn start         # Iniciar Expo Dev Server
yarn ios           # Ejecutar en iOS
yarn android       # Ejecutar en Android
yarn web           # Ejecutar en navegador

yarn lint:check    # ESLint (sin fix)
yarn lint          # ESLint (con fix)
yarn format:check  # Prettier (check)
yarn format        # Prettier (write)
yarn typecheck     # TypeScript (tsc --noEmit)
yarn test          # Jest

yarn quality       # lint:check + format:check + typecheck + test
yarn quality:fix   # lint + format + typecheck + test
```

---

## Configuración API

La aplicación se conecta a una API REST para obtener datos de mercado. Configurar las siguientes variables en `.env`:

```
API_BASE_URL=https://your-api-endpoint.com
```

---
