import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../AxiosInstance";
import { Methods, UseAuthResponseType } from "./type";

export const useAuth = <T extends Methods>({ method }: { method: T }) => {
  switch (method) {
    case "GET_USER_DETAILS":
      return useMutation({
        mutationKey: ["get_user_details"],
        mutationFn: async () =>
          axiosInstance({
            url: "https://dummyjson.com/auth/me",
            method: "get",
          }),
      }) as UseAuthResponseType<T>;
    case "GET_USER":
      return useMutation({
        mutationKey: ["get_user"],
        mutationFn: async (data) =>
          axiosInstance({
            url: "/user/login",
            method: "post",
            data: JSON.stringify(data),
          }),
      }) as UseAuthResponseType<T>;
    case "CREATE_USER":
      return useMutation({
        mutationKey: ["create_user"],
        mutationFn: async (data) =>
          axiosInstance({
            url: "/users/add",
            method: "post",
            data: JSON.stringify(data),
          }),
      }) as UseAuthResponseType<T>;
    default:
      throw new Error("Unsupported method");
  }
};
