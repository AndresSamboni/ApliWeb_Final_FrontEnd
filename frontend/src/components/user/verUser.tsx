import { useState, useEffect } from "react";
import { UserInterface } from "../../interfaces/userProps.interface";

// IMPORT THE FETCH DATA FUNCTION
import { fetchData } from "../../api/backend.api";

function VerUser(props: { userId: number }) {
    const [user, setUser] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                await fetchData(`/user/${props.userId}`, setUser);
                setLoading(false);
            } catch (error) {
                setError("Error fetching user");
                console.error("Error fetching user:", error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [props.userId]);

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
        <div className="container mx-auto">
            <h1 className="text-center text-3xl font-bold my-8">DATOS DEL USUARIO</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 md:col-span-1">
                    <img className="mx-auto rounded-full w-32 h-32" src={user.photo || "./photoTest.jpeg"} alt="Foto de perfil" />
                </div>
                <div className="col-span-1 md:col-span-2">
                    <p><strong>Nombre Completo:</strong> {user.name} {user.last_name}</p>
                    <p><strong>Número de Documento:</strong> {user.document_number}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Teléfono:</strong> {user.phone || "No especificado"}</p>
                    <p><strong>Fecha de Nacimiento:</strong> {user.birthdate ? new Date(user.birthdate).toLocaleDateString() : "No especificada"}</p>
                    <p><strong>Estado:</strong> {user.state ? "Inactivo" : "Activo"}</p>
                </div>
            </div>
        </div>
    );
}

export default VerUser;
