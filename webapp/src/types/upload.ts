export type TUploadResponse = {
  status: "success" | "failed";
  message?: string;
  url?: string;
};
