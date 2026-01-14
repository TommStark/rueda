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

**Stack:** React Native + Expo + TypeScript • React Navigation • React Native Paper • TanStack Query • Expo Linear Gradient • React Native SVG • Axios

---

## Arquitectura

El proyecto utiliza **Feature-Based Architecture**, organizando cada funcionalidad en módulos independientes (`src/features/`) con sus propios componentes, hooks, estilos y tipos. Los elementos compartidos están centralizados para facilitar el mantenimiento y escalabilidad.

```
src/
├── features/           # Módulos por funcionalidad
│   ├── home/          # Dashboard principal
│   ├── market/        # Listado de instrumentos
│   ├── portfolio/     # Gestión de posiciones
│   ├── favorites/     # Activos favoritos
│   └── history/       # Historial de órdenes
├── shared/            # Elementos compartidos
│   ├── components/    # Componentes reutilizables
│   ├── hooks/         # Custom hooks
│   ├── theme/         # Colores y estilos
│   └── utils/         # Utilidades
└── navigation/        # Configuración de navegación
```

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
npm install

# 3) Configurar variables de entorno
cp .env.example .env
# Editar .env con las configuraciones necesarias

# 4) Iniciar el proyecto
npx expo start

# 5) Ejecutar en dispositivo
# Escanear QR con Expo Go (desarrollo)
# O usar simulador/emulador
```

---

## Scripts Disponibles

```bash
npm start          # Iniciar Expo Dev Server
npm run android    # Ejecutar en Android
npm run ios        # Ejecutar en iOS
npm run web        # Ejecutar en navegador
npm run lint       # Ejecutar ESLint
npm run type-check # Verificar tipos TypeScript
```

---

## Configuración API

La aplicación se conecta a una API REST para obtener datos de mercado. Configurar las siguientes variables en `.env`:

```
API_BASE_URL=https://your-api-endpoint.com
```

---
