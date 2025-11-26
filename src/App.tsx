import { useEffect } from "react";
import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchProducts } from "./store/productsSlice";
import { openCart, closeCart } from "./store/cartSlice";
import styles from "./App.module.css";

function App() {
  const dispatch = useAppDispatch();
  const { items: products, loading } = useAppSelector((state) => state.products);
  const { items: cartItems, isOpen: cartOpened } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Header
        cartItems={cartItems}
        onCartClick={() => dispatch(openCart())}
      />

      <ProductList
        products={products}
        loading={loading}
      />

      <Cart
        opened={cartOpened}
        onClose={() => dispatch(closeCart())}
      />
    </div>
  );
}

export default App;
