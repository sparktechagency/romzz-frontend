import { configureStore } from "@reduxjs/toolkit";
import { romzzApi } from "./api/api";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import wishlistReducer from "./features/web/slices/wishlistSlice";
const persistConfig = {
  key: "wishlist",
  storage,
};
const persistedWishlistReducer = persistReducer(persistConfig, wishlistReducer);
export const store = configureStore({
  reducer: {
    [romzzApi.reducerPath]: romzzApi.reducer,
    wishlist: persistedWishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(romzzApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
