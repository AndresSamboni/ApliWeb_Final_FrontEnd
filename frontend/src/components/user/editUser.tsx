import { useState, useEffect } from "react";
import { UserInterface } from "../../interfaces/userProps.interface";
import { fetchData } from "../../api/backend.api";

interface EditUserProps {
    open: boolean;
    close: () => void;
    userId: number;
    onEdit: () => void;
    onExists: () => void;
    setId: (id: number) => void;
}

// Define response messages
const responseType = {
    1: 'User already exists and it is active',
    2: 'User already exists and it is inactive',
    3: 'User updated successfully'
};

function EditUser({ open, close, userId, onEdit, onExists, setId }: EditUserProps) {
    const [user, setUser] = useState<UserInterface | null>(null);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [gender, setGender] = useState('');
    const [documentTypes, setDocumentTypes] = useState<{ id: number, name: string }[]>([]);
    const [genders, setGenders] = useState<{ id: number, name: string }[]>([]);
    const [error, setError] = useState('');
    const [response, setResponse] = useState({ message: '', error: '', id_user: 0 });

    // Handle form submission to update user
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = { name, last_name: lastName, email, phone, birthdate, document_id_fk: documentType, gender_id_fk: gender };
            await fetchData(`/user/update/${userId}`, setResponse, data);
        } catch (e) {
            const ERR = e as Error;
            setError(ERR.message);
        }
    };

    // Fetch user details, document types, and genders when component mounts or userId changes
    useEffect(() => {
        fetchData(`/user/${userId}`, setUser);
        fetchData(`/documents`, setDocumentTypes);
        fetchData(`/genders`, setGenders);
    }, [setUser, userId]);

    // Populate form fields with user data when user object changes
    useEffect(() => {
        if (user) {
            setName(user.name);
            setLastName(user.last_name || '');
            setEmail(user.email);
            setPhone(user.phone ? user.phone.toString() : '');
            setBirthdate(user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : '');
            setDocumentType(user.document_id_fk ? user.document_id_fk.toString() : '');
            setGender(user.gender_id_fk ? user.gender_id_fk.toString() : '');
        }
    }, [user]);

    // Handle response after submitting the form
    useEffect(() => {
        if (response.message === responseType[1]) {
            setError(response.message);
        } else if (response.message === responseType[2]) {
            setId(response.id_user);
            setError('');
            close();
            onExists();
        } else if (response.message === responseType[3]) {
            setError('');
            setId(0);
            close();
            onEdit();
        } else {
            setError(response.message);
        }
    }, [response]);

    // Close modal and reset ID
    const closeModal = () => {
        setId(0);
        close();
    };

    // Return null if modal is not open
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-bold mb-4">Editar Usuario</h2>
                <form onSubmit={submit}>
                    {/* Form fields */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Apellido</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de Documento</label>
                        <select
                            value={documentType}
                            onChange={(e) => setDocumentType(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Seleccione un tipo de documento</option>
                            {documentTypes.map(doc => (
                                <option key={doc.id} value={doc.id}>{doc.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Género</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Seleccione un género</option>
                            {genders.map(g => (
                                <option key={g.id} value={g.id}>{g.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
                {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
            </div>
        </div>
    );
}

export default EditUser;
