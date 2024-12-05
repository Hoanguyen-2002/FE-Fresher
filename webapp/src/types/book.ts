export type TBookListReturn = {
  books: TBook[];
  totalItems: number;
};

export type TBook = {
  bookId: string;
  title: string;
  thumbnail: string;
  averageRating: number;
  basePrice: number;
  discountPrice: number;
  authorName: string;
  categoryName: string;
  publisherName: string;
  totalSalesCount: number;
};

export type TBookDetail = {
  bookId: string;
  title: string;
  thumbnail: string;
  description: string;
  averageRating: number;
  price: TPrice;
  authors: TAuthor[];
  categories: TCategory[];
  publisher: TPublisher;
  totalSalesCount: number;
  totalReviewsCount: number;
  quantity: number;
  properties: TProperty[];
  images: TBookImage[];
};

export type TProperty = {
  name: string;
  value: string;
  propertyId: string;
};

export type TCategory = {
  name: string;
  categoryId: string;
};

export type TPrice = {
  basePrice: number;
  discountPrice: number;
};

export type TBookImage = {
  imageUrl: string;
};

export type TAuthor = {
  name: string;
  authorId: string;
};

export type TPublisher = {
  name: string;
};
