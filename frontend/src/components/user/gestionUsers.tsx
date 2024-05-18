import { useState} from 'react';
import usersData from '../usersEjemplo.json';
import { Trash2, Edit, Eye } from 'react-feather';
import User from './verUser';

function Gestion() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleViewUser = (user: any) => {
        setSelectedUser(user);
        setModalOpen(true); // Abrir el modal al hacer clic en el botón del ojo
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
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-lg font-bold mb-4">Usuario Seleccionado</h2>
                        {selectedUser && <User user={selectedUser} />} {/* Mostrar el componente User solo si hay un usuario seleccionado */}
                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleCloseModal}>Cerrar</button>
                    </div>
                </div>
            )}
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
                    {usersData
                        .filter(user => user.state === true) // Filtrar solo los usuarios con state === true
                        .map((user, index) => (
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
                                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => handleViewUser(user)}>
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
        </div>
    );
}

export default Gestion;
