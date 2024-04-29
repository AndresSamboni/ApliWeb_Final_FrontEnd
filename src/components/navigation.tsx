//IMPORTS
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/img/logo.webp';
import '../styles/navigation.css'

//CREATE THE INTERFACE TO PASS LINKs TO THE MAIN FILE
interface NavigationProps {
  readonly onGetLinks: (links: { src: string; name: string; component: string; }[]) => void;
}

//CREATE THE NAVIGATION COMPONENT
function Navigation({ onGetLinks }: NavigationProps) {
    //DEFAULT VARIABLES AND CONSTANTS
    const size: number = 40;
    const userRole = 'sa';
    const links = useMemo(() => [
        { src: '/', name: 'Inicio', component: 'Home' },
        { src: '/roles', name: 'Roles', component: 'Role' },
        { src: '/documents', name: 'Documentos', component: 'Document' }
    ], []);
    const [selectRoute, setSelectRoute] = useState<string>('');
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const [stateMenu, setStateMenu] = useState<boolean>(false);
    const location = useLocation();
    //PASS THE LINKS TO THE MAIN FILE
    useEffect(() => {
        onGetLinks(links);
    }, [onGetLinks, links]);
    //SELECT THE CORRECT ROUTE WHEN THE PAGE LOADS
    useEffect(() => {
        const pathname = location.pathname;
        const defaultRoute = links.find(link => link.src === pathname);
        if (defaultRoute) {
            setSelectRoute(defaultRoute.src);
        } else {
            setSelectRoute(links[0].src); // <-- Selecciona la primera ruta si no coincide con ninguna
        }
    }, [location, links]);
    //VALIDATION TO ACCESS THE PATH USERS
    if (userRole === 'sa' && links.length === 3) {
        links.push({ src:'/users', name:'Usuarios', component: 'Home' });
    }
    //VALIDATION TO KNOW THE SCREEN WIDTH
    useEffect(() => {
        const handleResize = () => {
        setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);
    //WITH OF THE SCREEN
    const showNav = windowWidth > 640;
    
    //RETURN INTERFACE
    return (
        <nav>
            {showNav ? (
                <div className='flex w-full'>
                    <section className='flex justify-center w-1/6'>
                        <img src={logo} alt="Logo" width={size} height={size} />
                    </section>
                    <section className='flex justify-between w-5/6'>
                        {links.map(link => (
                            <Link
                                key={link.src}
                                to={link.src}
                                className={`flex items-center justify-center hover:transition hover:duration-300 hover:text-xl hover:bg-link-bg w-1/3
                                ${selectRoute === link.src ? 'text-xl text-white bg-link-bg border-b-4 border-link-border' : 'text-sm'}`
                                }
                                onClick={() => setSelectRoute(link.src)}
                            >{link.name}</Link>
                        ))}
                    </section>
                </div>
            ) : (
                <div className='flex flex-col w-full'>
                    <article className='flex w-full'>
                        <section className='flex justify-center w-1/2'>
                            <img src={logo} alt="Logo" width={size} height={size} />
                        </section>
                        <section className='flex justify-center w-1/2'>
                            <button onClick={() => setStateMenu(!stateMenu)}>
                                <svg className=" w-6 h-6 text-title" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                        </section>
                    </article>
                    {stateMenu ? (
                        <section>
                            {links.map(link => (
                                <a
                                    key={link.src}
                                    href={link.src}
                                    className={`flex items-center justify-center hover:transition hover:duration-300 hover:text-xl hover:bg-link-bg w-1/3
                                    ${selectRoute === link.src ? 'text-xl text-white bg-link-bg border-b-4 border-link-border' : 'text-sm'}`
                                    }
                                    onClick={() => setSelectRoute(link.src)}
                                >{link.name}</a>
                            ))}
                        </section>
                    ):''}
                </div>
            )}
        </nav>
    );
}

//EXPORT THE COMPONENT
export default Navigation