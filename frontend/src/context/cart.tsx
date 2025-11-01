// src/context/cart.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, newQuantity: number) => void; // ← NEW
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
let onAddToCart: (() => void) | null = null;

export const setOnAddToCart = (callback: () => void) => {
  onAddToCart = callback;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      const newCart = existing
        ? prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prev, { ...item, quantity: 1 }];

      console.log('Cart updated (add):', newCart);
      if (onAddToCart) onAddToCart();
      return newCart;
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent negative/zero

    setCart((prev) => {
      const newCart = prev
        .map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i))
        .filter((i) => i.quantity > 0); // Remove if quantity hits 0

      console.log('Quantity updated:', newCart);
      return newCart;
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const newCart = prev.filter((i) => i.id !== id);
      console.log('Item removed:', newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    console.log('Cart cleared');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};