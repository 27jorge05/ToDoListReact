# Fichas de estudio — ToDoList React

Archivo local para generar flashcards, preguntas abiertas y cuestionarios de opción múltiple.

<!-- FLASHCARD:START -->

## CARD-T01-001

**Ticket:** T01  
**Tema:** npm

### Pregunta abierta

**Pregunta:** ¿Qué es npm?  
**Respuesta técnica:** Es el administrador de paquetes y ejecutor de scripts del ecosistema Node.js.  
**Respuesta sencilla:** Instala, organiza y ejecuta las herramientas que necesita el proyecto.

### Opción múltiple

**Pregunta:** ¿Cuál es una responsabilidad de npm?

- A. Renderizar componentes.
- B. Administrar dependencias y scripts.
- C. Persistir tareas en Laravel.
- D. Reemplazar el navegador.

**Respuesta correcta:** B  
**Explicación:** npm administra paquetes y ejecuta scripts definidos en `package.json`.  
**Ejemplo:** `npm install` instala las dependencias.  
**Etiquetas:** npm, nodejs, dependencias

<!-- FLASHCARD:END -->

<!-- FLASHCARD:START -->

## CARD-T01-002

**Ticket:** T01  
**Tema:** Vite

### Pregunta abierta

**Pregunta:** ¿Qué es Vite?  
**Respuesta técnica:** Es una herramienta frontend que crea la estructura, sirve el proyecto durante el desarrollo y genera el build.  
**Respuesta sencilla:** Es el taller donde desarrollamos y preparamos la aplicación React.

### Opción múltiple

**Pregunta:** ¿Qué comando inicia el servidor de desarrollo de Vite?

- A. `npm run dev`
- B. `git pull`
- C. `npm run build`
- D. `git log`

**Respuesta correcta:** A  
**Explicación:** El script `dev` inicia el servidor local; `build` prepara producción.  
**Ejemplo:** Vite suele servir la aplicación en `http://localhost:5173`.  
**Etiquetas:** vite, frontend, desarrollo

<!-- FLASHCARD:END -->

<!-- FLASHCARD:START -->

## CARD-T02-001

**Ticket:** T02  
**Tema:** Componente React y JSX

### Pregunta abierta

**Pregunta:** ¿Qué devuelve un componente funcional de React?  
**Respuesta técnica:** Devuelve una descripción de interfaz expresada normalmente con JSX.  
**Respuesta sencilla:** Devuelve lo que React debe dibujar en esa parte de la pantalla.

### Opción múltiple

**Pregunta:** ¿Cuál expresión es JSX?

- A. `SELECT * FROM tasks`
- B. `<h1>Hola mundo</h1>`
- C. `npm install`
- D. `git switch main`

**Respuesta correcta:** B  
**Explicación:** JSX permite describir elementos de interfaz dentro de JavaScript.  
**Ejemplo:** `return <h1>Hola mundo</h1>`.  
**Etiquetas:** react, componente, jsx

<!-- FLASHCARD:END -->

<!-- FLASHCARD:START -->

## CARD-T03-001

**Ticket:** T03  
**Tema:** Services

### Pregunta abierta

**Pregunta:** ¿Cuál es la responsabilidad de `src/services`?  
**Respuesta técnica:** Centraliza funciones que se comunican con servicios externos, como la API REST.  
**Respuesta sencilla:** Es el lugar donde guardamos el código que habla con Laravel.

### Opción múltiple

**Pregunta:** ¿Qué responsabilidad tendrá un service?

- A. Dibujar toda la interfaz.
- B. Comunicarse con la API.
- C. Crear directamente tablas MySQL.
- D. Reemplazar React.

**Respuesta correcta:** B  
**Explicación:** Los componentes manejan interfaz y los services encapsulan HTTP.  
**Ejemplo:** `taskService.getAll()` solicitará tareas a Laravel.  
**Etiquetas:** services, api, arquitectura

<!-- FLASHCARD:END -->

<!-- FLASHCARD:START -->

## CARD-T03-002

**Ticket:** T03  
**Tema:** Git y carpetas vacías

### Pregunta abierta

**Pregunta:** ¿Por qué se utiliza `.gitkeep`?  
**Respuesta técnica:** Git registra archivos, no directorios vacíos; el marcador permite conservar la ruta.  
**Respuesta sencilla:** La carpeta necesita contener algo para que Git pueda guardarla.

### Opción múltiple

**Pregunta:** ¿`.gitkeep` es una función especial de Git?

- A. Sí.
- B. No, es una convención.
- C. Solo dentro de `src`.
- D. Solo en GitHub.

**Respuesta correcta:** B  
**Explicación:** Cualquier archivo serviría; `.gitkeep` comunica la intención.  
**Ejemplo:** Se elimina cuando la carpeta recibe un archivo real.  
**Etiquetas:** git, gitkeep, directorios

<!-- FLASHCARD:END -->
