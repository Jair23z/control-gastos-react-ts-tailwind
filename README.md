# Control de Gastos (React + TypeScript)

Aplicación para controlar y planificar gastos personales desarrollada con React, TypeScript, Context API y useReducer. Incluye modo oscuro, filtros por fecha y categoría, gráficos y persistencia en localStorage.

## Características principales

- Definición de presupuesto y seguimiento del gasto.
- Añadir, editar y eliminar gastos.
- Filtros por categoría y por rango/últimos 7 días/inicio de mes.
- Gráficas (pie y progreso) para visualizar distribución y porcentaje gastado.
- Modo oscuro y soporte responsive.
- Persistencia local (localStorage).

## Tecnologías

- React
- TypeScript
- Context API + useReducer
- Tailwind CSS
- Recharts (gráficas)
- react-date-picker, react-swipeable-list, react-circular-progressbar

## Instalar y ejecutar (local)

Requisitos: Node.js (>=16/18 recomendado) y npm o yarn.

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tuusuario/nombre-repo.git
   cd nombre-repo
   ```

2. Instala dependencias:

   ```bash
   npm install
   # o
   yarn
   ```

3. Ejecuta en modo desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Build de producción:

   ```bash
   npm run build
   npm run preview
   ```