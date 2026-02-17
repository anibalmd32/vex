---
description: Creación de componentes compuestos con Material UI solo si no existe uno ya nativo de MUI que sirva, siguiendo estándares de Bun, Biome y Testing Library.
---

# Steps

1. **Definición de Arquitectura**
   - El Agent debe solicitar el nombre del componente.
   - Identificar si se requieren componentes de `@mui/material` o `@mui/icons-material`.

2. **Desarrollo del Componente**
   - Generar el código del componente utilizando exclusivamente **MUI** para la interfaz.
   - El componente debe ser atomico y lo mas reutilizable posible
   - Los componentes compuestos deben ir en el dictorio ./src/components/[ComponentName]/[ComponentName].tsx
   - Los componentes debe ser atomicos, cada atomo del mismo ira dentro de su carpeta.
   - **Obligatorio:** Incluir bloque de `JSDoc` con descripción, `@param` y `@returns`.
   - **Restricción de comentarios:** Prohibido explicar el código con comentarios simples. Solo usar convenciones de *Better Comments*:
     - `// TODO:` para pendientes.
     - `// !` para alertas.
     - `// ?` para dudas.
     - `// *` para énfasis.

3. **Gestión de Dependencias**
   - Si el componente requiere una nueva librería de MUI o externa, ejecutar:
     `bun add -E <nombre-del-paquete>`
   - Para cualquier ejecución de scripts, usar `bunx`.

4. **Creación de Tests**
   - Generar el archivo de test correspondiente (ej. `./src/components/[ComponentName]/[ComponentName].test.tsx`).
   - El test debe validar el renderizado de los componentes de MUI y sus eventos principales (click, change, etc.) usando la suite instalada.

5. **Validación de Calidad**
   - Como paso final obligatorio, ejecutar en la terminal del workspace:
     `bun run check`
   - Si Biome reporta errores, el Agent debe corregirlos automáticamente hasta que el comando sea exitoso.

6. **Confirmación**
   - Informar al usuario que el componente, el test y la validación de Biome se han completado correctamente.
