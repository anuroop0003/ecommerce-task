import { UseMutationResult } from "@tanstack/react-query";

export type ParamsTypes = {
  email?: string;
  password?: string;
};

export type DataTypes = {
  name?: string;
  email?: string;
  role?: string;
  token?: string;
  password?: string;
};

export type ErrorTypes = {
  response: {
    data: string;
  };
};

type UserResponse = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: string;
};

type AuthReponse = {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export type Methods = "GET_USER" | "CREATE_USER" | "GET_USER_DETAILS";

export type AuthResponse<T extends Methods> = T extends "GET_USER"
  ? AuthReponse
  : T extends "CREATE_USER"
  ? AuthReponse
  : T extends "GET_USER_DETAILS"
  ? UserResponse
  : never;

export type UseAuthResponseType<T extends Methods> = UseMutationResult<
  AuthResponse<T>,
  any,
  any
>;
