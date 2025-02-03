import { useEffect, useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface ImageUploadContainerProps {
    onImagesUpdate?: (images: string[], uploadurl: string[]) => void;
    maxUploads: number;
    uploadUrl: string;
}

function ImageUploadContainer({ onImagesUpdate, maxUploads, uploadUrl }: ImageUploadContainerProps) {
    const [images, setImages] = useState<{ id: string; file: File; status: string; url?: string; uploadedurl: string }[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const urls = images.map((img) => img.url).filter((url): url is string => !!url);
        const uploadurls = images.map((img) => img.uploadedurl).filter((url): url is string => !!url);
        if (onImagesUpdate) {
            onImagesUpdate(urls, uploadurls);
        }
    }, [images]);

    const uploadImageMutation = useMutation({
        mutationKey: ["uploadImage"],
        mutationFn: async (image: { id: string; file: File }) => {
            const binaryData = await image.file.arrayBuffer();
            const uint8Array = new Uint8Array(binaryData);

            const response = await axios.put(uploadUrl, uint8Array, {
                headers: { "Content-Type": "application/octet-stream" },
            });

            return { id: image.id, url: `https://images.tanzo.in/${response.data}`, upurl: `${uploadUrl}` };
        },
        onSuccess: (data) => {
            setImages((prevImages) =>
                prevImages.map((img) =>
                    img.id === data.id ? { ...img, status: "uploaded", url: data.url, uploadedurl: data.upurl } : img
                )
            );
        },
        onError: (error, variables) => {
            setImages((prevImages) =>
                prevImages.map((img) => (img.id === variables.id ? { ...img, status: "error" } : img))
            );
            console.error("Upload error:", error);
        },
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (images.length + acceptedFiles.length > maxUploads) {
            setError(`You can only upload up to ${maxUploads} images.`);
            return;
        }

        setError(null);
        const newImages = acceptedFiles.map((file) => ({
            id: uuidv4(),
            file,
            status: "pending",
            uploadedurl: "",
        }));

        setImages((prevImages) => [...prevImages, ...newImages]);
        newImages.forEach((image) => uploadImageMutation.mutate(image));
    }, [images]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "image/*": [] } });

    const handleDelete = (image: { id: string }) => {
        setImages((prevImages) => prevImages.filter((img) => img.id !== image.id));
        setError(null);
    };

    return (
        <div>
            <div className="text-sm text-center mb-1">
                You can upload upto {maxUploads} images
            </div>
            <div
              
                {...getRootProps()}
                className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer overflow-y-auto"
            >
                <input {...getInputProps()} />
                {images.length === 0 ? (
                    <p className="text-gray-500">Click to select images or drag and drop</p>
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        {images.map((image) => (
                            <div key={image.id} className="relative group">
                                <img
                                    src={URL.createObjectURL(image.file)}
                                    alt="Preview"
                                    className={`h-20 w-20 object-cover rounded-lg shadow-md ${image.status === "error" ? "opacity-50" : ""}`}
                                />
                                {image.status === "pending" && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-lg">
                                        <div className="loader border-t-transparent border-4 border-white rounded-full w-6 h-6 animate-spin"></div>
                                    </div>
                                )}
                                {image.status === "uploaded" && (
                                    <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-1 text-xs">✓</div>
                                )}
                                {image.status === "error" && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 rounded-lg">
                                        <p className="text-red-500 text-xs mb-2">Failed to upload</p>
                                    </div>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(image);
                                    }}
                                    className="absolute bottom-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}

export default ImageUploadContainer;
