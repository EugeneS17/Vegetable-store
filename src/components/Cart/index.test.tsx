import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { renderWithProviders } from "../../test/test-utils";
import { Cart } from ".";
import type { CartItem } from "../../types";

describe("Cart", () => {
  const mockCartItems: CartItem[] = [
    {
      product: {
        id: 1,
        name: "Broccoli - 1 Kg",
        price: 120,
        image: "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg",
        category: "vegetables",
      },
      quantity: 2,
    },
  ];

  it("shows empty message when cart is empty", () => {
    renderWithProviders(
      <MantineProvider>
        <Cart opened={true} onClose={() => {}} />
      </MantineProvider>,
      {
        preloadedState: {
          cart: { items: [], isOpen: true },
          products: { items: [], loading: false, error: null },
        },
      }
    );

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  it("displays cart items and total price", () => {
    renderWithProviders(
      <MantineProvider>
        <Cart opened={true} onClose={() => {}} />
      </MantineProvider>,
      {
        preloadedState: {
          cart: { items: mockCartItems, isOpen: true },
          products: { items: [], loading: false, error: null },
        },
      }
    );

    expect(screen.getByText("Broccoli - 1 Kg")).toBeInTheDocument();
    expect(screen.getByText("Total:")).toBeInTheDocument();
  });
});
