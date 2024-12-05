export const formatPrice = (value: number): string => {
    return new Intl.NumberFormat('vi-Vn', { style: 'currency', currency: 'VND' }).format(value);
}