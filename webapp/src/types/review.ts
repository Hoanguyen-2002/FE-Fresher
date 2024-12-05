import { TBookImage } from "./book";

export type TBookListReview = {
  reviews: TBookReview[];
  totalItems: number;
};

export type TBookReview = {
  accountId: string;
  username: string;
  images: TImages[];
  rating: number;
  comment: string;
  review_id: string;
  created_at: string;
};

export type TImages = {
  review_image_id: string;
  imageUrl: string;
};

export type TCreateReview = {
  comment: string;
  rating: number;
  images: TBookImage[];
};
