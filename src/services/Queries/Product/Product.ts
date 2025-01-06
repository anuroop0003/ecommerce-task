import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../AxiosInstance";
import { Methods, UseProductResponseType } from "./type";

export const useProduct = <T extends Methods>({
  method,
  data,
}: {
  method: T;
  data?: {
    page: number;
    limit: number;
  };
}) => {
  switch (method) {
    case "LIST_PRODUCTS":
      return useQuery({
        queryKey: ["list_products", data],
        queryFn: async () => {
          const skip = (data?.page || 0) * (data?.limit || 0);
          const response = await axiosInstance({
            url: `https://dummyjson.com/products?limit=${data?.limit}&skip=${skip}`,
            method: "get",
          });
          return response;
        },
      }) as UseProductResponseType<T>;
    case "ADD_PRODUCT":
      return useMutation({
        mutationKey: ["add_product"],
        mutationFn: async (data) =>
          axiosInstance({
            url: "https://dummyjson.com/products/add",
            method: "post",
            data: JSON.stringify(data),
          }),
      }) as UseProductResponseType<T>;
    case "EDIT_PRODUCT":
      return useMutation({
        mutationKey: ["edit_product"],
        mutationFn: async (data) =>
          axiosInstance({
            url: `https://dummyjson.com/products/${data?.id}`,
            method: "patch",
            data: JSON.stringify(data),
          }),
      }) as UseProductResponseType<T>;
    case "DELETE_PRODUCT":
      return useMutation({
        mutationKey: ["delete_product"],
        mutationFn: async (data) =>
          axiosInstance({
            url: `https://dummyjson.com/products/${data?.id}`,
            method: "delete",
          }),
      }) as UseProductResponseType<T>;
    default:
      throw new Error("Unsupported method");
  }
};
