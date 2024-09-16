import { TProperty } from "@/types/propertyTypes";
import { createSlice } from "@reduxjs/toolkit";

// Initial state for wishlist
type TInitialState = {
  properties: TProperty[];
};
const initialState: TInitialState = {
  properties: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      // Add a property to the wishlist
      const property = action.payload;
      if (!state.properties.find((item) => item._id === property._id)) {
        state.properties.push(property);
      }
    },
    removeFromWishlist: (state, action) => {
      // Remove a property from the wishlist
      const propertyId = action.payload;
      state.properties = state.properties.filter(
        (item) => item._id !== propertyId
      );
    },
  },
});

// Export actions and reducer
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
