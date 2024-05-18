// IMPORT REACT LIBRARIES
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// IMPORT CONSTANTS
import { FULL_LINKS, PARTIAL_LINKS } from './constants';

// IMPORT NAVBAR INTERFACE
import type { Menu } from '../../interfaces/navbarProps.interface';

// CREATE THE Menu COMPONENT
function Menu({ userRole }: Readonly<Menu>) {
    // SAVE THE TOGGLE STATE
    const [toggle, setToggle] = useState(false);

    // SAVE THE LINKS
    const [links, setLinks] = useState(PARTIAL_LINKS);

    // CHECK THE USER ROLE
    useEffect(() => {
        if (userRole === 'SUPER ADMINISTRADOR') {
            setLinks(FULL_LINKS);
        } else {
            setLinks(PARTIAL_LINKS);
        }
    }, [userRole]);

    // RETURN THE MENU
    return (
        <>
            <button
                onClick={() => {
                    setToggle(!toggle)
                }}
                className='text-xl font-semibold text-title'
            >Gestión</button>
            {toggle ? (
                <section
                    className='
                                absolute
                                z-50
                                top-full
                                flex
                                flex-col
                                justify-center
                                items-center
                                space-y-2
                                p-4
                                border-4
                                border-nav-border
                                shadow-lg
                                shadow-shadow
                                bg-nav-bg
                                w-fit
                                sm:w-3/4
                            '>
                    {links.map(link => (
                        <Link
                            key={link.src}
                            to={link.src}
                            onClick={() => {
                                setToggle(false);
                            }}
                            className='text-xl font-semibold text-title'
                        >{link.name}</Link>
                    ))}
                </section>
            ) : ''}
        </>
    );
}

// EXPORT THE Menu COMPONENT
export default Menu;