// IMPORT API LIBRARY
import { fetchData } from "../../api/backend.api";

// IMPORT INTERFACE TO CONTROL THE MODAL ACTIONS
import { useState } from "react";
import { ModalProps } from "../../interfaces/modalProps";

// IMPORT THE ROLE MODEL
import { RoleModel } from "./role.model";

// IMPORT CSS STYLES
import "../../styles/modalCreateRole.css";

// CREATE THE MODAL CREATE ROL COMPONENT
function ModalCreateRol({ isOpen, closeModal, onRoleCreated }: Readonly<ModalProps>) {
    // SAVE THE INFORMATION AND THE ERROR MESSAGE
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [response, setResponse] = useState({ message: '', error: '' });

    // FUNCTION TO SUBMIT INFORMATION
    const submitInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // VALIDATE THE INFORMATION
            await RoleModel.validate({ name });

            // CREATE THE JSON DATA
            const formData = { "name": name };
            // TRY CREATE THE NEW ROLE
            console.log('voy bien antes');
            await fetchData('/role/create', setResponse, formData);
            console.log('voy bien despues');
            if (response.message === "Role already exists and it is active") {
                setError(response.message);
            } else if (response.message === "Role already exists and it is inactive") {
                setError(response.message);
            } else if (response.message === 'Role created successfully') {
                // CALL onRoleCreated AFTER CREATING A NEW ROLE
                onRoleCreated();
            } else {
                setError(response.message);
            }
        }
        catch (error) {
            const ERR = error as Error;
            setError(ERR.message);
        }
    };

    // VALIDATE THAT THE MODAL IS OPEN
    if (!isOpen) {
        return null;
    }

    // PRESENTATION OF THE MODAL
    return (
        // MAIN CONTAINER
        <article className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <section className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                {/* MODAL CONTAINER */}
                <article className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

                    {/* HEADER CONTAINER */}
                    <header className="bg-white p-6 sm:p-4">
                        <section className="sm:flex sm:items-start justify-center">
                            <h1 className="text-xl font-semibold leading-6 text-center text-title" id="modal-title">Crear Nuevo Rol</h1>
                        </section>
                    </header>

                    {/* BODY CONTENT */}
                    <form onSubmit={submitInfo}>
                        <main className="flex flex-col w-full p-4">
                            <section className="relative">
                                <input type="text" name="name" id="name" className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`} value={name} onChange={e => { setName(e.target.value); setError(''); }} placeholder=" " />
                                <label htmlFor="name" className={`absolute top-2 left-2 mt-1 ml-2 transition-all duration-200 ease-in-out pointer-events-none text-sm font-medium ${name ? 'text-content transform -translate-y-2 text-xs' : 'text-content'}`}>Nombre del Rol</label>
                                <section className="text-center">
                                    <p className={`text-red-500 ${error ? '' : 'invisible'}`}>{error || 'Placeholder'}</p>
                                </section>
                            </section>
                        </main>

                        {/* FOOTER CONTENT */}
                        <footer className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
                                Cerrar
                            </button>
                            <button type="submit" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-submit text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Crear Rol
                            </button>
                        </footer>
                    </form>
                </article>
            </section>
        </article>
    );
}

export default ModalCreateRol;
