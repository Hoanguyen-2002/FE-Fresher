import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCategory } from "../../types/book";

export interface CategoryState {
  categoryList: TCategory[];
  filteredCategory: string[];
}

const initialState: CategoryState = {
  categoryList: [],
  filteredCategory: [] as string[]
};

export const categorySlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    updateCategoryState: (state, action: PayloadAction<Partial<CategoryState>>) => {
      return { ...state, ...action.payload };
    },
    addFilteredCategories: (state, action: PayloadAction<string>) => {
      console.log(action.payload)
      state.filteredCategory.push(action.payload)
    },
    removeFilteredCategories: (state, action: PayloadAction<string>) => {
      const newFilteredCategories = state.filteredCategory.filter(
        (category) => category !== action.payload
      );
      state.filteredCategory = newFilteredCategories;
    },
    removeAllFilteredCategory: (state) => {
      state.filteredCategory = [];
    },
  },
});

// this is for dispatch
export const { addFilteredCategories, removeAllFilteredCategory, removeFilteredCategories, updateCategoryState } = categorySlice.actions;

// this is for configureStore
export default categorySlice.reducer;
