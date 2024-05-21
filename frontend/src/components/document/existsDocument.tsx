import { useEffect, useState } from "react";
import { fetchData } from "../../api/backend.api";
import ModalExists from "../modal/modalExists";

function ExistsDocument({ open, close, id, onExists }: { open: boolean, close: () => void, id: number, onExists: () => void }) {
    const responseType = 'Gender enable successfully';
    const [error, setError] = useState('');
    const [response, setResponse] = useState({ message: '', error: '' });
    const submitInfo = async () => {
        try {
            // TRY ENABLE ROLE
            await fetchData(`/document/enable/${id}`, setResponse);
        } catch (error) {
            const ERR = error as Error;
            setError(ERR.message);
        }
    };
    useEffect(() => {
        if (response.message === responseType) {
            close();
            onExists();
        } else {
            setError(response.message);
        }
    }, [response]);
    if (!open) {
        return null;
    }
    return (
        <ModalExists
            isOpen={open}
            closeModal={close}
            submit={submitInfo}
            error={error}
            content={{
                title: "¿Estás seguro de habilitar el documento?",
                buttonYes: "Si, habilitar",
                buttonNo: "No habilitar"
            }}
        />
    );
}

export default ExistsDocument;