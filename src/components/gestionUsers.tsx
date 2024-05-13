<link rel="stylesheet" href="https://unpkg.com/feather-icons/dist/feather.css"></link>
import { useState, useEffect } from 'react';
import usersData from './usersEjemplo.json';
import { Trash2, Edit, Eye } from 'react-feather'; // Importar iconos de Feather Icons

// Definir una interfaz para la estructura de los datos de usuario
interface User {
    username: string;
    password: string;
    name: string;
    last_name: string;
    document_type: string;
    document_number: string;
    gender: string;
    email: string;
    phone: string;
    birthDate: string;
    state: boolean;
}

function Gestion() {
    const [modalOpen, setModalOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]); // Tipar la variable users como un array de User

    useEffect(() => {
        // Cargar los datos del archivo JSON
        setUsers(usersData.filter(user => user.state === true)); // Filtrar los usuarios con state === true
    }, []);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="w-80 md:w-full mx-auto p-10 mt-15 mb-15">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleOpenModal}
                >
                    Crear usuario
                </button>
            </div>
            {/* Modal de creación de usuario */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-lg font-bold mb-4">Usuarios Registrados</h2>
                        <table className="w-full border-collapse border border-gray-400 mb-8">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 px-4 py-2">ID</th>
                                    <th className="border border-gray-400 px-4 py-2">Nombres</th>
                                    <th className="border border-gray-400 px-4 py-2">Apellidos</th>
                                    <th className="border border-gray-400 px-4 py-2">Tipo de Documento</th>
                                    <th className="border border-gray-400 px-4 py-2">Número de Documento</th>
                                    <th className="border border-gray-400 px-4 py-2">Correo Electrónico</th>
                                    <th className="border border-gray-400 px-4 py-2">Teléfono</th>
                                    <th className="border border-gray-400 px-4 py-2">Fecha de Nacimiento</th>
                                    <th className="border border-gray-400 px-4 py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                                        <td className="border border-gray-400 px-4 py-2">{user.name}</td>
                                        <td className="border border-gray-400 px-4 py-2">{user.last_name}</td>
                                        <td className="border border-gray-400 px-4 py-2">{user.document_type}</td>
                                        <td className="border border-gray-400 px-4 py-2">{user.document_number}</td>
                                        <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                                        <td className="border border-gray-400 px-4 py-2">{user.phone}</td>
                                        <td className="border border-gray-400 px-4 py-2">{user.birthDate}</td>
                                        <td className="border border-gray-400 px-4 py-2 flex gap-2">
                                            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                                                <Eye size={16} />
                                            </button>
                                            <button className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold py-2 px-4 rounded">
                                                <Edit size={16} />
                                            </button>
                                            <button className="bg-red-200 hover:bg-red-300 text-red-800 font-bold py-2 px-4 rounded">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleCloseModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gestion;
