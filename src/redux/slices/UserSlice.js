import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    user: {},
    loggoutToggle: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    handleWarningModel(state, action) {
      state.loggoutToggle = !state.loggoutToggle;
    },
  },
});

export const { setUser, handleWarningModel } = UserSlice.actions;
export default UserSlice.reducer;
