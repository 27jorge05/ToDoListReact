# Especificación del proyecto ToDoList React

## Objetivo

Construir con React y Vite una aplicación web para gestionar tareas del usuario autenticado mediante una API REST de Laravel reutilizada de un proyecto anterior.

## Alcance funcional

- Registro, inicio y cierre de sesión.
- Tareas propias: crear, listar, ver, editar y eliminar.
- Cada tarea tiene título, descripción, categoría, una o varias etiquetas y estado de realización.
- Categorías globales: CRUD completo.
- Etiquetas globales: CRUD completo.
- Paginación para tareas, categorías y etiquetas.
- Protección de rutas y limpieza de credenciales inválidas o vencidas.

## Restricciones y decisiones pendientes

- El frontend se crea con Vite.
- Laravel es exclusivamente el proveedor de datos.
- Antes del cliente HTTP debe confirmarse si la API usa token Bearer de Sanctum, Sanctum SPA con cookies o JWT. El enunciado menciona token en `localStorage`, pero la implementación real del backend manda.
- Antes de construir tablas y formularios debe documentarse el contrato JSON real, incluidos errores `422` y metadatos de paginación.
- No se incluyen cambios al backend en este repositorio.

La fuente original entregada para esta planificación se conserva fuera del repositorio como adjunto de la conversación; este documento es su versión normalizada y versionable.
