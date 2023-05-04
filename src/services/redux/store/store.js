import { configureStore } from "@reduxjs/toolkit";
import accessTokenReducer from "../slices/accessTokenSlice";

// export const wrapper = createWrapper(store);
export default configureStore({
  reducer: {
    accessToken: accessTokenReducer,
  },
});
