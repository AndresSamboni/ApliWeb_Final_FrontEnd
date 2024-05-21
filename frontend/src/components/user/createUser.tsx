import { useState, useEffect } from "react";
import bcrypt from 'bcryptjs';
import { fetchData } from "../../api/backend.api";

interface CreateUserProps {
    open: boolean;
    close: () => void;
    onUserCreated: () => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ open, close, onUserCreated }) => {
    const [documents, setDocuments] = useState<{ id: number, name: string }[]>([]);
    const [genders, setGenders] = useState<{ id: number, name: string }[]>([]);
    const [roles, setRoles] = useState<{ id: number, name: string }[]>([]);
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        name: '',
        last_name: '',
        email: '',
        phone: '',
        birthdate: '',
        document_id_fk: '',
        document_number: '',
        gender_id_fk: '',
        role_id_fk: '',
        user_name: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        fetchData('/documents', setDocuments);
        fetchData('/genders', setGenders);
        fetchData('/roles', setRoles);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const data = {
                ...user,
                password: hashedPassword
            };

            await fetchData('/user/create', (response: any) => {
                if (response.error) {
                    setError(response.error);
                } else {
                    onUserCreated();
                    close();
                }
            }, data); // Pasar sólo 3 argumentos
        } catch (error) {
            setError('Error creating user');
        }
    };

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-md w-11/12 max-w-2xl">
                <h2 className="text-lg font-bold mb-4 text-center">Crear Nuevo Usuario</h2>
                {error && (
                    <p className="text-red-500 text-xs italic mb-4">{error}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de Documento</label>
                            <select
                                name="document_id_fk"
                                value={user.document_id_fk}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="">Seleccione un tipo de documento</option>
                                {documents.map((doc) => (
                                    <option key={doc.id} value={doc.id}>
                                        {doc.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Número de Documento</label>
                            <input
                                type="text"
                                name="document_number"
                                value={user.document_number}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Apellido</label>
                            <input
                                type="text"
                                name="last_name"
                                value={user.last_name}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
                            <input
                                type="text"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Género</label>
                            <select
                                name="gender_id_fk"
                                value={user.gender_id_fk}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="">Seleccione un género</option>
                                {genders.map((gender) => (
                                    <option key={gender.id} value={gender.id}>
                                        {gender.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Fecha de Nacimiento</label>
                            <input
                                type="date"
                                name="birthdate"
                                value={user.birthdate}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Rol</label>
                            <select
                                name="role_id_fk"
                                value={user.role_id_fk}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="">Seleccione un rol</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Nombre de Usuario</label>
                            <input
                                type="text"
                                name="user_name"
                                value={user.user_name}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-blue-500 hover:text-blue-700 focus:outline-none focus:shadow-outline"
                        >
                            {showPassword ? 'Ocultar' : 'Mostrar'} Contraseña
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Crear
                        </button>
                        <button
                            type="button"
                            onClick={close}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
