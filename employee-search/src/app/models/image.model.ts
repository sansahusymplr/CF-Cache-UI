export interface Image {
  id: string;
  fileName: string;
  contentType: string;
  size: number;
  uploadedAt: string;
}

export interface ImageUploadResponse {
  message: string;
  data: Image;
}

export interface ImageListResponse {
  data: Image[];
}
