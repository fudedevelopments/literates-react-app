import { useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateBestseller: React.FC = () => {
    const { productid, bestseller } = useParams<{ productid: string; bestseller: string }>();
    const [bestsellerStatus, setBestsellerStatus] = useState<boolean>(bestseller === "true");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem("token");

    const updateBestseller = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.put(`https://workers.literatesartemporium.in/product/${productid}/bestseller`,
                { bestseller: bestsellerStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Bestseller status updated successfully");
        } catch (err) {
            setError("Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 w-full max-w-md mx-auto mt-10 border rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Bestseller Status</h2>
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="checkbox"
                    checked={bestsellerStatus}
                    onChange={(e) => setBestsellerStatus(e.target.checked)}
                    className="w-5 h-5"
                />
                <span>{bestsellerStatus ? "Yes" : "No"}</span>
            </div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button
                onClick={updateBestseller}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            >
                {loading ? "Saving..." : "Save"}
            </button>
        </div>
    );
};

export default UpdateBestseller;
