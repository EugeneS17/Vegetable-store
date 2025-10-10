import { SimpleGrid, Loader, Container, Text } from '@mantine/core';
import type { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import styles from './index.module.css';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductList({ products, loading, onAddToCart }: ProductListProps) {
  if (loading) {
    return (
      <Container className={styles.loaderContainer}>
        <Loader size="xl" color="green" />
        <Text className={styles.loaderText}>Loading products...</Text>
      </Container>
    );
  }

  return (
    <Container size="xl" className={styles.container}>
      <Text className={styles.title}>
        Fresh Products
      </Text>
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing="lg"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
