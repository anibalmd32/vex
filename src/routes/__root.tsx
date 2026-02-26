import { Box, Container } from "@mui/material";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import Dock from "../components/AppNavigation/Dock";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        pt: 2,
      }}
    >
      <Box>
        <Outlet />
      </Box>
      <Box
        sx={{
          px: 2,
        }}
      >
        <Dock />
      </Box>
    </Container>
  );
}
