import { TProperty } from "./propertyTypes";

// responseType.ts
export type TPropertyResponse = {
  success: boolean;
  message: string;
  data: {
    meta: Meta;
    data: TProperty[];
  };
};

export type TSinglePropertyResponse = {
  success: boolean;
  message: string;
  data: TProperty;
};

export type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
