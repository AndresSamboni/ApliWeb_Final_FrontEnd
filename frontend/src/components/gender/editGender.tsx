import { fetchData } from "../../api/backend.api";
import { useEffect, useState } from "react";
import { GenderInterface } from "../../interfaces/genderProps.interface";
import { GenderModel } from "../../model/gender.model";
import ModalEdit from "../modal/modalEdit";

function EditGender({ open, close, id, onEdit, onExists, setId }: { open: boolean, close: () => void, id: number, onEdit: () => void, onExists: () => void, setId: (id: number) => void }) {
    // RESPONSE TYPE
    const responseType = {
        1: 'Gender already exists and it is active',
        2: 'Gender already exists and it is inactive',
        3: 'Gender updated successfully'
    };

    // SAVE THE INFORMATION
    const [gender, setGender] = useState([] as GenderInterface[]);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [response, setResponse] = useState({ message: '', error: '', id_gender: 0 });

    // GET THE RESPONSE TO THE UPDATE
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await GenderModel.validate({ name });
            const data = { "name": name };
            await fetchData(`/gender/update/${id}`, setResponse, data);
        } catch (e) {
            const ERR = e as Error;
            setError(ERR.message);
        }
    };

    // GET THE GENDER INFORMATION TO EDIT
    useEffect(() => {
        fetchData(`/gender/${id}`, setGender);
    }, [setGender, id]);

    // GET THE NAME GENDER
    useEffect(() => {
        setName(gender[0]?.name || '');
    }, [setName, gender]);


    // EVALUATE THE RESPONSE
    useEffect(() => {
        if (response.message === responseType[1]) {
            setError(response.message);
        } else if (response.message === responseType[2]) {
            // EXISTING GENDER
            setId(response.id_gender);
            setError('');
            close();
            onExists();
        } else if (response.message === responseType[3]) {
            // CORRECT UPDATE
            setError('');
            setId(0);
            close();
            onEdit();
        } else {
            setError(response.message);
        }
    }, [response]);

    //CLOSE MODAL FUNCTION
    const closeModal = async () => {
        setId(0);
        close();
    };

    // VALIDATE IF MODAL IS OPEN
    if (!open) {
        return null;
    }
    return (
        <ModalEdit
            isOpen={open}
            closeModal={closeModal}
            submit={submit}
            name={name}
            setName={setName}
            error={error}
            setError={setError}
            content={{
                title: 'Modificar Datos del Género',
                field: 'Nombre del Género',
                buttonYes: 'Actualizar Datos del Género',
                buttonNo: 'Cancelar'

            }}
        />
    );
}

export default EditGender;