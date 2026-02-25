import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Dock from "./Dock";

const navigateMock = vi.fn();

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    useRouter: () => ({
      navigate: navigateMock,
    }),
  };
});

describe("Dock Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render without crashing", () => {
      render(<Dock />);

      expect(screen.getByText("Inicio")).toBeInTheDocument();
      expect(screen.getByText("Ingresos")).toBeInTheDocument();
      expect(screen.getByText("Gastos")).toBeInTheDocument();
      expect(screen.getByText("Deudas")).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("should call navigate with correct route when an item is clicked", () => {
      render(<Dock />);

      const incomeButton = screen.getByText("Ingresos");
      fireEvent.click(incomeButton);

      expect(navigateMock).toHaveBeenCalledWith({
        to: "/income",
      });

      const expensesButton = screen.getByText("Gastos");
      fireEvent.click(expensesButton);

      expect(navigateMock).toHaveBeenCalledWith({
        to: "/expenses",
      });
    });

    it("should apply selected state when an item is clicked", () => {
      render(<Dock />);

      const incomeButton = screen.getByText("Ingresos");
      fireEvent.click(incomeButton);

      const buttonElement = screen.getByRole("button", {
        name: "Ingresos",
      });
      expect(buttonElement).toHaveClass("Mui-selected");
    });
  });
});
