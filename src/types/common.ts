export type TFeedback = {
  userId: string; //
  propertyId: string; // Assuming ObjectId is represented as a string
  feedback: string;
  image: string;
  rating: number;
  facilities: string[]; // Array of ObjectId represented as strings
  visibilityStatus: "show" | "hide";
};

export interface OurStory {
  _id: string;
  createdBy: string;
  title: string;
  storyDetails: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TFaq {
  _id: string;
  createdBy: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TBlog {
  _id: string;
  createdBy: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
