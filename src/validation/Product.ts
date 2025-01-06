import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Product title is required"),
  price: z
    .number()
    .positive("Price must be greater than 0") // Direct number validation
    .gt(0, "Price must be greater than 0"), // Validates that the price is greater than 0
  stock: z
    .number()
    .int("Stock must be an integer") // Ensures stock is an integer
    .positive("Stock must be greater than 0") // Ensures stock is positive
    .gt(0, "Stock must be greater than 0"), // Validates that the stock is greater than 0
  category: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
});
