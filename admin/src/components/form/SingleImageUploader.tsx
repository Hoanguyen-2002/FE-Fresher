import { PlusOutlined } from "@ant-design/icons";
import { Flex, notification, Spin, Image } from "antd";
import { useEffect, useState } from "react";
import { uploadImage } from "../../api/upload/uploadImage";
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import { setThumbnailUrl } from "../../store/image/imageSlice";
import { NotificationType } from "../../types/type";
import { validateFile } from "../../utils/validateFile";
import { RootState } from "../../store/configureStore";

const SingleImageUploader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, msg: string) => {
    api[type]({
      message: "Tải ảnh thất bại",
      description: msg,
    });
  };
  const imagesStore = useAppSelector((state: RootState) => state.image);

  const handleUpload = async (file: File) => {
    if (!file) return;
    const validateResult = validateFile(file);
    if (!validateResult.isValid) {
      openNotificationWithIcon("error", validateResult.message);
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`
    );
    console.log(formData.get("file"));
    try {
      setIsLoading(true);
      const response = await uploadImage(file);
      if (response.url) {
        dispatch(setThumbnailUrl(response.url));
        setImageUrl(response.url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleUpload(event.target.files[0]);
      event.target.value = ""
    }
  };

  const triggerUpload = () => {
    const uploadInput = document.getElementById("upload-input-single");
    uploadInput?.click();
  };

  useEffect(() => {
    setImageUrl(imagesStore.thumbnail)
  }, [imagesStore.thumbnail]);

  return (
    <>
      {contextHolder}
      <Spin spinning={isLoading} tip="Đang tải">
        <div className="ml-4">
          {imageUrl !== null && imageUrl !== "" ? (
            <div className="relative flex justify-start">
              <Image className="justify-start" width={128} height={128} src={imageUrl} />
              <span
                className="size-6 text-white text-center bg-soft-red rounded-full absolute top-[-4px] left-28 cursor-pointer"
                onClick={() => {
                  dispatch(setThumbnailUrl(""));
                  setImageUrl(null);
                }}
              >
                X
              </span>
            </div>
          ) : (
            <>
              <input
                id="upload-input-single"
                className="!hidden"
                accept="image/*"
                type="file"
                onChange={(e) => handleFileChange(e)}
              />
              <Flex
                onClick={triggerUpload}
                vertical
                align="center"
                justify="center"
                className="size-32 border-2 border-dashed cursor-pointer"
              >
                <PlusOutlined />
                <p>Tải ảnh lên</p>
              </Flex>
            </>
          )}
        </div>
      </Spin>
    </>
  );
};

export default SingleImageUploader;
