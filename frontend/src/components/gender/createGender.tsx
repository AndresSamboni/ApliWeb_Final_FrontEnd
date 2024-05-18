// IMPORT THE API CONNECTION
import { fetchData } from "../../api/backend.api";

// IMPORT REACT LIBRARIES AND COMPONENTS
import { useEffect, useState } from "react";
import ModalCreate from "../modal/modalCreate";

// IMPORT THE GENDER MODEL
import { GenderModel } from "../../model/gender.model";

// CREATE THE CreateGender COMPONENT
function CreateGender({ open, close, onCreated, onExists, setId }: { open: boolean, close: () => void, onCreated: () => void, onExists: () => void, setId: (id: number) => void }) {
    // RESPONSE TYPE
    const responseType = {
        1: "Gender already exists and it is active",
        2: "Gender already exists and it is inactive",
        3: "Gender created successfully"
    };

    // SAVE THE INFORMATION TO VALIDATE THE gender CREATION
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [response, setResponse] = useState({ message: '', error: '', id_gender: 0 });

    // FUNCTION TO SUBMIT INFORMATION
    const submitInfo = async () => {
        try {
            // VALIDATE THE INFORMATION
            await GenderModel.validate({ name });

            // CREATE THE JSON DATA
            const formData = { "name": name };

            // TRY CREATE THE NEW ROLE
            await fetchData('/gender/create', setResponse, formData);
        } catch (error) {
            const ERR = error as Error;
            setError(ERR.message);
        }
    };

    // USE EFFECT TO OBTAIN THE RESPONSE
    useEffect(() => {
        if (response.message === responseType[1]) {
            setError('El género ya existe y se encuentra activo');
        } else if (response.message === responseType[2]) {
            setId(response.id_gender);
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
                title: 'Crear Nuevo Género',
                field: 'Nombre del Género',
                buttonYes: 'Crear Género',
                buttonNo: 'Cancelar'
            }}
        />
    );
}

//EXPORT THE COMPONENT
export default CreateGender;