import { useState, useEffect } from "react";
import { UserInterface } from "../../interfaces/userProps.interface";
import { fetchData } from "../../api/backend.api";

interface EditUserProps {
    userId: number;
    closeModal: () => void;
    onUpdate: () => void;
}

function EditUser({ userId, closeModal, onUpdate }: EditUserProps) {
    const [user, setUser] = useState<UserInterface | null>(null);
    const [formData, setFormData] = useState<Partial<UserInterface>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                await fetchData(`/user/${userId}`, setUser);
                setLoading(false);
            } catch (error) {
                setError("Error fetching user");
                console.error("Error fetching user:", error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await fetchData(`/user/update/${userId}`, onUpdate, formData);
            setLoading(false);
            closeModal();
        } catch (error) {
            setError("Error updating user");
            console.error("Error updating user:", error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>No se encontraron datos del usuario</div>;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-bold mb-4">Editar Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Apellido</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name || ''}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            name="birthdate"
                            value={formData.birthdate ? new Date(formData.birthdate).toISOString().split('T')[0] : ''}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
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
            </div>
        </div>
    );
}

export default EditUser;
