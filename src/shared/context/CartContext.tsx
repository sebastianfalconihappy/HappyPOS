import { createContext } from "react"
import type { Product } from "../../domains/products/types/Product"

export type CartContextType = {
  cart: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  subtotal: number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)
