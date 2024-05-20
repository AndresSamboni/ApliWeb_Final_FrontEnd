import { useState} from 'react';
import CreateUser from './createUser';
import usersData from './usersEjemplo.json';
import { Trash2, Edit, Eye } from 'react-feather';
import User from './verUser';


interface User {
    name: string;
    email: string;
    // Otros campos que puedas necesitar
}

type ActionType = 'CREATE' | 'VIEW' | null;

function Gestion() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [actionType, setActionType] = useState<ActionType>(null);

    const handleOpenCreateModal = () => {
        setSelectedUser(null); // Asegurarse de que no hay usuario seleccionado
        setActionType('CREATE');
        setModalOpen(true);
    };

    const handleViewUser = (user: User) => {
        setSelectedUser(user);
        setActionType('VIEW');
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setActionType(null);
    };

    const handleUserCreated = () => {
        setModalOpen(false);
        setActionType(null);
    };

    return (
        <div className="w-80 md:w-full mx-auto p-10 mt-15 mb-15">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={handleOpenCreateModal}>
                    Crear usuario
                </button>
            </div>
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-md">
                        {actionType === 'CREATE' && (
                            <>
                                {/* <h2 className="text-lg font-bold mb-4">Crear Nuevo Usuario</h2> */}
                                <CreateUser onUserCreated={handleUserCreated} />
                            </>
                        )}
                        {actionType === 'VIEW' && selectedUser && (
                            <>
                                <h2 className="text-lg font-bold mb-4">Ver Usuario</h2>
                                <User user={selectedUser} />
                            </>
                        )}
                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleCloseModal}>Cerrar</button>
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
