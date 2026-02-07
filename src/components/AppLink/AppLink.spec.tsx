import { waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithRouter } from "../../test-utils";
import { AppLink } from "./AppLink";

describe("AppLink", () => {
  it("should render without crashing", async () => {
    const { getByText } = renderWithRouter(<AppLink to="/">Test Link</AppLink>);

    await waitFor(() => {
      expect(getByText("Test Link")).toBeInTheDocument();
    });
  });

  it("should render as a link element with correct href", async () => {
    const { getByRole } = renderWithRouter(<AppLink to="/">Test Link</AppLink>);

    await waitFor(() => {
      const link = getByRole("link", {
        name: "Test Link",
      });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/");
    });
  });
});
