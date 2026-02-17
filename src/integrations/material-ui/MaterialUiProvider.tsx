import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

export const MaterialUiProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ThemeProvider defaultMode="dark" theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
