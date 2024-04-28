import { useState, FormEvent } from 'react';

const Login = () => {
    // Estados para el nombre de usuario, contraseña y mensaje de error
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [usernameClicked, setUsernameClicked] = useState(false); // Estado para controlar si se hizo clic en el campo de usuario

    // Función para manejar el envío del formulario
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validar si el nombre de usuario o la contraseña están vacíos
        if (!username && !password) {
            setError('Ingrese usuario y contraseña.');
        } else if (!username) {
            setError('Ingrese su nombre de usuario.');
        } else if (!password) {
            setError('Ingrese su contraseña.');
        } else {
            // Aquí puedes implementar la lógica para validar el inicio de sesión
            // Por ahora, simplemente establecemos un mensaje de error si no hay datos
            setError('');
        }
    };

    // Función para manejar el clic en el campo de usuario
    const handleUsernameClick = () => {
        setUsernameClicked(true);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className='bg-white border border-gray-400 rounded-md p-8 shadow-lg'>
                <h1 className='text-center text-black font-bold mb-4'>INICIO DE SESION</h1>
                <form onSubmit={handleSubmit}>
                    {/* Mostrar el mensaje de error si existe */}
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <div className="mb-4 relative">
                        {/* La etiqueta "NOMBRE DE USUARIO" aparece arriba del campo de texto cuando se hace clic */}
                        {usernameClicked ? (
                            <label className="block text-black mb-2" htmlFor="username">Nombre de Usuario</label>
                        ) : (
                            <label className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400 text-xs transition-all duration-300" htmlFor="username">NOMBRE DE USUARIO</label>
                        )}
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            onClick={handleUsernameClick} 
                            className="w-full p-2 rounded-md border border-gray-300 bg-gray-100 pl-10" 
                            id="username" 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-black mb-2">Contraseña</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded-md border border-gray-300 bg-gray-100" id="password" />
                    </div>
                    <div className="text-center mb-4">
                        <a href="#" className="text-blue-500">Olvidó su contraseña?</a>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
