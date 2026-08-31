# Flujo de contribución

## Un ticket, una rama, un pull request

1. Mueve el ticket a `In progress`.
2. Actualiza `main` con el remoto.
3. Crea una rama con el número y una descripción corta del ticket.
4. Implementa solo el alcance del ticket.
5. Crea commits pequeños con Conventional Commits.
6. Ejecuta las comprobaciones relevantes.
7. Publica la rama y abre el PR con la plantilla.
8. Integra solo con revisión aprobada y CI exitoso; luego mueve el ticket a `Done`.

## Comandos base

```bash
git switch main
git pull --ff-only origin main
git switch -c feat/NN-descripcion-corta

git status --short
git add <archivos-del-ticket>
git commit -m "feat(scope): descripcion imperativa"

git push -u origin feat/NN-descripcion-corta
```

No uses `git add .` sin revisar el estado. No mezcles formateos globales, dependencias o correcciones ajenas al ticket.

## Tipos de commit

- `feat`: comportamiento nuevo para el usuario.
- `fix`: corrección de un defecto.
- `test`: pruebas.
- `docs`: documentación.
- `refactor`: cambio interno sin alterar comportamiento.
- `chore`: configuración o mantenimiento.

Ejemplos:

```text
feat(categories): render category list
fix(auth): clear expired credentials
test(tasks): cover task creation errors
docs(workflow): define pull request process
```

## Definición de terminado

- Criterios de aceptación cumplidos.
- Sin cambios ajenos al ticket.
- Lint, pruebas y build aplicables en verde.
- Estados de carga, vacío y error considerados cuando hay datos remotos.
- Sin secretos, tokens ni logs temporales (salvo el `console.log` exigido en T06).
- README o `.env.example` actualizados si cambia el uso o configuración.
- PR enlazado al ticket, con pasos de prueba y evidencia visual cuando cambia la UI.
