import { Trash2, Edit, Eye } from "react-feather";
import { useEffect, useState } from "react";
import { DocumentInterface } from "../../interfaces/documentProps.interface";
import { fetchData } from "../../api/backend.api";
import ExistsRole from "../role/existsRole";
import CreateDocument from "./createDocument";
import ViewDocument from "./viewDocument";
import DeleteDocument from "./deleteDocument";
import ExistsDocument from "./existsDocument";

function GestionDocument() {
    const options = [
        "Identificador de Documento",
        "Nombre del documento",
        "Fecha de creación",
        "Fecha de última modificación",
        "Fecha de última deshabilitación",
        "Responsable",
        "Acciones"
    ]
    const [documents, setDocuments] = useState([] as DocumentInterface[]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isExistsOpen, setIsExistsOpen] = useState(false);
    const [id, setId] = useState(0);

    const fetchDocuments = async () => {
        await fetchData('/documents', setDocuments);
    };
    useEffect(() => {
        fetchDocuments();
    }, []);

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

    return (
        <>
            <section className="p-2 my-4 space-y-2 w-full">
                <h1 className="text-2xl font-semibold text-center text-title">
                    <strong>Gestión de Documentos</strong>
                </h1>
                <div className="flex justify-center">
                    <section className="flex justify-end w-full">
                        <button onClick={openCreate} className="m-0 p-2 rounded-lg bg-submit hover:bg-green-700 text-white">
                            Crear Documento
                        </button>
                    </section>
                </div>
                <section className="flex justify-center">
                    <article className="relative overflow-x-auto rounded-lg w-full">
                        <table className="w-full">
                            <thead className="bg-white">
                                <tr className="text-center text-lg text-title">
                                    {options.map(option => (
                                        <th key={options.indexOf(option)} className="p-2">{option}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-gray-100">
                                {documents.map(document => (
                                    <tr key={document.id} className="text-center">
                                        <td className="p-2">{document.id}</td>
                                        <td className="p-2">{document.name}</td>
                                        <td className="p-2">{document.start_date ? document.start_date.split('T')[0] : ''}</td>
                                        <td className="p-2">{document.modify_date ? document.modify_date.split('T')[0] : ''}</td>
                                        <td className="p-2">{document.delete_date ? document.delete_date.split('T')[0] : ''}</td>
                                        <td className="p-2">{document.user}</td>
                                        <td className="p-2">
                                            <button
                                                onClick={() => {
                                                    setId(document.id);
                                                    openView();
                                                }}
                                                className="bg-gray-300 hover:bg-gray-400 text-info font-bold py-2 px-4 mx-1 rounded-full">
                                                <Eye size={20} />
                                            </button>
                                            <button
                                                // onClick={() => {
                                                //     setId(data.id);
                                                //     onModify();
                                                // }}
                                                className="bg-blue-300 hover:bg-blue-400 text-modify font-bold py-2 px-4 mx-1 rounded-full">
                                                <Edit size={20} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setId(document.id);
                                                    openDelete();
                                                }}
                                                className="bg-red-300 hover:bg-red-400 text-delete font-bold py-2 px-4 mx-1 rounded-full">
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </article>
                </section>
            </section>
            <CreateDocument open={isCreateOpen} close={closeCreate} onCreated={fetchDocuments} onExists={openExists} setId={setId} />
            <ViewDocument open={isViewOpen} close={closeView} id={id} />
            <DeleteDocument open={isDeleteOpen} close={closeDelete} id={id} onDelete={fetchDocuments} />
            <ExistsDocument open={isExistsOpen} close={closeExists} id={id} onExists={fetchDocuments} />
        </>
    );
}

export default GestionDocument;