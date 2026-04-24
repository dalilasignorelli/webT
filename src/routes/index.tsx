import {createFileRoute} from "@tanstack/react-router";
import {redirect} from "@tanstack/router-core";

export const Route = createFileRoute("/")({
  component: HomePage,
});
