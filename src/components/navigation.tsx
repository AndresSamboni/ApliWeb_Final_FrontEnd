import { useState } from 'react';
import '../styles/navigation.css'

//CREATE THE NAVIGATION COMPONENT
function Navigation() {
    // NAVIGATION ROUTES BY DEFAULT
    const navRoutes = ['Gestión de roles', 'Gestión de documentos'];
    const userRole = 'sa';
    // STATE TO CONTROL THE ROUTE
    const [selectRoute, setSelectRoute] = useState<string | null>(null);
    // VALIDATION ROL
    if (userRole === 'sa') {
        navRoutes.push('Gestión de usuarios');
    }
    return (
        <header>
            <nav className="w-full flex bg-slate-200">
                <section className="w-2/5">
                    <img src="#" alt="Logo" />
                </section>
                <section className="w-3/5 flex justify-between">
                    {navRoutes.map((route) => (
                        <a
                            key={route}
                            href="/#"
                            className={`hover:text-xl hover:bg-slate-300 ${
                                selectRoute === route ? 'border-b-2 border-black bg-slate-300 text-black' : ''}`
                            }
                            onClick={() => setSelectRoute(route)}
                        >
                            {route}
                        </a>
                    ))}
                </section>
            </nav>
        </header>
    )
}

//EXPORT THE COMPONENT
export default Navigation