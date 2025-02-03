import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

interface CustomButtonProps {
    conditionvalue :boolean
    onClick: () => void;
    buttonText: string;
    alertMessage: string; // Alert message passed as prop
}

const CustomButton: React.FC<CustomButtonProps> = ({conditionvalue , onClick, buttonText, alertMessage }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleonclick = () => {
        if (!conditionvalue) {
         onClick()
        }
        else {
            setOpenSnackbar(true)
        }
    }
    return (
        <div>
            <button
                className="w-full py-3 mt-4 bg-gradient-to-r from-blue-500 to-red-400 text-white font-bold rounded-lg shadow-lg hover:from-blue-600  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={handleonclick}
            >
                {buttonText}
            </button>

            {/* Snackbar Notification */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert severity="warning" onClose={() => setOpenSnackbar(false)}>
                    {alertMessage} {/* Show custom alert message */}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CustomButton;
