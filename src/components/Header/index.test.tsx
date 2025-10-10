import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MantineProvider } from "@mantine/core";
import { Header } from ".";
import type { CartItem } from "../../types";

const renderWithMantine = (component: React.ReactElement) => {
  return render(<MantineProvider>{component}</MantineProvider>);
};

describe("Header", () => {
  const mockCartItems: CartItem[] = [
    {
      product: {
        id: 1,
        name: "Broccoli",
        price: 120,
        image: "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg",
        category: "vegetables",
      },
      quantity: 2,
    },
  ];

  it("renders and displays cart information", () => {
    renderWithMantine(
      <Header cartItems={mockCartItems} onCartClick={() => {}} />
    );
    expect(screen.getByText(/Vegetable Store/i)).toBeInTheDocument();
    expect(screen.getByText("Items: 2")).toBeInTheDocument();
    expect(screen.getByText("Total: ₹240")).toBeInTheDocument();
  });

  it("calls onCartClick when cart icon is clicked", async () => {
    const user = userEvent.setup();
    const onCartClick = vi.fn();
    renderWithMantine(
      <Header cartItems={mockCartItems} onCartClick={onCartClick} />
    );

    const cartButton = screen.getByRole("button");
    await user.click(cartButton);

    expect(onCartClick).toHaveBeenCalledTimes(1);
  });
});
