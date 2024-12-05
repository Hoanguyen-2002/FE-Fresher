const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

export const handleKeyPress = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  const charCode = event.key;

  // Chặn nếu ký tự không phải là số từ 0-9
  if (!allowedKeys.includes(charCode) && !/^[0-9]$/.test(charCode)) {
    event.preventDefault();
  }
};

export const isNumber = (str: string) => {
  if (typeof str !== "string") return false;
  return !isNaN(Number(str));
};
