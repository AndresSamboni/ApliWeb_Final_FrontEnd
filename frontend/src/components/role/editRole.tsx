import { fetchData } from "../../api/backend.api";
import { useEffect, useState } from "react";
import { RoleInterface } from "../../interfaces/role.interface";
import { RoleModel } from "../../model/role.model";
import ModalEdit from "../modal/modalEdit";

function EditRole({ open, close, id, onEdit, onExists, setId }: { open: boolean, close: () => void, id: number, onEdit: () => void, onExists: () => void, setId: (id: number) => void }) {
    // RESPONSE TYPE
    const responseType = {
        1: 'Role already exists and it is active',
        2: 'Role already exists and it is inactive',
        3: 'Role updated successfully'
    };

    // SAVE THE INFORMATION
    const [role, setRole] = useState([] as RoleInterface[]);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [response, setResponse] = useState({ message: '', error: '', id_role: 0 });

    // GET THE RESPONSE TO THE UPDATE
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await RoleModel.validate({ name });
            const data = { "name": name };
            await fetchData(`/role/update/${id}`, setResponse, data);
        } catch (e) {
            const ERR = e as Error;
            setError(ERR.message);
        }
    };

    // GET THE ROLE INFORMATION TO EDIT
    useEffect(() => {
        fetchData(`/role/${id}`, setRole);
    }, [setRole, id]);

    // GET THE NAME ROLE
    useEffect(() => {
        setName(role[0]?.name || '');
    }, [setName, role]);


    // EVALUATE THE RESPONSE
    useEffect(() => {
        if (response.message === responseType[1]) {
            setError(response.message);
        } else if (response.message === responseType[2]) {
            // EXISTING ROLE
            setId(response.id_role);
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
                title: 'Modificar Datos del Rol',
                field: 'Nombre del Rol',
                buttonYes: 'Actualizar Datos del Rol',
                buttonNo: 'Cancelar'

            }}
        />
    );
}

export default EditRole;