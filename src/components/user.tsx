// CREATE THE USER COMPONENT
function User() {
    // Datos simulados del usuario
    const userData = {
        name: "John",
        last_name: "Doe",
        document_type: "DNI",
        document_number: "12345678",
        gender: "Masculino",
        email: "john.doe@example.com",
        phone: "+123456789",
        birthDate: "01/01/1990"
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-center text-3xl font-bold my-8">DATOS DEL USUARIO</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 md:col-span-1">
                    {/* Contenido de la primera columna */}
                    <div className="flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Volver</span>
                    </div>
                    <img className="mx-auto rounded-full w-32 h-32" src="./photoTest.jpeg" alt="Foto de perfil" />
                </div>
                <div className="col-span-1 md:col-span-2">
                    {/* Contenido de la segunda columna */}
                    <p><strong>Nombre Completo:</strong> {userData.name} {userData.last_name}</p>
                    <p><strong>Documento:</strong> {userData.document_type} {userData.document_number}</p>
                    <p><strong>Género:</strong> {userData.gender}</p>
                    <p><strong>Contacto:</strong> Correo: {userData.email}, Teléfono: {userData.phone}</p>
                    <p><strong>Fecha de Nacimiento:</strong> {userData.birthDate}</p>
                </div>
            </div>
        </div>
    );
}

// EXPORT THE COMPONENT
export default User;
