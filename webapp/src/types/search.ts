export type TSearchParams = {
    title: string;
    publisher: string;
    rating: number | null;
    minPrice: number | null;
    maxPrice: number | null;
    authors: string;
    categories: string[];
    page: number;
    size: number;
    sort: TSort[]
  };

export type TSort = {
  sortType: string,
  order: 'asc' | 'desc'
}