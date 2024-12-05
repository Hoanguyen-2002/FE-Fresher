import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBook } from "../../types/book";
import { TSort } from "../../types/search";

export interface BookState {
  bookList: TBook[];
  currentPage: number;
  totalItems: number;
  searchValue: string;
  filterCategory?: string[];
  ratingValue?: number | null;
  maxPrice?: number | null;
  minPrice?: number | null;
  sort?: TSort[]
}

const initialState: BookState = {
  bookList: [],
  currentPage: 1,
  totalItems: 1,
  searchValue: "",
  filterCategory: [],
  ratingValue: null,
  maxPrice: null,
  minPrice: null,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    updateBookState: (state, action: PayloadAction<Partial<BookState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

// this is for dispatch
export const { updateBookState } = bookSlice.actions;

// this is for configureStore
export default bookSlice.reducer;
