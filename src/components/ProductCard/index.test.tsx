import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MantineProvider } from "@mantine/core";
import { renderWithProviders } from "../../test/test-utils";
import { ProductCard } from ".";
import type { Product } from "../../types";

describe("ProductCard", () => {
  const mockProduct: Product = {
    id: 1,
    name: "Broccoli - 1 Kg",
    price: 120,
    image: "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg",
    category: "vegetables",
  };

  it("renders product information correctly", () => {
    renderWithProviders(
      <MantineProvider>
        <ProductCard product={mockProduct} />
      </MantineProvider>
    );

    expect(screen.getByText("Broccoli - 1 Kg")).toBeInTheDocument();
    expect(screen.getByText("₹120")).toBeInTheDocument();
  });

  it("adds product to cart when Add to Cart is clicked", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(
      <MantineProvider>
        <ProductCard product={mockProduct} />
      </MantineProvider>
    );

    const addToCartButton = screen.getByText("Add to Cart");
    await user.click(addToCartButton);

    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].product.id).toBe(mockProduct.id);
    expect(state.cart.items[0].quantity).toBe(1);
  });
});
