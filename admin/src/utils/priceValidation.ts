export const formatPrice = (value: number): string => {
  return new Intl.NumberFormat("vi-Vn", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export const validateDiscountPrice = async (_: unknown, discountPrice: number, basePrice: number) => {
    if (discountPrice > basePrice) {
      return Promise.reject(new Error('Giá giảm không được cao hơn giá gốc!'));
    }
    return Promise.resolve();
  };