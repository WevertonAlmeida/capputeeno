import React, { createContext, useEffect, useContext, useState } from 'react';

interface CartContextData {
  itemCount: number;
  setItemCount: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextData>({
  itemCount: 0,
  setItemCount: () => {},
});

type Props = {
    children: React.ReactNode;
};
  
export const CartProvider = ({ children }: Props) => {
  const [itemCount, setItemCount] = useState<number>(0);

  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cartItems.reduce(
      (total: number, item: { quantity: number; }) => total + item.quantity,
      0
    );
    setItemCount(count);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ itemCount, setItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextData {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}