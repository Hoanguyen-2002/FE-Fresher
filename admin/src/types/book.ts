export type TBookListReturn = {
  books: TBook[];
  totalItems: number;
  msg: unknown;
};

export type TBook = {
  bookId: string;
  title: string;
  thumbnail: string;
  averageRating: number;
  basePrice: number;
  discountPrice: number;
  sellingPrice: number;
  authorName: string;
  categoryName: string;
  publisherName: string;
  totalSalesCount: number;
};

export type TBookDetail = {
  bookId: string;
  title: string;
  thumbnail: string;
  averageRating: number;
  description: HTMLElement;
  price: TPrice;
  authors: TAuthor[];
  categories: TCategory[];
  publisher: TPublisher;
  totalSalesCount: number;
  totalReviewsCount: number;
  quantity: number;
  properties: TProperty[];
  images: TBookImage[];
  status: boolean;
};

export type TCreateProductBody = {
  title: string;
  thumbnail: string;
  description: string;
  quantity: number;
  publisher: TPublisher;
  authors: TAuthor[];
  images: TBookImage[];
  categories: TCategory[];
  properties: TProperty[] | undefined;
  price: TPrice;
  status?: boolean;
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
  bookAuthorId: string | undefined;
};

export type TPublisher = {
  name: string;
};
