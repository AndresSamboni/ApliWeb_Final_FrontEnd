// IMPORT THE API CONNECTION
import { fetchData } from "../../api/backend.api";

// IMPORT THE GENDER INTERFACE
import { GenderInterface } from "../../interfaces/genderProps.interface";

// IMPORT REACT LIBRARIES AND COMPONENTS
import { useEffect, useState } from "react";
import ModalView from "../modal/modalView";

// CREATE THE ViewGender COMPONENT
function ViewGender({ open, close, id }: { open: boolean; close: () => void; id: number; }) {
    // SAVE THE INFORMATION
    const [gender, setGender] = useState([] as GenderInterface[]);

    // FUNCTION TO OBTAIN THE GENDER INFORMATION
    useEffect(() => {
        fetchData(`/gender/${id}`, setGender);
    }, [setGender, id]);

    // VALIDATE THE OPEN MODAL
    if (!open) {
        return null;
    }
    // PRESENT THE VIEW COMPONENT
    return (
        <ModalView
            isOpen={open}
            closeModal={close}
            data={gender}
            content={{
                title: "Información del Género"
            }}
        />
    );
}

// EXPORT THE COMPONENT
export default ViewGender;