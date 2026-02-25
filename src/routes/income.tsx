import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/income")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/income"!</div>;
}
