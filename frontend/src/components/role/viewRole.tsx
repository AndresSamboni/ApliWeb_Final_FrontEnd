// IMPORT THE API CONNECTION
import { fetchData } from "../../api/backend.api";

// IMPORT THE ROLE INTERFACE
import { RoleInterface } from "../../interfaces/role.interface";

// IMPORT REACT LIBRARIES AND COMPONENTS
import { useEffect, useState } from "react";
import ModalView from "../modal/modalView";

// CREATE THE ViewRole COMPONENT
function ViewRole({ open, close, id }: { open: boolean; close: () => void; id: number; }) {
    // SAVE THE INFORMATION
    const [role, setRole] = useState([] as RoleInterface[]);

    // FUNCTION TO OBTAIN THE ROLE INFORMATION
    useEffect(() => {
        fetchData(`/role/${id}`, setRole);
    }, [setRole, id]);

    // VALIDATE THE OPEN MODAL
    if (!open) {
        return null;
    }
    // PRESENT THE VIEW COMPONENT
    return (
        <ModalView
            isOpen={open}
            closeModal={close}
            data={role}
            content={{
                title: "Información del rol"
            }}
        />
    );
}

// EXPORT THE COMPONENT
export default ViewRole;