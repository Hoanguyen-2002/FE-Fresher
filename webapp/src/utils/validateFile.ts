export const validateFile = (file: File) => {
    const MAX_SIZE = 25 * 1024 * 1024;
    const allowedImageTypes = [
      'image/jpeg',
      'image/jpg',
      'image/jfif',
      'image/webp',
      'image/png',
      'image/gif',
    ];
  
    if (!file) {
      return { isValid: false, message: 'Không có tệp được chọn.' };
    }
  
    if (!allowedImageTypes.includes(file.type)) {
      return {
        isValid: false,
        message:
          'Tệp không phải là định dạng ảnh được hỗ trợ. Vui lòng chọn đúng định dang file ảnh.',
      };
    }
  
    if (file.size > MAX_SIZE) {
      return {
        isValid: false,
        message: 'Tệp vượt quá kích thước tối đa cho phép (25MB).',
      };
    }
  
    return { isValid: true, message: 'Tệp hợp lệ.' };
  };