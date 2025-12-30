import { useState } from "react"
import type { Product } from "../../domains/products/types/Product"
import { CartContext } from "./CartContext"

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([])

  const addToCart = (product: Product) => {
    setCart((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev
      return [...prev, product]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, subtotal }}
    >
      {children}
    </CartContext.Provider>
  )
}
