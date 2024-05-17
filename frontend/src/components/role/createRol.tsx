// IMPORT THE API CONNECTION
import { fetchData } from "../../api/backend.api";

// IMPORT REACT LIBRARIES AND COMPONENTS
import { useEffect, useState } from "react";
import ModalCreate from "../modal/modalCreate";

// IMPORT THE ROLE MODEL
import { RoleModel } from "../../model/role.model";

// CREATE THE createRol COMPONENT
function CreateRol({ open, close, onCreated }: { open: boolean, close: () => void, onCreated: () => void }) {
    // RESPONSE TYPE
    const responseType = {
        1: "Role already exists and it is active",
        2: "Role already exists and it is inactive",
        3: "Role created successfully"
    };

    // SAVE THE INFORMATION TO VALIDATE THE ROL CREATION
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [response, setResponse] = useState({ message: '', error: '' });

    // FUNCTION TO MODAL CLOSE
    const closeModal = () => {
        close();
    }

    // FUNCTION TO SUBMIT INFORMATION
    const submitInfo = async () => {
        try {
            // VALIDATE THE INFORMATION
            await RoleModel.validate({ name });

            // CREATE THE JSON DATA
            const formData = { "name": name };

            // TRY CREATE THE NEW ROLE
            await fetchData('/role/create', setResponse, formData);
        } catch (error) {
            const ERR = error as Error;
            setError(ERR.message);
        }
    };

    // USE EFFECT TO OBTAIN THE RESPONSE
    useEffect(() => {
        if (response.message === responseType[1]) {
            setError('El rol ya existe y se encuentra activo');
        } else if (response.message === responseType[2]) {
            setError('El rol ya existe pero se encuentra inactivo');
        } else if (response.message === responseType[3]) {
            onCreated();
            closeModal();
        } else {
            setError(response.message);
        }
    }, [response]);

    // VALIDATE THE OPEN MODAL
    if (!open) {
        return null;
    }
    return (
        <ModalCreate
            isOpen={open}
            closeModal={closeModal}
            submit={submitInfo}
            name={name}
            setName={setName}
            error={error}
            setError={setError}
            content={{
                title: 'Crear Nuevo Rol',
                field: 'Nombre del Rol',
                buttonYes: 'Crear Rol',
                buttonNo: 'Cancelar'
            }}
        />
    );
}

//EXPORT THE COMPONENT
export default CreateRol;