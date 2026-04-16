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

/** Route definitions used across all integration tests. */
const ROUTES = [
  {
    path: "/",
    text: "Home",
  },
  {
    path: "/income",
    text: 'Hello "/income"!',
  },
  {
    path: "/expenses",
    text: 'Hello "/expenses"!',
  },
  {
    path: "/debts",
    text: 'Hello "/debts"!',
  },
] as const;

/** Dock navigation items mapped to their target routes. */
const NAV_ITEMS = [
  {
    label: "Inicio",
    expectedText: "Home",
  },
  {
    label: "Ingresos",
    expectedText: 'Hello "/income"!',
  },
  {
    label: "Gastos",
    expectedText: 'Hello "/expenses"!',
  },
  {
    label: "Deudas",
    expectedText: 'Hello "/debts"!',
  },
] as const;

/**
 * Builds a fully isolated router with all app routes and renders it.
 * Uses createMemoryHistory so tests never share browser history state.
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

  const children = ROUTES.map(({ path, text }) =>
    createRoute({
      getParentRoute: () => rootRoute,
      path,
      component: () => <div>{text}</div>,
    }),
  );

  const router = createRouter({
    routeTree: rootRoute.addChildren(children),
    history: createMemoryHistory({
      initialEntries: [
        initialEntry,
      ],
    }),
  });

  return render(<RouterProvider router={router} />);
}

/** Waits for a text element to appear in the document. */
async function expectTextVisible(text: string) {
  await waitFor(() => {
    expect(screen.getByText(text)).toBeInTheDocument();
  });
}

describe("Route Integration Tests", () => {
  describe("Route Rendering", () => {
    it.each(ROUTES)("should render $text at $path", async ({ path, text }) => {
      renderApp(path);
      await expectTextVisible(text);
    });
  });

  describe("Dock Navigation", () => {
    it("should render all Dock navigation items", async () => {
      renderApp("/");

      await waitFor(() => {
        for (const { label } of NAV_ITEMS) {
          expect(screen.getByText(label)).toBeInTheDocument();
        }
      });
    });

    it.each(
      NAV_ITEMS.filter((n) => n.label !== "Inicio"),
    )("should navigate from home to $label", async ({
      label,
      expectedText,
    }) => {
      const user = userEvent.setup();
      renderApp("/");
      await expectTextVisible("Home");

      await user.click(screen.getByText(label));
      await expectTextVisible(expectedText);
    });

    it("should navigate between routes: income → expenses → debts", async () => {
      const user = userEvent.setup();
      renderApp("/");
      await expectTextVisible("Home");

      const sequence = NAV_ITEMS.filter((n) => n.label !== "Inicio");
      for (const { label, expectedText } of sequence) {
        await user.click(screen.getByText(label));
        await expectTextVisible(expectedText);
      }
    });

    it("should navigate back to home from a sub-route", async () => {
      const user = userEvent.setup();
      renderApp("/income");
      await expectTextVisible('Hello "/income"!');

      await user.click(screen.getByText("Inicio"));
      await expectTextVisible("Home");
    });
  });
});
