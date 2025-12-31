type CropPos = {
  x: number;
  y: number;
};

export type UploadingImage = {
  id: string;
  file: File | Blob;
  src: string;
  thumbSrc: string;
  name: string;
  width: number;
  height: number;
  ratio: number;
  croppedBlob: Blob | null;
  croppedUrl: string | null;
  thumbCroppedBlob: Blob | null;
  thumbCroppedUrl: string | null;
  defaultCropY: number;
  crop: CropPos;
  thumbCrop: CropPos;
  zoom: number;
  thumbZoom: number;
};
