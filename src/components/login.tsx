import { useState } from 'react';

const Login = () => {
    // Estado para el nombre de usuario y contraseña
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className='bg-white border border-gray-400 rounded-md p-8 shadow-lg'>
                <h1 className='text-center text-black font-bold mb-4'>INICIO DE SESION</h1>
                <form>
                    <div className="mb-4">
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 rounded-md border border-gray-300 bg-gray-100" />
                        <label htmlFor="" className="block mt-2">User name</label>
                    </div>
                    <div className="mb-4">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded-md border border-gray-300 bg-gray-100" />
                        <label htmlFor="" className="block mt-2">Password</label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input type="checkbox" id="rememberMe" className="mr-2" />
                        <label htmlFor="rememberMe" className="text-black">Remember Me</label>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
