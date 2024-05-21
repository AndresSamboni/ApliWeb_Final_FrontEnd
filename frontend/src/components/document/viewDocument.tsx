import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { DocumentInterface } from "../../interfaces/documentProps.interface";
import { fetchData } from "../../api/backend.api";

function ViewDocument({ open, close, id }: { open: boolean; close: () => void; id: number; }) {
    const [document, setDocument] = useState([] as DocumentInterface[]);

    useEffect(() => {
        fetchData(`/document/${id}`, setDocument);
        console.log(document);
    }, [setDocument, id]);

    if (!open) {
        return null;
    }

    return (
        <article className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <section className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                {/* MODAL CONTAINER */}
                <article className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

                    {/* HEADER CONTAINER */}
                    <header className="bg-white">
                        <section className="flex justify-end w-full" onClick={close}>
                            <button><IoIosCloseCircleOutline size={40} /></button>
                        </section>
                    </header>

                    {/* BODY CONTENT */}
                    <main className="flex flex-col w-full space-y-4">
                        <section className="sm:flex sm:items-start justify-center">
                            <h3 className="text-2xl font-semibold text-center text-title px-1 mx-1 sm:mx-4 sm:px-4" id="modal-title">Información de Documento </h3>
                        </section>
                        {document.map((item) => (
                            <section key={item.id} className="pb-5 px-1 m-1 sm:m-4 sm:px-4">
                                <p className="text-content text-lg"><strong>Nombre:</strong> {item.name}</p>
                                <p className="text-content text-lg"><strong>Estado:</strong> {item.state ? 'Activo' : 'Inactivo'}</p>
                                <p className="text-content text-lg"><strong>Fecha de Creacipon:</strong> {item.start_date.split('T')[0]}</p>
                                <p className="text-content text-lg"><strong>Fecha de Ultima Modificación:</strong> {item.modify_date.split('T')[0]}</p>
                                <p className="text-content text-lg"><strong>Fecha de Ultima Deshabilitación:</strong> {item.delete_date.split('T')[0]}</p>
                                <p className="text-content text-lg"><strong>Responsable:</strong> {item.user}</p>

                            </section>
                        ))}
                    </main>
                </article>
            </section>
        </article>
    );
}

export default ViewDocument;