import '@testing-library/jest-dom'
import { afterAll, beforeAll, vi } from 'vitest'

// Mock de módulos de Tauri para evitar errores en tests
vi.mock('@tauri-apps/api', () => ({
  invoke: vi.fn(),
}))

vi.mock('@tauri-apps/plugin-opener', () => ({
  open: vi.fn(),
}))

// Suprimir warnings de React 19 en tests (opcional)
const originalError = console.error
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
