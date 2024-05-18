// IMPORT REACT LIBRARIES AND COMPONENTS
import { useEffect, useState } from "react";
import Table from "../table/table"
import CreateGender from "./createGender";
import EditGender from "./editGender";
import ViewGender from "./viewGender";
import DeleteGender from "./deleteGender";
import ExistsRole from "./existsGender";

// IMPORT THE FETCH DATA FUNCTION
import { fetchData } from "../../api/backend.api";

// IMPORT THE GENDER INTERFACE
import { GenderInterface } from "../../interfaces/genderProps.interface";


//CREATION OF THE ROLE COMPONENT
function GestionGender() {
    // DEFINITION OF THE HEADER OPTION TABLE
    const options = [
        "Identificador de Género",
        "Nombre del Género",
        "Acciones"
    ];

    // STATE TO CONTROL THE ROLE PRESENTATION
    const [genders, setGenders] = useState([] as GenderInterface[]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isExistsOpen, setIsExistsOpen] = useState(false);
    const [id, setId] = useState(0);

    // DEFINITION OF THE OPEN AND CLOSE FUNCTIONS
    const openCreate = () => {
        setIsCreateOpen(true);
    };
    const closeCreate = () => {
        setIsCreateOpen(false);
    };
    const openView = () => {
        setIsViewOpen(true);
    };
    const closeView = () => {
        setIsViewOpen(false);
    };
    const openEdit = () => {
        setIsEditOpen(true);
    };
    const closeEdit = () => {
        setIsEditOpen(false);
    };
    const openDelete = () => {
        setIsDeleteOpen(true);
    };
    const closeDelete = () => {
        setIsDeleteOpen(false);
    };
    const openExists = () => {
        setIsExistsOpen(true);
    };
    const closeExists = () => {
        setIsExistsOpen(false);
    };

    // FUNCTION TO FETCH genders
    const fetchGenders = async () => {
        await fetchData("/genders", setGenders);
    };
    // USE EFFECT TO GET THE DATA TABLE
    useEffect(() => {
        fetchGenders();
    }, []);

    // PRESENTATION OF THE ROLE TABLE
    return (
        <>
            <section className="p-2 my-4 space-y-2 w-full">
                <h1 className="text-2xl font-semibold text-center text-title">
                    <strong>Gestión de Géneros</strong>
                </h1>
                <div className="flex justify-center">
                    <section className="flex justify-end w-3/4">
                        <button onClick={openCreate} className="m-o p-2 rounded-lg bg-submit hover:bg-green-700 text-white">
                            Crear Género
                        </button>
                    </section>
                </div>
                <section className="flex justify-center">
                    <article className="relative overflow-x-auto rounded-lg w-3/4">
                        <Table
                            headerOptions={options}
                            dataTable={genders}
                            setId={setId}
                            onView={openView}
                            onModify={openEdit}
                            onDelete={openDelete} />
                    </article>
                </section>
            </section>
            <CreateGender open={isCreateOpen} close={closeCreate} onCreated={fetchGenders} onExists={openExists} setId={setId} />
            <ViewGender open={isViewOpen} close={closeView} id={id} />
            <EditGender open={isEditOpen} close={closeEdit} id={id} onEdit={fetchGenders} onExists={openExists} setId={setId} />
            <DeleteGender open={isDeleteOpen} close={closeDelete} id={id} onDelete={fetchGenders} />
            <ExistsRole open={isExistsOpen} close={closeExists} id={id} onExists={fetchGenders} />
        </>
    );
}

// EXPORT THE COMPONENT
export default GestionGender;