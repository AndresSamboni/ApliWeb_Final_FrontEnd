import { useState, useEffect } from "react";
import { UserInterface } from "../../interfaces/userProps.interface";
import { fetchData } from "../../api/backend.api";

// Extending the UserInterface to include document_type and gender
interface UserDetail extends UserInterface {
    document_type: string;
    gender: string;
}

function VerUser(props: { userId: number }) {
    const [user, setUser] = useState<UserDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch user data when the component mounts or userId changes
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                // Fetch user data from the backend API
                await fetchData(`/user/${props.userId}`, (data: UserDetail) => {
                    setUser(data);
                });
                setLoading(false);
            } catch (error) {
                setError("Error fetching user");
                console.error("Error fetching user:", error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [props.userId]);

    // Display loading indicator
    if (loading) {
        return <div>Cargando...</div>;
    }

    // Display error message
    if (error) {
        return <div>{error}</div>;
    }

    // Display message if user data is not found
    if (!user) {
        return <div>No se encontraron datos del usuario</div>;
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-center text-3xl font-bold my-8">DATOS DEL USUARIO</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 md:col-span-1">
                    {/* Display user photo or a default photo */}
                    <img className="mx-auto rounded-full w-32 h-32" src={user.photo || "./photoTest.jpeg"} alt="Foto de perfil" />
                </div>
                <div className="col-span-1 md:col-span-2">
                    <p><strong>Nombre de Usuario:</strong> {user.user_name}</p>
                    <p><strong>Nombre Completo:</strong> {user.name} {user.last_name}</p>
                    <p><strong>Tipo de Documento:</strong> {user.document_type}</p>
                    <p><strong>Número de Documento:</strong> {user.document_number}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Teléfono:</strong> {user.phone || "No especificado"}</p>
                    <p><strong>Fecha de Nacimiento:</strong> {user.birthdate ? new Date(user.birthdate).toLocaleDateString() : "No especificada"}</p>
                    <p><strong>Género:</strong> {user.gender}</p>
                    <p><strong>Estado:</strong> {user.state ? "Activo" : "Inactivo"}</p>
                </div>
            </div>
        </div>
    );
}

export default VerUser;
