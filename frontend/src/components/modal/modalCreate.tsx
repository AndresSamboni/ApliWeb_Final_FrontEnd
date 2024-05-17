// IMPORT REACT ICONS
import { IoIosCloseCircleOutline } from "react-icons/io";

// IMPORT MODAL PROPIERTIES
import { ModalCreateProps } from "../../interfaces/modalProps";

// IMPORT CSS STYLES
import "../../styles/modalCreateRole.css";

// CREATE THE MODAL COMPONENT
function ModalCreate({ isOpen, closeModal, submit, name, setName, error, setError, content }: Readonly<ModalCreateProps>) {
    // VALIDATE THE SUBMIT FUNCTION
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit();
    }

    // VALIDATE IF THE MODAL IS OPEN
    if (!isOpen) {
        return null;
    }
    // PRESENTATION OF THE MODAL
    return (
        //MAIN CONTAINER
        <article className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <section className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                {/* MODAL CONTAINER */}
                <article className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

                    {/* HEADER CONTAINER */}
                    <header className="bg-white">
                        <section className="flex justify-end w-full" onClick={closeModal}>
                            <button><IoIosCloseCircleOutline size={40} /></button>
                        </section>
                    </header>

                    {/* BODY CONTENT */}
                    <form onSubmit={onSubmit}>
                        <main className="flex flex-col w-full px-4 space-y-10">
                            <section className="sm:flex sm:items-start justify-center">
                                <h1 className="text-xl font-semibold leading-6 text-center text-title" id="modal-title">{content.title}</h1>
                            </section>
                            <section className="relative">
                                <input type="text" name="name" id="name" className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`} value={name} onChange={e => { setName(e.target.value); setError(''); }} placeholder=" " />
                                <label htmlFor="name" className={`absolute top-2 left-2 mt-1 ml-2 transition-all duration-200 ease-in-out pointer-events-none text-sm font-medium ${name ? 'text-content transform -translate-y-2 text-xs' : 'text-content'}`}>{content.field}</label>
                                <section className="text-center">
                                    <p className={`text-red-500 ${error ? '' : 'invisible'}`}>{error || 'Placeholder'}</p>
                                </section>
                            </section>
                        </main>

                        {/* FOOTER CONTENT */}
                        <footer className="flex justify-center bg-gray-50 px-4 py-3 sm:px-6 sm:flex-row-reverse">
                            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
                                {content.buttonNo}
                            </button>
                            <button type="submit" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-submit text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                {content.buttonYes}
                            </button>
                        </footer>
                    </form>
                </article>
            </section>
        </article>
    );
}

// EXPORT THE COMPONENT
export default ModalCreate;