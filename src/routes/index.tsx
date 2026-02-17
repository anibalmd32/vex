import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { db } from "../database/db";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    db.query.test
      .findMany()
      .execute()
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }, []);
  return <div>Hello "/"!</div>;
}
