import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createOrder, getOrderById } from "../../services/orderService";

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (data, thunkAPI) => {
    try {
      return await createOrder(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (id, thunkAPI) => {
    try {
      return await getOrderById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

const initialState = {
  order: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.order = action.payload;
      });
  },
});

export default orderSlice.reducer;
