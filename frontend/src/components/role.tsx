//CREATE THE ROLE COMPONENT
function Role() {
    return (
        <section className="flex flex-col p-2 my-4 space-y-2 ">
            <h1 className="text-center font-bold text-title">Gestión de Roles</h1>
            <div className="flex justify-end">
                <button className="p-2 rounded-md bg-subtmit text-white">Crear Rol</button>
            </div>
            <section className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs text-center font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs text-center font-medium text-gray-500 uppercase tracking-wider">Nombre del Rol</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs text-center font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">1</td>
                            <td className="px-6 py-4 whitespace-nowrap">Super Administrador</td>
                            <td className="px-6 py-4 whitespace-nowrap flex justify-center space-x-2">
                                    <button className="text-indigo-600 rounded-md p-2 hover:text-white hover:bg-modify">Editar</button>
                                    <button className="text-red-600 rounded-md p-2 hover:text-white hover:bg-delete">Eliminar</button>
                                </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">2</td>
                            <td className="px-6 py-4 whitespace-nowrap">Administrador</td>
                            <td className="px-6 py-4 whitespace-nowrap flex justify-center space-x-2">
                                    <button className="text-indigo-600 rounded-md p-2 hover:text-white hover:bg-modify">Editar</button>
                                    <button className="text-red-600 rounded-md p-2 hover:text-white hover:bg-delete">Eliminar</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">3</td>
                            <td className="px-6 py-4 whitespace-nowrap">Usuario</td>
                            <td className="px-6 py-4 whitespace-nowrap flex justify-center space-x-2">
                                    <button className="text-indigo-600 rounded-md p-2 hover:text-white hover:bg-modify">Editar</button>
                                    <button className="text-red-600 rounded-md p-2 hover:text-white hover:bg-delete">Eliminar</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">4</td>
                            <td className="px-6 py-4 whitespace-nowrap">Invitado</td>
                            <td className="px-6 py-4 whitespace-nowrap flex justify-center space-x-2">
                                    <button className="text-indigo-600 rounded-md p-2 hover:text-white hover:bg-modify">Editar</button>
                                    <button className="text-red-600 rounded-md p-2 hover:text-white hover:bg-delete">Eliminar</button>
                            </td>
                        </tr>
                        {/* {roles.map(role => (
                            <tr key={role.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{role.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{role.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="text-indigo-600 hover:text-indigo-900">Editar</button>
                                    <button className="text-red-600 hover:text-red-900 ml-2">Eliminar</button>
                                </td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </section>
        </section>
    );
}

//EXPORT THE COMPONENT
export default Role;