import axios from "axios";
import { TUploadResponse } from "../../types/upload";

export const uploadImage = async (file: File): Promise<TUploadResponse> => {
  if (!file) {
    return {
      status: "failed",
      message: "Ảnh tải lên không hợp lệ",
    };
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`
  );
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      formData
    );
    return {
      status: "success",
      url: response.data.secure_url,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      status: "failed",
      message: `CÓ lỗi xảy ra: ${error}`,
    };
  }
};
