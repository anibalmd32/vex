import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debts")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/debts"!</div>;
}
