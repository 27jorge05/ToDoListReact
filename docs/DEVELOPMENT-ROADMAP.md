# Roadmap de desarrollo por tickets

## Reglas del tablero

Estados sugeridos: `Backlog` → `Ready` → `In progress` → `In review` → `Done`.

Cada ticket produce una rama y un PR. Las subtareas son commits lógicos cuando tiene sentido, no ramas adicionales. Un ticket solo pasa a `Ready` si sus dependencias están integradas en `main` y se conoce el contrato de API que utiliza.

## Fase 0 — Preparación

### T00 — Preparar flujo de colaboración

- Rama: `chore/project-planning`
- Entregables: instrucciones de IA, especificación, roadmap, guía Git y plantilla de PR.
- Aceptación: el siguiente ticket puede comenzar desde `main` sin decisiones de proceso pendientes.

## Fase 1 — Base del frontend

### T01 — Crear proyecto React con Vite

- Rama: `feat/01-vite-scaffold`
- Dependencias: T00.
- Subtareas: crear el proyecto en la raíz sin reemplazar la documentación; revisar scripts y `.gitignore`; instalar dependencias; documentar requisitos y arranque.
- Aceptación: `npm run dev` inicia la app, `npm run build` finaliza y el README permite reproducirlo.

### T02 — Implementar Hola Mundo

- Rama: `feat/02-hello-world`
- Dependencias: T01.
- Subtareas: simplificar el componente inicial; retirar assets demo no usados; comprobar renderizado.
- Aceptación: la página muestra “Hola mundo” sin errores de consola y el build pasa.

### T03 — Crear capa de servicios

- Rama: `chore/03-services-structure`
- Dependencias: T02.
- Subtareas: crear `src/services`; documentar su responsabilidad; definir configuración de URL base con `.env.example`.
- Aceptación: ningún componente necesita conocer la URL base y no se versionan secretos.

### T04 — Crear servicio de tareas

- Rama: `feat/04-task-service-contract`
- Dependencias: T03.
- Subtareas: confirmar endpoints de Laravel; crear `task.service.js`; declarar operaciones `getAll`, `getOne`, `create`, `update` y `remove` sin usar `delete` como identificador.
- Aceptación: la interfaz del servicio refleja el contrato real de la API y separa HTTP de UI.

### T05 — Implementar `taskService.getAll`

- Rama: `feat/05-fetch-tasks`
- Dependencias: T04.
- Subtareas: ejecutar `fetch`; enviar headers requeridos; interpretar JSON; diferenciar respuestas exitosas y errores HTTP.
- Aceptación: devuelve datos normalizados o lanza un error consistente verificable.

### T06 — Consumir tareas desde `App`

- Rama: `feat/06-load-tasks-in-app`
- Dependencias: T05.
- Subtareas: invocar el servicio al montar; evitar actualizaciones tras desmontaje; mostrar temporalmente la respuesta en consola; documentar la comprobación.
- Aceptación: existe una sola carga esperada por montaje y los errores no quedan como promesas rechazadas.

## Fase 2 — Categorías

### T07 — Listar categorías

- Rama: `feat/07-category-list`
- Dependencias: T03 y contrato de categorías confirmado.
- Subtareas: servicio `getAll`; ruta/vista; tabla accesible; estados de carga, vacío y error.
- Aceptación: renderiza los datos reales y cada estado es distinguible.

### T08 — Crear categoría

- Rama: `feat/08-create-category`
- Dependencias: T07.
- Subtareas: servicio `create`; formulario controlado; validar nombre requerido; mostrar errores `422`; actualizar o volver al listado.
- Aceptación: no envía nombres vacíos y confirma el resultado real de la API.

### T09 — Actualizar categoría

- Rama: `feat/09-update-category`
- Dependencias: T08.
- Subtareas: cargar dato actual; reutilizar formulario; servicio `update`; manejar `404` y `422`.
- Aceptación: precarga, guarda y refleja el valor persistido.

### T10 — Eliminar categoría

- Rama: `feat/10-delete-category`
- Dependencias: T07.
- Subtareas: modal accesible; cancelar sin efectos; servicio `remove`; impedir doble envío; refrescar listado.
- Aceptación: solo elimina tras confirmación y comunica conflictos de integridad.

### T11 — Mostrar categoría

