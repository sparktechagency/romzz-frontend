export type TFeedback = {
  userId: string; //
  propertyId: string; // Assuming ObjectId is represented as a string
  feedback: string;
  image: string;
  rating: number;
  facilities: string[]; // Array of ObjectId represented as strings
  visibilityStatus: "show" | "hide";
};
