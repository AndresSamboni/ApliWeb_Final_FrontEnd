// IMPORT THE API CONNECTION
import { fetchData } from "../../api/backend.api";

// IMPORT REACT LIBRARIES AND COMPONENTS
import { useEffect, useState } from "react";
import ModalCreate from "../modal/modalCreate";

// IMPORT THE ROLE MODEL
import { RoleModel } from "../../model/role.model";

// CREATE THE createRol COMPONENT
function CreateRole({ open, close, onCreated, onExists, setId }: { open: boolean, close: () => void, onCreated: () => void, onExists: () => void, setId: (id: number) => void }) {
    // RESPONSE TYPE
    const responseType = {
        1: "Role already exists and it is active",
        2: "Role already exists and it is inactive",
        3: "Role created successfully"
    };

    // SAVE THE INFORMATION TO VALIDATE THE ROL CREATION
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [response, setResponse] = useState({ message: '', error: '', id_role: 0 });

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
            setId(response.id_role);
            onExists();
            close();
        } else if (response.message === responseType[3]) {
            onCreated();
            close();
        } else {
            setError(response.message);
        }
    }, [response, setError]);

    // VALIDATE THE OPEN MODAL
    if (!open) {
        return null;
    }
    return (
        <ModalCreate
            isOpen={open}
            closeModal={close}
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
export default CreateRole;