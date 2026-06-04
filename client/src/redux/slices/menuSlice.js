import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getMenuItems } from "../../services/menuService";

export const fetchMenu = createAsyncThunk(
  "menu/fetchMenu",
  async (_, thunkAPI) => {
    try {
      return await getMenuItems();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const initialState = {
  menu: [],
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload;
      })

      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default menuSlice.reducer;