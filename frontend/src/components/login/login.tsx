import React, { useState, useRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { signIn } from './signIn';

interface LoginProps {
    setIsLoggedIn: (value: boolean) => void;
    setUserRole: (role: string) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn, setUserRole }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userNameFocused, setUserNameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userName && !password) {
            setError('Ingrese usuario y contraseña.');
        } else if (!userName) {
            setError('Ingrese su nombre de usuario.');
        } else if (!password) {
            setError('Ingrese su contraseña.');
        } else {
            const { success, error, userRole } = await signIn(userName, password);
            if (success) {
                setError('');
                setIsLoggedIn(true);
                setUserRole(userRole || '');
            } else {
                setIsLoggedIn(false);
                setError(error || 'Nombre de usuario o contraseña incorrectos.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className='bg-white border border-gray-400 rounded-md p-8 shadow-lg'>
                <h1 className='text-center text-title font-bold mb-4'>INICIO DE SESIÓN</h1>
                <form onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <div className="mb-4 relative">
                        {userNameFocused || userName ? (
                            <label className="block text-content mb-2" htmlFor="userName">Nombre de Usuario</label>
                        ) : (
                            <label className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400 text-xs transition-all duration-300" htmlFor="userName">
                                NOMBRE DE USUARIO
                            </label>
                        )}
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            onClick={() => setUserNameFocused(true)}
                            onBlur={() => !userName && setUserNameFocused(false)}
                            maxLength={40}
                            className="w-full p-2 rounded-md border border-gray-300 bg-gray-100 pl-10"
                            id="userName"
                            ref={userNameRef}
                        />
                    </div>
                    <div className="mb-4 relative">
                        {passwordFocused || password ? (
                            <label className="block text-content mb-2" htmlFor="password">Contraseña</label>
                        ) : (
                            <label className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400 text-xs transition-all duration-300" htmlFor="password">
                                CONTRASEÑA
                            </label>
                        )}
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onClick={() => setPasswordFocused(true)}
                            onBlur={() => !password && setPasswordFocused(false)}
                            className="w-full p-2 rounded-md border border-gray-300 bg-gray-100 pl-10 pr-10"
                            id="password"
                            ref={passwordRef}
                        />
                        <button
                            type="button"
                            className={`absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none ${passwordFocused ? 'mt-8' : ''}`}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="text-right mb-4">
                        <a href="#" className="text-blue-500 text-sm">¿Olvidaste tu contraseña?</a>
                    </div>
                    <button type="submit" className="w-full bg-submit text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
