//IMPORTS
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.webp';
import '../styles/navigation.css'

//CREATE THE NAVIGATION COMPONENT
function Navigation() {
    //DEFAULT VARIABLES AND CONSTANTS
    const size = 40;
    const links = [{ src:'/', name:'Inicio' }, { src:'/roles', name:'Roles' }, { src:'/documents', name:'Documentos' }];
    const [selectRoute, setSelectRoute] = useState<string>(links[0].src);
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const [stateMenu, setStateMenu] = useState<boolean>(false);
    //VALIDATIONS
    const userRole = 'sa';
    if (userRole === 'sa') {
        links.push({ src:'/users', name:'Usuarios' });
    }
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
                        {links.map((link, index) => (
                            <Link
                                key={index}
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
                            {links.map((link, index) => (
                                <a
                                    key={index}
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