import { useEffect, useState } from "react";
import { fetchData } from "../../api/backend.api";
import ModalDelete from "../modal/modalDelete";

function DeleteDocument({ open, close, id, onDelete }: { open: boolean, close: () => void, id: number, onDelete: () => void }) {
    const responseType = 'Document disable successfully';
    const [error, setError] = useState('');
    const [response, setResponse] = useState({ message: '', error: '' });
    const submitInfo = async () => {
        try {
            await fetchData(`/document/disable/${id}`, setResponse);
        } catch (error) {
            const ERR = error as Error;
            setError(ERR.message);
        }
    }
    useEffect(() => {
        if (response.message === responseType) {
            onDelete();
            close();
        } else {
            setError(response.message);
        }
    }, [response]);
    if (!open) {
        return null;
    }
    return (
        <ModalDelete
            isOpen={open}
            closeModal={close}
            submit={submitInfo}
            error={error}
            content={{
                title: "¿Estás seguro de eliminar el documento?",
                buttonYes: "Si, borrar",
                buttonNo: "No, conservar"
            }}
        />
    );
}

export default DeleteDocument;