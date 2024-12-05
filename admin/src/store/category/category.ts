import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCategoryListItem } from "../../types/category";
import { RootState } from "../configureStore";

type TCategoryStore = {
  categoryItem: TCategoryListItem | null;
};

const initialState: TCategoryStore = {
  categoryItem: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateCategory: (state, action: PayloadAction<TCategoryListItem>) => {
      console.log("state Category", action.payload);
      return { ...state, categoryItem: action.payload };
    },
    removeAllItem: () => initialState,
  },
});
export const categorySelector = (state: RootState) => state;

export const { updateCategory, removeAllItem } = categorySlice.actions;

export default categorySlice.reducer;
