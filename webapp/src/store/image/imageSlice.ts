import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBookImage } from "../../types/book";

export const formImageSlice = createSlice({
  name: "image",
  initialState: {
    thumbnail: "",
    descriptionImages: [] as TBookImage[],
  },
  reducers: {
    setThumbnailUrl: (state, action: PayloadAction<string>) => {
      state.thumbnail = action.payload;
    },
    addDescriptionImages: (state, action: PayloadAction<TBookImage>) => {
      state.descriptionImages.push(action.payload);
    },
    removeDescriptionImages: (state, action: PayloadAction<TBookImage>) => {
      state.descriptionImages = state.descriptionImages.filter(
        (item: TBookImage) => item.imageUrl != action.payload.imageUrl
      );
    },
    removeAllDescriptionImages: (state) => {
      state.descriptionImages = [];
    },
  },
});

export const {setThumbnailUrl, addDescriptionImages, removeAllDescriptionImages, removeDescriptionImages} = formImageSlice.actions

export default formImageSlice.reducer