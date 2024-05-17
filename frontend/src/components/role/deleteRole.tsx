// IMPORT API CONNECTION
import { fetchData } from "../../api/backend.api";

//IMPORT REACT LIBRARIES AND COMPONENTS
import { useEffect, useState } from "react";
import ModalDelete from "../modal/modalDelete";

// CREATE THE DELETE ROLE COMPONENT
function DeleteRole({ open, close, id, onDelete }: { open: boolean, close: () => void, id: number, onDelete: () => void }) {
    // RESPONSE TYPE
    const responseType = "Role disable successfully"

    //SAVE THE INFORMATION
    const [error, setError] = useState('');
    const [response, setResponse] = useState({ message: '', error: '' });


    //FUNCTION TO SUBMIT THE INFORMATION
    const submitInfo = async () => {
        try {
            // TRY DELETE THE ROL
            await fetchData(`/role/disable/${id}`, setResponse);
        } catch (error) {
            const ERR = error as Error;
            setError(ERR.message);
        }
    }

    // USE EFFECT TO OBTAIN THE RESPONSE
    useEffect(() => {
        if (response.message === responseType) {
            onDelete();
            close();
        } else {
            setError(response.message);
        }
    }, [response]);

    // VALIDATE THE OPEN MODAL
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
                title: "¿Estás seguro de eliminar el rol?",
                buttonYes: "Si, borrar",
                buttonNo: "No, conservar"
            }}
        />
    );
}

// EXPORT DELETE COMPONENT
export default DeleteRole;