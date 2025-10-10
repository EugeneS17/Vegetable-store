import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import App from "./App";

const renderWithMantine = (component: React.ReactElement) => {
  return render(<MantineProvider>{component}</MantineProvider>);
};

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
        json: () => Promise.resolve(mockProducts),
      } as Response)
    ) as unknown as typeof fetch;
  });

  it("loads and displays products from API", async () => {
    renderWithMantine(<App />);

    await waitFor(() => {
      expect(screen.getByText("Broccoli - 1 Kg")).toBeInTheDocument();
    });
  });
});
