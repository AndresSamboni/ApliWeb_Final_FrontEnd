import { useState, FormEvent, useEffect, useRef } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [usernameFocused, setUsernameFocused] = useState(false);
    const usernameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username && !password) {
            setError('Ingrese usuario y contraseña.');
        } else if (!username) {
            setError('Ingrese su nombre de usuario.');
        } else if (!password) {
            setError('Ingrese su contraseña.');
        } else {
            setError('');
        }
    };

    const handleUsernameClick = () => {
        setUsernameFocused(true);
    };

    const handleUsernameBlur = () => {
        if (!username && usernameRef.current) {
            setUsernameFocused(false);
        }
    };

    useEffect(() => {
        const handleWindowClick = (event: MouseEvent) => {
            if (usernameRef.current && !usernameRef.current.contains(event.target as Node)) {
                if (!username) {
                    setUsernameFocused(false);
                }
            }
        };

        window.addEventListener('click', handleWindowClick);

        return () => {
            window.removeEventListener('click', handleWindowClick);
        };
    }, [username]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className='bg-white border border-gray-400 rounded-md p-8 shadow-lg'>
                <h1 className='text-center text-black font-bold mb-4'>INICIO DE SESION</h1>
                <form onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <div className="mb-4 relative">
                        {usernameFocused || username ? (
                            <label className="block text-black mb-2" htmlFor="username">Nombre de Usuario</label>
                        ) : (
                            <label className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400 text-xs transition-all duration-300" htmlFor="username">
                                NOMBRE DE USUARIO
                            </label>
                        )}
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            onClick={handleUsernameClick} 
                            onBlur={handleUsernameBlur} 
                            className="w-full p-2 rounded-md border border-gray-300 bg-gray-100 pl-10" 
                            id="username" 
                            ref={usernameRef} 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-black mb-2">Contraseña</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full p-2 rounded-md border border-gray-300 bg-gray-100" 
                            id="password" 
                        />
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
