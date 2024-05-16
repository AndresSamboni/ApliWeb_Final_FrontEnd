// IMPORT REACT LIBRARIES
import { Trash2, Edit, Eye } from "react-feather";
import { useEffect, useState } from "react";

// IMPORT REACT COMPONENTS
import ModalCreateRol from "./modalCreateRole";

// IMPORT THE FETCH DATA FUNCTION
import { fetchData } from "../../api/backend.api";

// IMPORT THE ROLE INTERFACE
import { RoleInterface } from "../../interfaces/role.interface";


//CREATE THE ROLE COMPONENT
function GestionRole() {
    // STATE TO CONTROL IF THE MODAL IS OPEN OR NOT
    const [isModalOpen, setIsModalOpen] = useState(false);

    // STATE TO CONTROL THE ROLE DATA TABLE
    const [roles, setRoles] = useState([] as RoleInterface[]);

    // DEFINITION OF THE OPEN AND CLOSE FUNCTIONS
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // USE EFFECT TO GET THE DATA TABLE
    useEffect(() => {
        fetchData("/roles", setRoles);
    }, [setRoles]);

    // PRESENTATION OF THE ROLE TABLE
    return (
        <section className="flex flex-col p-2 my-4 space-y-2 w-full">
            <article className="flex flex-col text-center">
                <h1 className="text-2xl text-title">
                    <strong>Gestión de Roles</strong>
                </h1>
            </article>
            <section className="flex justify-end">
                <button type="button" className="m-0 p-2 rounded-lg bg-submit text-white" onClick={openModal}>
                    Crear Rol
                </button>
            </section>
            <article className="relative overflow-x-auto rounded-lg w-full">
                <table className="w-full text center text-content">
                    <thead className="text-xl text-title ">
                        <tr className="text-center">
                            <th className="p-2">Identificador de Rol</th>
                            <th className="p-2">Nombre del Rol</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role, index) => (
                            <tr key={index} className="text-center">
                                <td className="p-2">{role.id}</td>
                                <td className="p-2">{role.name}</td>
                                <td className="p-2">
                                    <button className="bg-gray-300 hover:bg-gray-400 text-info font-bold py-2 px-4 rounded">
                                        <Eye size={16} />
                                    </button>
                                    <button className="bg-blue-300 hover:bg-blue-400 text-modify font-bold py-2 px-4 rounded">
                                        <Edit size={16} />
                                    </button>
                                    <button className="bg-red-300 hover:bg-red-400 text-delete font-bold py-2 px-4 rounded">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </article>
            <ModalCreateRol isOpen={isModalOpen} closeModal={closeModal} />
        </section>
    );
}

//EXPORT THE COMPONENT
export default GestionRole;
