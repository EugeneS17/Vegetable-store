import { useState } from "react";
import {
  Card,
  Image,
  Text,
  Button,
  Group,
  ActionIcon,
  NumberInput,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/cartSlice";
import type { Product } from "../../types";
import styles from "./index.module.css";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    setQuantity(1);
  };

  return (
    <Card
      shadow={isHovered ? "lg" : "sm"}
      padding="lg"
      radius="md"
      withBorder
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={styles.card}
    >
      <Card.Section>
        <Image
          src={product.image}
          height={200}
          alt={product.name}
          fit="cover"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text className={styles.productName}>{product.name}</Text>
      </Group>

      <Text className={styles.price}>₹{product.price}</Text>

      <Group className={styles.quantityGroup}>
        <ActionIcon
          variant="filled"
          color="gray"
          onClick={handleDecrement}
          disabled={quantity <= 1}
        >
          <IconMinus size={16} />
        </ActionIcon>

        <NumberInput
          value={quantity}
          onChange={(val) => setQuantity(Number(val) || 1)}
          min={1}
          max={99}
          className={styles.quantityInput}
          classNames={{
            input: styles.quantityInputField,
          }}
        />

        <ActionIcon variant="filled" color="gray" onClick={handleIncrement}>
          <IconPlus size={16} />
        </ActionIcon>
      </Group>

      <Button
        fullWidth
        color="green"
        variant="filled"
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </Card>
  );
}
