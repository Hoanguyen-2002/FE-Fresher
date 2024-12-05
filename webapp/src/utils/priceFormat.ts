export const formatPrice = (value: number): string => {
    if (!value) return ""
    return new Intl.NumberFormat('vi-Vn', { style: 'currency', currency: 'VND' }).format(value);
}

export const getPrice = (value: number | undefined): number => {
    if(!value) return 0;
    return Number(value);
}