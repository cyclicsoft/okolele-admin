import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  tokenValidity: "",
  refreshToken: "",
  refreshTokenValidity: "",
};

export const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    saveAccessToken: (state, action) => {
      state.token = action.payload.token;
      state.tokenValidity = action.payload.tokenValidity;
      state.refreshToken = action.payload.refreshToken;
      state.refreshTokenValidity = action.payload.refreshTokenValidity;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveAccessToken } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
