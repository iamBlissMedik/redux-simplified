import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url = "https://course-api.com/react-useReducer-cart-project";
import axios from "axios";
const initialState = {
  cartItems: [],
  amount: 1,
  total: 0,
  isLoading: false,
};
export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  try {
    const { data } = await axios(url);
    return data;
  } catch (error) {}
});
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const selectedItemId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== selectedItemId
      );
    },
    increase: (state, { payload }) => {
      const selectedItemId = payload.id;
      const selectedItem = state.cartItems.find(
        (item) => item.id === selectedItemId
      );
      selectedItem.amount++;
    },
    decrease: (state, { payload }) => {
      const selectedItemId = payload.id;
      const selectedItem = state.cartItems.find(
        (item) => item.id === selectedItemId
      );
      selectedItem.amount--;
    },
    calculateTotal: (state) => {
      let _amount = 0;
      let _total = 0;
      state.cartItems.forEach(({ amount, price }) => {
        _amount += amount;
        _total += amount * price;
      });
      state.amount = _amount;
      state.total = _total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export default cartSlice.reducer;
export const { clearCart, removeItem, decrease, increase, calculateTotal } =
  cartSlice.actions;
