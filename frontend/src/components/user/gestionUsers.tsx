import { useState, useEffect } from 'react';
import { Trash2, Edit, Eye } from 'react-feather';
import { UserInterface } from '../../interfaces/userProps.interface';
import VerUser from './verUser';
import EditUser from './editUser';
import DeleteUser from './deleteUser';
import { fetchData } from "../../api/backend.api";
import { useNavigate } from 'react-router-dom';

interface GestionProps {
    userRole: string;
}

const Gestion: React.FC<GestionProps> = ({ userRole }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (userRole !== 'SUPER ADMINISTRADOR') {
            navigate('/'); // Redirigir a la página de inicio si el usuario no tiene acceso
        }
    }, [userRole, navigate]);

    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            console.log('Fetching users...');
            await fetchData('/users', (data: UserInterface[]) => {
                console.log('Response data:', data);
                setUsers(data);
            });
            setLoading(false);
        } catch (err) {
            setError('Error al obtener usuarios');
            console.error('Error fetching users:', err);
            setLoading(false);
        }
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleOpenEditModal = (user: UserInterface) => {
        setSelectedUser(user);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleOpenDeleteModal = (user: UserInterface) => {
        setSelectedUser(user);
        setDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    const handleViewUser = (user: UserInterface) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const activeUsers = users.filter(user => user.state === true);

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
            {modalOpen && selectedUser && selectedUser.id !== undefined && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-lg font-bold mb-4">Usuario Seleccionado</h2>
                        <VerUser userId={selectedUser.id} />
                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleCloseModal}>Cerrar</button>
                    </div>
                </div>
            )}
            {editModalOpen && selectedUser && selectedUser.id !== undefined && (
                <EditUser
                    open={editModalOpen}
                    close={handleCloseEditModal}
                    userId={selectedUser.id}
                    onEdit={fetchUsers}
                    onExists={() => console.log('User already exists')}
                    setId={(id: number) => setSelectedUser(users.find(user => user.id === id) || null)}
                />
            )}
            {deleteModalOpen && selectedUser && selectedUser.id !== undefined && (
                <DeleteUser
                    open={deleteModalOpen}
                    close={handleCloseDeleteModal}
                    userId={selectedUser.id}
                    onDelete={fetchUsers}
                />
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
                    {activeUsers.map((user, index) => (
                        <tr key={index}>
                            <td className="border border-gray-400 px-4 py-2">{user.id}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.last_name}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.document_type}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.document_number}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.phone}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                {user.birthdate ? new Date(user.birthdate).toLocaleDateString() : "No especificada"}
                            </td>
                            <td className="border border-gray-400 px-4 py-2 flex gap-2">
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => handleViewUser(user)}>
                                    <Eye size={16} />
                                </button>
                                <button className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold py-2 px-4 rounded" onClick={() => handleOpenEditModal(user)}>
                                    <Edit size={16} />
                                </button>
                                <button className="bg-red-200 hover:bg-red-300 text-red-800 font-bold py-2 px-4 rounded" onClick={() => handleOpenDeleteModal(user)}>
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
