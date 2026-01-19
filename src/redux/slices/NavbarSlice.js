import { createSlice } from "@reduxjs/toolkit";

const NavbarSlice = createSlice({
  name: "navbarslice",
  initialState: {
    showmenu: false,
  },
  reducers: {
    handleToggleMenu(state, action) {
      state.showmenu =
        action.payload !== undefined ? action.payload : !state.showmenu;
    },
  },
});
export const { handleToggleMenu } = NavbarSlice.actions;
export default NavbarSlice.reducer;
