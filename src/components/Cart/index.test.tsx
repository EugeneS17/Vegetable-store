import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { Cart } from ".";
import type { CartItem } from "../../types";

const renderWithMantine = (component: React.ReactElement) => {
  return render(<MantineProvider>{component}</MantineProvider>);
};

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
    renderWithMantine(
      <Cart
        opened={true}
        onClose={() => {}}
        cartItems={[]}
        onRemoveItem={() => {}}
        onUpdateQuantity={() => {}}
      />
    );

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  it("displays cart items and total price", () => {
    renderWithMantine(
      <Cart
        opened={true}
        onClose={() => {}}
        cartItems={mockCartItems}
        onRemoveItem={() => {}}
        onUpdateQuantity={() => {}}
      />
    );

    expect(screen.getByText("Broccoli - 1 Kg")).toBeInTheDocument();
    expect(screen.getByText("Total:")).toBeInTheDocument();
  });
});
