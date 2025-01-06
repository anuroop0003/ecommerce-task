import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface BaseProductType {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  images: string[];
  thumbnail: string;
}

export type ErrorTypes = {
  response: {
    data: string;
  };
};

export type Methods =
  | "LIST_PRODUCTS"
  | "ADD_PRODUCT"
  | "EDIT_PRODUCT"
  | "DELETE_PRODUCT";

interface ProductListResponse {
  products: BaseProductType[];
  total: number;
  skip: number;
  limit: number;
}

interface ProductDeleteReponse {
  id: number;
  title: string;
  isDeleted: boolean;
  deletedOn: string;
}

export type ProductResponse<T extends Methods> = T extends "LIST_PRODUCTS"
  ? ProductListResponse
  : T extends "ADD_PRODUCT" | "EDIT_PRODUCT"
  ? BaseProductType
  : T extends "DELETE_PRODUCT"
  ? ProductDeleteReponse
  : never;

export type UseProductResponseType<T extends Methods> =
  T extends "LIST_PRODUCTS"
    ? UseQueryResult<ProductResponse<T>, any>
    : UseMutationResult<ProductResponse<T>, any, any>;
