import { useState, useEffect } from "react";
import { fetchData } from "../../api/backend.api";

interface DeleteUserProps {
    open: boolean; // Whether the modal is open
    close: () => void; // Function to close the modal
    userId: number; // ID of the user to be deleted
    onDelete: () => void; // Function to call when the user is deleted
}

const responseType = "User disable successfully"; // Expected response message for successful deletion

function DeleteUser({ open, close, userId, onDelete }: DeleteUserProps) {
    const [error, setError] = useState<string | null>(null); // State to store any error messages
    const [response, setResponse] = useState({ message: '', error: '' }); // State to store the response from the server
    const [isDeleting, setIsDeleting] = useState<boolean>(false); // State to indicate if the deletion is in progress

    // Function to submit the deletion request
    const submitInfo = async () => {
        try {
            setIsDeleting(true); // Indicate that deletion is in progress
            await fetchData(`/user/disable/${userId}`, setResponse); // Send request to disable user
        } catch (error) {
            const ERR = error as Error;
            setError(ERR.message); // Set error message if request fails
        }
    };

    // Effect to handle response after deletion request
    useEffect(() => {
        if (response.message === responseType) {
            onDelete(); // Call onDelete function if deletion was successful
            close(); // Close the modal
        } else if (response.message) {
            setError(response.message); // Set error message if there was an issue
        }
    }, [response]);

    // Return null if the modal is not open
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-bold mb-4">¿Estás seguro de eliminar el usuario?</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="flex items-center justify-center mt-4">
                    {!isDeleting ? (
                        <>
                            <button
                                onClick={submitInfo}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Si, borrar
                            </button>
                            <button
                                onClick={close}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                            >
                                No, conservar
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={close}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cerrar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DeleteUser;
