import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

type RouterOptions = {
  context?: Record<string, unknown>;
};

const getRouter = (options?: RouterOptions) => {
  return createRouter({
    routeTree,
    context: options?.context,
    defaultPreload: "intent",
    defaultNotFoundComponent: () => <div>404</div>,
    defaultErrorComponent: () => <div>Error</div>,
  });
};

export const Router = () => {
  const router = getRouter();
  return <RouterProvider router={router} />;
};
