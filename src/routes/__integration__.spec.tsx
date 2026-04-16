import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Dock from "../components/AppNavigation/Dock";

/**
 * Helper: render the full app with a memory-history router starting at the given path.
 * Each call creates a completely isolated router instance so tests don't interfere.
 */
function renderApp(initialEntry = "/") {
  const rootRoute = createRootRoute({
    component: () => (
      <div>
        <Outlet />
        <Dock />
      </div>
    ),
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <div>Home</div>,
  });

  const incomeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/income",
    component: () => <div>Hello "/income"!</div>,
  });

  const expensesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/expenses",
    component: () => <div>Hello "/expenses"!</div>,
  });

  const debtsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/debts",
    component: () => <div>Hello "/debts"!</div>,
  });

  const routeTree = rootRoute.addChildren([
    indexRoute,
    incomeRoute,
    expensesRoute,
    debtsRoute,
  ]);

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [
        initialEntry,
      ],
    }),
  });

  return render(<RouterProvider router={router} />);
}

describe("Route Integration Tests", () => {
  describe("Route Rendering", () => {
    it("should render the home page at /", async () => {
      renderApp("/");

      await waitFor(() => {
        expect(screen.getByText("Home")).toBeInTheDocument();
      });
    });

    it("should render the income page at /income", async () => {
      renderApp("/income");

      await waitFor(() => {
        expect(screen.getByText('Hello "/income"!')).toBeInTheDocument();
      });
    });

    it("should render the expenses page at /expenses", async () => {
      renderApp("/expenses");

      await waitFor(() => {
        expect(screen.getByText('Hello "/expenses"!')).toBeInTheDocument();
      });
    });

    it("should render the debts page at /debts", async () => {
      renderApp("/debts");

      await waitFor(() => {
        expect(screen.getByText('Hello "/debts"!')).toBeInTheDocument();
      });
    });
  });

  describe("Dock Navigation", () => {
    it("should render the Dock navigation on every route", async () => {
      renderApp("/");

      await waitFor(() => {
        expect(screen.getByText("Inicio")).toBeInTheDocument();
        expect(screen.getByText("Ingresos")).toBeInTheDocument();
        expect(screen.getByText("Gastos")).toBeInTheDocument();
        expect(screen.getByText("Deudas")).toBeInTheDocument();
      });
    });

    it("should navigate from home to income when clicking Ingresos", async () => {
      const user = userEvent.setup();
      renderApp("/");

      await waitFor(() => {
        expect(screen.getByText("Home")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Ingresos"));

      await waitFor(() => {
        expect(screen.getByText('Hello "/income"!')).toBeInTheDocument();
      });
    });

    it("should navigate from home to expenses when clicking Gastos", async () => {
      const user = userEvent.setup();
      renderApp("/");

      await waitFor(() => {
        expect(screen.getByText("Home")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Gastos"));

      await waitFor(() => {
        expect(screen.getByText('Hello "/expenses"!')).toBeInTheDocument();
      });
    });

    it("should navigate from home to debts when clicking Deudas", async () => {
      const user = userEvent.setup();
      renderApp("/");

      await waitFor(() => {
        expect(screen.getByText("Home")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Deudas"));

      await waitFor(() => {
        expect(screen.getByText('Hello "/debts"!')).toBeInTheDocument();
      });
    });

    it("should navigate between routes: income → expenses → debts", async () => {
      const user = userEvent.setup();
      renderApp("/");

      // Wait for initial render
      await waitFor(() => {
        expect(screen.getByText("Home")).toBeInTheDocument();
      });

      // Navigate to income
      await user.click(screen.getByText("Ingresos"));
      await waitFor(() => {
        expect(screen.getByText('Hello "/income"!')).toBeInTheDocument();
      });

      // Navigate to expenses
      await user.click(screen.getByText("Gastos"));
      await waitFor(() => {
        expect(screen.getByText('Hello "/expenses"!')).toBeInTheDocument();
      });

      // Navigate to debts
      await user.click(screen.getByText("Deudas"));
      await waitFor(() => {
        expect(screen.getByText('Hello "/debts"!')).toBeInTheDocument();
      });
    });

    it("should navigate back to home from a sub-route", async () => {
      const user = userEvent.setup();
      renderApp("/income");

      await waitFor(() => {
        expect(screen.getByText('Hello "/income"!')).toBeInTheDocument();
      });

      await user.click(screen.getByText("Inicio"));

      await waitFor(() => {
        expect(screen.getByText("Home")).toBeInTheDocument();
      });
    });
  });
});
