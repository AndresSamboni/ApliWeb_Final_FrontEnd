// IMPORT THE API CONNECTION
import { fetchData } from "../../api/backend.api";

// IMPORT REACT LIBRARIES AND COMPONENTS
import { useEffect, useState } from "react";
import ModalEdit from "../modal/modalEdit";

// IMPORT THE INTERFACE AND MODEL
import { RoleInterface } from "../../interfaces/role.interface";
import { RoleModel } from "../../model/role.model";

// CREATE EditRole COMPONENT
function EditRole({ open, close, id, onEdit }: { open: boolean, close: () => void, id: number, onEdit: () => void }) {
    // RESPONSE TYPE
    const responseType = {
        1: "Role already exists and it is active",
        2: "Role already exists and it is inactive",
        3: 'Role updated successfully'
    };

    // SAVE THE INFORMATION
    const [role, setRole] = useState([] as RoleInterface[]);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ "name": '' });
    const [response, setResponse] = useState({ message: '', error: '' });

    // FUNCTION TO SUBMIT INFORMATION
    const submitInfo = async (name: string) => {
        try {
            // VALIDATE THE INFORMATION
            await RoleModel.validate({ name });

            // CREATE THE JSON DATA
            setFormData({ "name": name });

            //TRY UPDATE THE ROLE
            await fetchData(`/role/update/${id}`, setResponse, formData);
        } catch (error) {
            const ERR = error as Error;
            setError(ERR.message);
        }
    }

    // USE EFEECT TO OBTAIN THE RESPONSE
    useEffect(() => {
        if (response.message === responseType[1]) {
            setError('El rol ya existe y se encuentra activo');
        } else if (response.message === responseType[2]) {
            setError('El rol ya existe pero se encuentra inactivo');
        } else if (response.message === responseType[3]) {
            onEdit();
            close();
            setRole(prevRole => [{ ...prevRole[0], name: formData.name }]);
        } else {
            setError(response.message);
        }
    }, [response]);

    // FUNCTION TO OBTAIN THE ROLE INFORMATION
    useEffect(() => {
        fetchData(`/role/${id}`, setRole);
        setFormData({ name: role[0]?.name || '' });
    }, [setRole, id]);

    // USE EFFECT TO RESET FORMDATA WHEN MODAL CLOSES
    useEffect(() => {
        if (!open) {
            setFormData({ name: '' });
        }
    }, [open]);

    // VALIDATE IF THE MODAL IS OPEN
    if (!open) {
        return null;
    }

    // PRESENT THE COMPONENT
    return (
        <ModalEdit
            isOpen={open}
            closeModal={close}
            submit={submitInfo}
            initialName={role[0]?.name || ''}
            error={error}
            setError={setError}
            content={{
                title: "Modificar Datos del Rol",
                field: "Nombre del Rol",
                buttonYes: "Actualizar datos del Rol",
                buttonNo: "Cancelar"
            }}
        />
    );
}

// EXPORT EditRole COMPONENT
export default EditRole;