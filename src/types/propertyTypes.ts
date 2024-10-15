export type TProperty = {
  _id: string;
  createdBy: CreatedBy;
  title: string;
  propertyImages: string[];
  propertyVideo: string;
  category: string;
  price: number;
  priceType: "day" | "week" | "month";
  description: string;
  size: string;
  decorationType: "furnished" | "unfurnished";
  flore: number;
  propertyType: "apartment" | "villa" | "room" | string; // You can extend these based on your property types
  bedType: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  balcony: number;
  kitchen: number;
  dining: number;
  drawing: number;
  moveOn: string;
  unavailableDay: string[];
  allowedGender: "any" | "male" | "female";
  guestType: "single" | "family";
  occupation: "student" | "professional" | string; // Can add more based on your options
  facilities: Facility[];
  isHighlighted: boolean;
  location: LocationType;
  ownerType: "owner" | "tenant" | "others-property";
  ownershipImages: string[];
  ownerNumber: string;
  createdAt: string;
  updatedAt: string;
};

export type LocationType = {
  address: string;
  latitude: number;
  longitude: number;
};

export type CreatedBy = {
  _id: string;
  fullName: string;
  avatar: string;
  rating: number; // New property, added based on your request
};

export type Facility = {
  _id: string;
  name: string;
  icon: string;
};
