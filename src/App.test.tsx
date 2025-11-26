import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { renderWithProviders } from "./test/test-utils";
import App from "./App";

const mockProducts = [
  {
    id: 1,
    name: "Broccoli - 1 Kg",
    price: 120,
    image: "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg",
    category: "vegetables",
  },
];

describe("App", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      } as Response)
    ) as unknown as typeof fetch;
  });

  it("loads and displays products from API", async () => {
    renderWithProviders(
      <MantineProvider>
        <App />
      </MantineProvider>
    );

    expect(screen.getByText("Loading products...")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText("Broccoli - 1 Kg")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(global.fetch).toHaveBeenCalled();
  });
});
