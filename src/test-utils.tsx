import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement } from "react";

/**
 * Crea un router de prueba que envuelve el componente a testear
 * dentro del root del árbol de rutas.
 */
export function createTestRouter(testComponent: ReactElement) {
  const rootRoute = createRootRoute({
    component: () => (
      <div data-testid="test-wrapper">
        {testComponent}
        <Outlet />
      </div>
    ),
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <div>Home</div>,
  });

  const routeTree = rootRoute.addChildren([
    indexRoute,
  ]);

  return createRouter({
    routeTree,
    defaultPreload: "intent",
  });
}

/**
 * Renderiza un componente envuelto en el RouterProvider de TanStack.
 * Útil para testear componentes que dependen del contexto del router.
 *
 * @example
 * ```tsx
 * import { renderWithRouter } from '@/test-utils'
 *
 * test('renders link', async () => {
 *   const { getByText } = await renderWithRouter(<AppLink to="/">Home</AppLink>)
 *   expect(getByText('Home')).toBeInTheDocument()
 * })
 * ```
 */
export function renderWithRouter(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  const router = createTestRouter(ui);

  return {
    ...render(<RouterProvider router={router} />, options),
    router,
  };
}

// Re-exportar todo de testing-library para uso conveniente
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
