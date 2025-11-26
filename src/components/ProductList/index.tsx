import { SimpleGrid, Loader, Container, Text } from '@mantine/core';
import type { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import styles from './index.module.css';

interface ProductListProps {
  products: Product[];
  loading: boolean;
}

export function ProductList({ products, loading }: ProductListProps) {
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
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
