export const API_ROUTES = {
  AUTH_API: '/v1/auth',
  ACCOUNT: '/v1/accounts',
  BOOK_LIST: '/v1/products/cards',
  BOOK_DETAIL: '/v1/products',
  ALL_CATEGORY: '/v1/categories',
  CATEGORY: '/v1/admin/categories',
  CATEGORY_LIST: '/v1/categories',
  CREATE_BOOK: '/v1/admin/products/create',
  TOP_SELLER_BOOK_LIST: '/v1/products/top-sellers',
  BOOK_REVIEW: '/v1/reviews/book',
  ODER_REVIEW: '/v1/reviews/orderDetail',
  ODER_DETAIL: '/v1/myOrder',
  CHECKOUT: '/v1/checkout',
};

export const BOOK_ITEM_PER_PAGE = 20;

export const MAX_IMAGES_ALLOWED = 3;

export const CARD_TITLE_CSS: React.CSSProperties = {
  fontSize: '16px',
  textAlign: 'left',
  border: 'none',
  minHeight: '0px',
  padding: '10px 24px',
};

export const MAX_DESCRIPTION_WORDS = 250;

export const ORDER_CANCEL_REASONS = [
  'Tôi muốn thay đổi đơn hàng (sản phẩm, số lượng,...)',
  'Thay đổi ý định',
  'Tôi muốn thay đổi thông tin giao hàng',
];
