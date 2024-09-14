// responseType.ts
export type TPropertyResponse = {
  success: boolean;
  message: string;
  data: {
    meta: Meta;
    data: TProperty[];
  };
};

export type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type LocationType = {
  address: string;
  latitude: number;
  longitude: number;
};

export type TProperty = {
  _id: string;
  createdBy: CreatedBy;
  title: string;
  propertyImages: string[];
  category: string;
  price: number;
  priceType: "day" | "week" | "month";
  location: LocationType;
};

export type CreatedBy = {
  _id: string;
  avatar: string;
  rating: number;
};
