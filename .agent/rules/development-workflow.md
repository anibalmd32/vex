---
trigger: always_on
---

# Development Workflow

- **Componentes de UI:** Cada creación de un componente de interfaz debe incluir obligatoriamente su respectivo archivo de prueba (test). La suite de tests ya se encuentra activa y configurada.
- **Calidad de Código:** Al finalizar cualquier tarea o ejecución, es obligatorio ejecutar:
  - Comando: `bun run check`
  - Propósito: Validar linting y formateo mediante las reglas de Biome establecidas.