- Rama: `feat/11-category-detail`
- Dependencias: T07.
- Subtareas: servicio `getOne`; ruta con identificador; estados de carga y `404`; navegación de regreso.
- Aceptación: una URL directa muestra el recurso correcto o un estado no encontrado.

## Fase 3 — Etiquetas

### T12 — CRUD de etiquetas

El enunciado agrupa demasiado alcance. En Jira debe crearse como épica y ejecutarse mediante cinco tickets/PR independientes:

| Ticket | Rama | Alcance | Dependencia |
| --- | --- | --- | --- |
| T12.1 | `feat/12-1-tag-list` | Servicio, tabla y estados de lista | T03 |
| T12.2 | `feat/12-2-create-tag` | Formulario, validación y creación | T12.1 |
| T12.3 | `feat/12-3-tag-detail` | Consulta individual y vista | T12.1 |
| T12.4 | `feat/12-4-update-tag` | Precarga, validación y edición | T12.2 |
| T12.5 | `feat/12-5-delete-tag` | Confirmación y eliminación | T12.1 |

Todos deben manejar carga, error y `404`/`422` cuando corresponda. El cierre de la épica exige CRUD completo contra la API real.

## Fase 4 — Tareas

### T13 — Crear tarea con categoría y etiquetas

- Rama: `feat/13-create-task`.
- Dependencias: T06, T07, T12.1.
- Subtareas: listado real de tareas; botón de alta; cargar opciones; formulario y multiselección; validación; servicio `create`; errores `422`.
- Aceptación: persiste título, descripción, categoría, etiquetas y estado con el formato exigido por Laravel.

### T14 — Editar tarea

- Rama: `feat/14-update-task`.
- Dependencias: T13.
- Subtareas: botón desde lista; cargar tarea y catálogos; precargar asociaciones; actualizar; manejar recurso obsoleto o inexistente.
- Aceptación: todos los campos reflejan y guardan los datos existentes.

### T15 — Mostrar detalle de tarea

- Rama: `feat/15-task-detail`.
- Dependencias: T13.
- Subtareas: botón y ruta; `getOne`; presentar categoría, etiquetas y estado; carga/error/`404`.
- Aceptación: acceso desde lista y URL directa muestran la tarea correcta.

### T16 — Eliminar tarea

- Rama: `feat/16-delete-task`.
- Dependencias: T13.
- Subtareas: botón; modal accesible; `remove`; bloquear doble envío; actualizar lista.
- Aceptación: cancelar conserva la tarea y confirmar elimina solo la seleccionada.

## Fase 5 — Autenticación y robustez

### T17 — Login

- Rama: `feat/17-login`.
- Dependencias: T03 y estrategia de autenticación confirmada.
- Subtareas: servicio de autenticación; formulario; validación; estado de envío; persistencia según contrato; logout básico.
- Aceptación: credenciales válidas inician sesión, inválidas muestran error y no quedan secretos en logs.

### T18 — Cliente Fetch autenticado

- Rama: `feat/18-authenticated-fetch`.
- Dependencias: T17.
- Subtareas: crear wrapper de `fetch`; URL base y headers comunes; adjuntar credenciales; normalizar JSON/errores; migrar servicios.
- Aceptación: los servicios no duplican autenticación y una petición protegida llega autorizada. Si se usa Sanctum con cookies, no se inventa un header Bearer.

### T19 — Paginación reutilizable

- Rama: `feat/19-pagination`.
- Dependencias: T07, T12.1 y T13; contrato de paginación confirmado.
- Subtareas: normalizar metadatos; componente reutilizable; sincronizar página con URL; integrar tres listados; manejar páginas vacías.
- Aceptación: tareas, categorías y etiquetas navegan sin perder estado ni solicitar páginas inválidas.

### T20 — Rutas protegidas y sesión expirada

- Rama: `feat/20-auth-guard`.
- Dependencias: T18.
- Subtareas: estado central de autenticación; guard de rutas; tratar `401`; limpiar credenciales aplicables; redirigir a login; logout completo.
- Aceptación: sin sesión no se ven rutas privadas y una expiración produce una sola limpieza/redirección sin bucles.

## Riesgos que deben resolverse temprano

1. La estrategia real de Sanctum/JWT cambia T17, T18 y T20.
2. La forma de las respuestas Laravel cambia servicios, tablas y paginación.
3. T06 pide `console.log` como validación pedagógica; debe retirarse cuando aparezca la lista real.
4. T12 no debe convertirse en un PR gigante: es una épica de cinco entregas.
