"use client";

import "@uploadthing/react/styles.css";

import { UploadButton } from "@/utils/uploadthing";
import { useToast } from "@/ui/use-toast";

export default function ImageUploader({
  setCoverImage,
}: {
  setCoverImage: (image: string) => void;
}) {
  const { toast } = useToast();
  return (
    <>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res: any) => {
          setCoverImage(res[0].fileUrl);
          toast({
            title: "Gambar diupload",
            description: "Gambar sampul buku berhasil diupload.",
          });
        }}
        onUploadError={(error: Error) => {
          toast({
            title: "Gagal mengupload gambar",
            description: error.message,
            variant: "destructive",
          });
        }}
      />
    </>
  );
}
