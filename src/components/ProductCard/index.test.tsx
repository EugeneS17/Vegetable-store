import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MantineProvider } from "@mantine/core";
import { ProductCard } from ".";
import type { Product } from "../../types";

const renderWithMantine = (component: React.ReactElement) => {
  return render(<MantineProvider>{component}</MantineProvider>);
};

describe("ProductCard", () => {
  const mockProduct: Product = {
    id: 1,
    name: "Broccoli - 1 Kg",
    price: 120,
    image: "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg",
    category: "vegetables",
  };

  it("renders product information correctly", () => {
    renderWithMantine(
      <ProductCard product={mockProduct} onAddToCart={() => {}} />
    );

    expect(screen.getByText("Broccoli - 1 Kg")).toBeInTheDocument();
    expect(screen.getByText("₹120")).toBeInTheDocument();
  });

  it("calls onAddToCart with correct product and quantity", async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();
    renderWithMantine(
      <ProductCard product={mockProduct} onAddToCart={onAddToCart} />
    );

    const addToCartButton = screen.getByText("Add to Cart");
    await user.click(addToCartButton);

    expect(onAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });
});
