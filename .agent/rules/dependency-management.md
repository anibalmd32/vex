---
trigger: always_on
---

# Dependency Management

- **Manejador de paquetes:** Utilizar estrictamente `bun`. Queda prohibido el uso de `npm`, `yarn` o `pnpm`.
- **Instalación:** Todas las dependencias deben instalarse con el flag `-E` para asegurar versiones exactas.
  - Comando: `bun add -E <package>`
- **Ejecución de binarios:** Utilizar siempre `bunx` en lugar de `npx` para ejecutar comandos específicos.
