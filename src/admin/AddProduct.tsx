import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import ImageUploadContainer from "./components/imageuploadcontainer";
import axios from "axios";

const ProductAddPage = () => {
    const navigate = useNavigate();
    const imageUUID = uuidv4();
    const [images, setImages] = useState<string[]>([]);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [description, setDescription] = useState<string>("");
    const [actualPrice, setActualPrice] = useState<number>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const token = localStorage.getItem("token");

    const addProductMutation = useMutation({
        mutationFn: async (product: any) => {
            const response = await axios.post(
                "https://workers.literatesartemporium.in/product",
                 product,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            
            return response.data;
        },
    });

    const handleimagesupload = (updateurls: string[]) => {
        setImages(updateurls);
    }

    const handleAddProduct = async () => {
        setErrorMessage(null);
        if (!name.trim()) {
            setErrorMessage("Product name is required");
            return;
        }
        if (!price) {
            setErrorMessage("Price is required");
            return;
        }
        if (!description.trim()) {
            setErrorMessage("Description is required");
            return;
        }
        if (images.length === 0) {
            setErrorMessage("At least one image is required");
            return;
        }

        const product = {
            id: uuidv4(),
            title: name,
            descriptions: description,
            offerprice: price,
            price: actualPrice,
            images: images
        };

        try {
            await addProductMutation.mutateAsync(product);
            navigate("/admindashboard"); // Navigate to admin dashboard on success
        } catch (error) {
            setErrorMessage("Failed to add product. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-700 mb-6">Add Product</h1>

                <ImageUploadContainer
                    uploadUrl={`https://workers.literatesartemporium.in/images/${imageUUID}`}
                    maxUploads={5}
                    onImagesUpdate={handleimagesupload}/>
                <div className="mt-6 space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter product name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Price</label>
                        <input
                            type="number"
                            value={price?.toString()}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter product price"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Actual Price
                        </label>
                        <input
                            type="number"
                            value={actualPrice?.toString()}
                            onChange={(e) => setActualPrice(Number(e.target.value))}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter actual price"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-28 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter product description"
                        ></textarea>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        onClick={handleAddProduct}
                        className={`w-full py-3 ${addProductMutation.isPending
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
                            } text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400`}
                        disabled={addProductMutation.isPending}
                    >
                        {addProductMutation.isPending ? "Adding Product..." : "Add Product"}
                    </button>
                </div>

                {errorMessage && (
                    <div className="mt-4 text-red-500 text-sm font-medium">{errorMessage}</div>
                )}
            </div>
        </div>
    );
}

export default ProductAddPage;