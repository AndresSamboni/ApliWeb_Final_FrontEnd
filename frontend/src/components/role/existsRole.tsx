// IMPORT API CONNECTION
import { fetchData } from "../../api/backend.api";

// IMPORT REACT LIBRARIES AND COMPONENTS
import { useEffect, useState } from "react";
import ModalExists from "../modal/modalExists";

// CREATE THE ExistsRole COMPONENT
function ExistsRole({ open, close, id, onExists }: { open: boolean, close: () => void, id: number, onExists: () => void }) {
    // RESPONSE TYPE
    const responseType = 'Role enable successfully';

    // SAVE THE INFORMATION
    const [error, setError] = useState('');
    const [response, setResponse] = useState({ message: '', error: '' });

    // FUNCTION TO SUBMIT THE INFORMATION
    const submitInfo = async () => {
        try {
            // TRY ENABLE ROLE
            await fetchData(`/role/enable/${id}`, setResponse);
        } catch (error) {
            const ERR = error as Error;
            setError(ERR.message);
        }
    };

    // USE EFFECT TO OBTAIN THE RESPONSE
    useEffect(() => {
        if (response.message === responseType) {
            close();
            onExists();
        } else {
            setError(response.message);
        }
    }, [response]);

    // VALIDATE THE OPEN MODAL
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
                title: "¿Estás seguro de habilitar el rol?",
                buttonYes: "Si, habilitar",
                buttonNo: "No habilitar"
            }}
        />
    );
}

//EXPORT THE EXISTS ROLE COMPONENT
export default ExistsRole;