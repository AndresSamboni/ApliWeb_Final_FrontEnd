// IMPORT THE USER INTERFACE
import { UserInterface } from "../../interfaces/userProps.interface";

// Modificar la función User para recibir las propiedades user
function User(props: { user: UserInterface }) {
    // Obtener los datos del usuario de las propiedades
    const { user } = props;

    return (
        <div className="container mx-auto">
            <h1 className="text-center text-3xl font-bold my-8">DATOS DEL USUARIO</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 md:col-span-1">
                    {/* Contenido de la primera columna */}
                    <img className="mx-auto rounded-full w-32 h-32" src={user.photo || "./photoTest.jpeg"} alt="Foto de perfil" />
                </div>
                <div className="col-span-1 md:col-span-2">
                    {/* Contenido de la segunda columna */}
                    <p><strong>Nombre Completo:</strong> {user.name} {user.last_name}</p>
                    <p><strong>Número de Documento:</strong> {user.document_number}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Teléfono:</strong> {user.phone || "No especificado"}</p>
                    <p><strong>Fecha de Nacimiento:</strong> {user.birthdate?.toString() || "No especificada"}</p>
                    <p><strong>Estado:</strong> {user.state ? "Activo" : "Inactivo"}</p>
                </div>
            </div>
        </div>
    );
}

export default User;
