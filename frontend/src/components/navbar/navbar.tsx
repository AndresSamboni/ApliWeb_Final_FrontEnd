// IMPORT REACT LIBRARIES AND COMPONENTS
import { Link } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import Menu from "./menu";

// IMPORT CONSTANTS
import { S_HOME, S_LOGOUT } from './constants';

// NAVBAR PROPERTIES
import type { Navbar } from '../../interfaces/navbarProps.interface';

// CREATE THE Navbar COMPONENT
function Navbar({ userRole, setLogIn }: Readonly<Navbar>) {
    // RETURN THE NAVIGATION BAR
    return (
        <nav>
            <article className='flex w-full'>
                <section className='flex justify-center items-center w-1/3'>
                    <button className='font-semibold text-title'>
                        <Link to={'/'}><IoHomeOutline size={S_HOME} /></Link>
                    </button>
                </section>
                <section className='relative flex flex-col justify-center items-center space-y-2 w-1/3'>
                    <Menu userRole={userRole} />
                </section>
                <section className='flex justify-center w-1/3'>
                    <button onClick={() => { setLogIn(false) }} className='font-semibold text-title'>
                        <TbLogout2 size={S_LOGOUT} />
                    </button>
                </section>
            </article>
        </nav>
    );
}

// EXPORT THE COMPONENT
export default Navbar;
