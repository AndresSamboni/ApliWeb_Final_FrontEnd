import { useState, useEffect } from 'react';
import { Trash2, Edit, Eye } from 'react-feather';
import { UserInterface } from '../../interfaces/userProps.interface';
import VerUser from './verUser';
import EditUser from './editUser';
import DeleteUser from './deleteUser';
import CreateUser from './createUser'; // Import the CreateUser component
import { fetchData } from "../../api/backend.api";
import { useNavigate } from 'react-router-dom';

interface GestionProps {
    userRole: string;
}

const Gestion: React.FC<GestionProps> = ({ userRole }) => {
    const navigate = useNavigate();

    // Redirect to home page if the user does not have access
    useEffect(() => {
        if (userRole !== 'SUPER ADMINISTRADOR') {
            navigate('/');
        }
    }, [userRole, navigate]);

    // State variables for managing modals, users, and filters
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [createUserModalOpen, setCreateUserModalOpen] = useState(false); // State for create user modal
    const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('');

    // Fetch users when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    // Apply filter whenever the filter text or users list changes
    useEffect(() => {
        applyFilter();
    }, [filter, users]);

    // Function to fetch users from the API
    const fetchUsers = async () => {
        try {
            setLoading(true);
            console.log('Fetching users...');
            await fetchData('/users', (data: UserInterface[]) => {
                console.log('Response data:', data);
                setUsers(data);
                setFilteredUsers(data); // Initialize filtered users
            });
            setLoading(false);
        } catch (err) {
            setError('Error al obtener usuarios');
            console.error('Error fetching users:', err);
            setLoading(false);
        }
    };

    // Function to apply filter on users
    const applyFilter = () => {
        if (!filter) {
            setFilteredUsers(users);
            return;
        }
        const lowerCaseFilter = filter.toLowerCase();
        setFilteredUsers(users.filter(user => 
            user.id?.toString().includes(lowerCaseFilter) ||
            user.document_number.toLowerCase().includes(lowerCaseFilter) ||
            user.document_type.toLowerCase().includes(lowerCaseFilter)
        ));
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

    const handleOpenCreateUserModal = () => {
        setCreateUserModalOpen(true);
    };

    const handleCloseCreateUserModal = () => {
        setCreateUserModalOpen(false);
    };

    // Function to view user details
    const handleViewUser = (user: UserInterface) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    // Display loading indicator
    if (loading) {
        return <div>Cargando...</div>;
    }

    // Display error message
    if (error) {
        return <div>{error}</div>;
    }

    // Filter active users
    const activeUsers = filteredUsers.filter(user => user.state === true);

    return (
        <div className="w-80 md:w-full mx-auto p-10 mt-15 mb-15">
            <div className="flex justify-end mb-8">
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-2"
                    onClick={handleOpenCreateUserModal}
                >
                    Crear usuario
                </button>
            </div>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Filtrar por Tipo de Documento o Número de Documento"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-4"
                    onClick={fetchUsers}
                >
                    Actualizar
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
            {createUserModalOpen && (
                <CreateUser
                    open={createUserModalOpen}
                    close={handleCloseCreateUserModal}
                    onUserCreated={fetchUsers}
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
