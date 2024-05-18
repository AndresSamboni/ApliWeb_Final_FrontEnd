// Definir una interfaz para las propiedades del componente User
interface UserProps {
    user: {
        name: string;
        last_name: string;
        document_type: string;
        document_number: string;
        gender: string;
        email: string;
        phone: string;
        birthDate: string;
        state: boolean;
    };
}

// Modificar la función User para recibir las propiedades user
function User(props: UserProps) {
    // Obtener los datos del usuario de las propiedades
    const { user } = props;

    return (
        <div className="container mx-auto">
            <h1 className="text-center text-3xl font-bold my-8">DATOS DEL USUARIO</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 md:col-span-1">
                    {/* Contenido de la primera columna */}
                    <img className="mx-auto rounded-full w-32 h-32" src="./photoTest.jpeg" alt="Foto de perfil" />
                </div>
                <div className="col-span-1 md:col-span-2">
                    {/* Contenido de la segunda columna */}
                    <p><strong>Nombre Completo:</strong> {user.name} {user.last_name}</p>
                    <p><strong>Documento:</strong> {user.document_type} {user.document_number}</p>
                    <p><strong>Género:</strong> {user.gender}</p>
                    <p><strong>Contacto:</strong> Correo: {user.email}, Teléfono: {user.phone}</p>
                    <p><strong>Fecha de Nacimiento:</strong> {user.birthDate}</p>
                    <p><strong>Estado:</strong> {user.state ? "Activo" : "Inactivo"}</p>
                </div>
            </div>
        </div>
    );
}

export default User;
