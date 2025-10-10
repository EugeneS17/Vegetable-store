import {
  Modal,
  Text,
  Group,
  Image,
  Button,
  Stack,
  Divider,
  ActionIcon,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { CartItem } from "../../types";
import styles from "./index.module.css";

interface CartProps {
  opened: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export function Cart({
  opened,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
}: CartProps) {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text size="xl" fw={700}>
          Shopping Cart
        </Text>
      }
      size="lg"
    >
      {cartItems.length === 0 ? (
        <Text className={styles.emptyCart}>Your cart is empty</Text>
      ) : (
        <Stack gap="md">
          {cartItems.map((item) => (
            <div key={item.product.id} className={styles.cartItem}>
              <Group align="center" justify="space-between">
                <Group align="center" className={styles.itemInfo}>
                  <Image
                    src={item.product.image}
                    width={60}
                    height={60}
                    radius="md"
                    fit="cover"
                  />
                  <div>
                    <Text className={styles.itemName}>{item.product.name}</Text>
                    <Text className={styles.itemPrice}>
                      ₹{item.product.price} each
                    </Text>
                  </div>
                </Group>

                <Group align="center" className={styles.itemActions}>
                  <Group gap="xs">
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() =>
                        onUpdateQuantity(
                          item.product.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                    >
                      -
                    </Button>
                    <Text className={styles.quantity}>{item.quantity}</Text>
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </Group>

                  <Text className={styles.itemTotal}>
                    ₹{item.product.price * item.quantity}
                  </Text>

                  <ActionIcon
                    color="red"
                    variant="subtle"
                    onClick={() => onRemoveItem(item.product.id)}
                  >
                    <IconTrash size={18} />
                  </ActionIcon>
                </Group>
              </Group>
              <Divider mt="md" />
            </div>
          ))}

          <Group justify="space-between" className={styles.totalRow}>
            <Text className={styles.totalLabel}>Total:</Text>
            <Text className={styles.totalPrice}>₹{totalPrice}</Text>
          </Group>

          <Button
            fullWidth
            size="lg"
            color="green"
            className={styles.checkoutButton}
          >
            Checkout
          </Button>
        </Stack>
      )}
    </Modal>
  );
}
