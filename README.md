# API REST — Libros

API REST desarrollada con Node.js, Express y MySQL para gestionar libros y clientes. Implementa buenas prácticas de seguridad como rate limiting, CORS controlado y cabeceras HTTP con Helmet.

Desarrollada para la materia **Diseño y Programación de Software Multiplataforma** — Universidad Don Bosco.

## Tecnologías

- Node.js / Express 5
- MySQL2
- Helmet, CORS, Morgan
- express-rate-limit
- dotenv
- nodemon (desarrollo)

## Estructura del proyecto

```
LibrosAPI/
├── scripts/
│   └── db-init.js          # Inicialización y seed de la base de datos
├── src/
│   ├── config/
│   │   ├── database.config.js  # Configuración de conexión
│   │   └── database.js         # Pool de conexiones MySQL
│   ├── controllers/
│   │   ├── libros.controller.js
│   │   └── clientes.controller.js
│   ├── helpers/
│   │   └── response.js         # Helper de respuestas JSON
│   ├── models/
│   │   ├── libro.model.js
│   │   └── cliente.model.js
│   ├── public/
│   │   └── index.html
│   ├── routes/
│   │   ├── index.js
│   │   ├── libros.routes.js
│   │   └── clientes.routes.js
│   └── index.js
├── .env.example
└── package.json
```

## Configuración

1. **Clonar el repositorio e instalar dependencias:**

```bash
git clone https://github.com/emersonUDB/LibrosAPI2026.git
cd LibrosAPI2026
npm install
```

2. **Crear el archivo `.env`** copiando el ejemplo:

```bash
# Linux / Mac
cp .env.example .env

# Windows
copy .env.example .env
```

Editar `.env` con los datos de tu base de datos:

```env
DB_HOST='localhost'
DB_USER='root'
DB_PASSWORD=''
DB_NAME='libros'
DB_PORT=3306
PORT=3000
```

3. **Inicializar la base de datos:**

```bash
npm run db:init
```

Esto crea la base de datos `libros`, las tablas y las pobla con datos de ejemplo.

## Uso

**Modo desarrollo** (con hot-reload):

```bash
npm run dev
```

**Modo producción:**

```bash
npm start
```

La API queda disponible en `http://localhost:3000`. La página de inicio muestra todos los endpoints disponibles.

## Endpoints

Todos los endpoints tienen el prefijo `/api/v1`.

### Libros

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/libros` | Obtener todos los libros |
| GET | `/api/v1/libros/:isbn` | Obtener un libro por ISBN |
| POST | `/api/v1/libros` | Crear un nuevo libro |
| PUT | `/api/v1/libros/:isbn` | Actualizar un libro por ISBN |
| DELETE | `/api/v1/libros/:isbn` | Eliminar un libro por ISBN |

### Clientes

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/clientes` | Obtener todos los clientes |
| GET | `/api/v1/clientes/:id` | Obtener un cliente por ID |
| POST | `/api/v1/clientes` | Crear un nuevo cliente |
| PUT | `/api/v1/clientes/:id` | Actualizar un cliente por ID |
| DELETE | `/api/v1/clientes/:id` | Eliminar un cliente por ID |

### Formato de respuesta

Todas las respuestas siguen el mismo formato:

```json
// Éxito
{ "success": true, "message": "...", "data": { } }

// Error
{ "success": false, "error": { "code": "...", "message": "..." } }
```

## Licencia

[MIT](LICENSE)
