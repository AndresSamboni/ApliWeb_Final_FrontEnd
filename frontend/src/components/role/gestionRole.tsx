// IMPORT REACT LIBRARIES AND COMPONENTS
import { useEffect, useState } from "react";
import Table from "../table/table"
import CreateRol from "./createRol";
import EditRole from "./editRole";
import ViewRole from "./viewRole";
import DeleteRole from "./deleteRole";

// IMPORT THE FETCH DATA FUNCTION
import { fetchData } from "../../api/backend.api";

// IMPORT THE ROLE INTERFACE
import { RoleInterface } from "../../interfaces/role.interface";


//CREATION OF THE ROLE COMPONENT
function GestionRole() {
    // DEFINITION OF THE HEADER OPTION TABLE
    const options = [
        "Identificador de Rol",
        "Nombre del Rol",
        "Acciones"
    ];

    // STATE TO CONTROL THE ROLE PRESENTATION
    const [roles, setRoles] = useState([] as RoleInterface[]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [id, setId] = useState(0);

    // DEFINITION OF THE OPEN AND CLOSE FUNCTIONS
    const openCreate = () => {
        setIsCreateOpen(true);
    }
    const closeCreate = () => {
        setIsCreateOpen(false);
    }
    const openView = () => {
        setIsViewOpen(true);
    }
    const closeView = () => {
        setIsViewOpen(false);
    }
    const openEdit = () => {
        setIsEditOpen(true);
    }
    const closeEdit = () => {
        setIsEditOpen(false);
    }
    const openDelete = () => {
        setIsDeleteOpen(true);
    }
    const closeDelete = () => {
        setIsDeleteOpen(false);
    }

    // FUNCTION TO FETCH ROLES
    const fetchRoles = async () => {
        await fetchData("/roles", setRoles);
    };
    // USE EFFECT TO GET THE DATA TABLE
    useEffect(() => {
        fetchRoles();
    }, []);

    // PRESENTATION OF THE ROLE TABLE
    return (
        <>
            <section className="p-2 my-4 space-y-2 w-full">
                <h1 className="text-2xl font-semibold text-center text-title">
                    <strong>Gestión de Roles</strong>
                </h1>
                <div className="flex justify-center">
                    <section className="flex justify-end w-3/4">
                        <button onClick={openCreate} className="m-o p-2 rounded-lg bg-submit hover:bg-green-700 text-white">
                            Crear Rol
                        </button>
                    </section>
                </div>
                <section className="flex justify-center">
                    <article className="relative overflow-x-auto rounded-lg w-3/4">
                        <Table
                            headerOptions={options}
                            dataTable={roles}
                            setId={setId}
                            onView={openView}
                            onModify={openEdit}
                            onDelete={openDelete} />
                    </article>
                </section>
            </section>
            <CreateRol open={isCreateOpen} close={closeCreate} onCreated={fetchRoles} />
            <ViewRole open={isViewOpen} close={closeView} id={id} />
            <EditRole open={isEditOpen} close={closeEdit} id={id} onEdit={fetchRoles} />
            <DeleteRole open={isDeleteOpen} close={closeDelete} id={id} onDelete={fetchRoles} />
        </>
    );
}

// EXPORT THE COMPONENT
export default GestionRole;