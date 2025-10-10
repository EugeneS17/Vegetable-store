import { ActionIcon, Badge, Group, Text } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import type { CartItem } from "../../types";
import styles from "./index.module.css";

interface HeaderProps {
  cartItems: CartItem[];
  onCartClick: () => void;
}

export function Header({ cartItems, onCartClick }: HeaderProps) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className={styles.header}>
      <Group justify="space-between" align="center">
        <Text className={styles.title}>🥬 Vegetable Store</Text>

        <Group gap="md" align="center">
          <div className={styles.cartInfo}>
            <p className={styles.cartItems}>Items: {totalItems}</p>
            <p className={styles.cartTotal}>Total: ₹{totalPrice}</p>
          </div>
          <ActionIcon
            size="xl"
            variant="filled"
            color="green"
            onClick={onCartClick}
            className={styles.cartButton}
          >
            <IconShoppingCart size={20} />
            {totalItems > 0 && (
              <Badge
                size="sm"
                variant="filled"
                color="red"
                className={styles.badge}
              >
                {totalItems}
              </Badge>
            )}
          </ActionIcon>
        </Group>
      </Group>
    </div>
  );
}
