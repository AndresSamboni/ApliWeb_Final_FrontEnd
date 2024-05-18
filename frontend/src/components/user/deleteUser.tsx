import { useState, useEffect } from "react";
import { fetchData } from "../../api/backend.api";

interface DeleteUserProps {
    open: boolean;
    close: () => void;
    userId: number;
    onDelete: () => void;
}

const responseType = "User disable successfully";

function DeleteUser({ open, close, userId, onDelete }: DeleteUserProps) {
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState({ message: '', error: '' });
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const submitInfo = async () => {
        try {
            setIsDeleting(true);
            await fetchData(`/user/disable/${userId}`, setResponse);
        } catch (error) {
            const ERR = error as Error;
            setError(ERR.message);
        }
    };

    useEffect(() => {
        if (response.message === responseType) {
            onDelete();
            close();
        } else if (response.message) {
            setError(response.message);
        }
    }, [response]);

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
