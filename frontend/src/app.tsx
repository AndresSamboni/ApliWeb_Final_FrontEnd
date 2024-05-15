//REACT IMPORTS
import { BrowserRouter, Routes, Route } from "react-router-dom";

//COMPONENT IMPORTS
import Navigation from "./components/navigation";
import Home from "./components/home";
import Role from "./components/role";
import Document from "./components/document";
import User from "./components/user";
import { useCallback, useState } from "react";

//CREATE THE COMPONENT APP
function App() {
    //VARIABLES AND CONSTANTS
    const isSingIn: boolean = true;
    const [links, setLinks] = useState<{ src:string, name:string, component:string }[]>([]);

    //RECEIVE THE LINKS FROM THE NAVIGATION COMPONENT
    const handleGetLinks = useCallback((links: { src: string, name: string, component: string }[]) => {
        setLinks(links);
    }, []);
    //RETURN INTERFACE
    return (
        <>
            {isSingIn ? (
                <BrowserRouter>
                    <header className='flex flex-col m-0 p-2 space-y-4 border-b-4 border-x-4 border-nav-border shadow-lg shadow-shadow bg-nav-bg'>
                    <h1 className='text-center text-2xl font-bold text-title'>GESTIÓN DOCUMENTAL</h1>
                        <Navigation onGetLinks={handleGetLinks} />
                    </header>
                    {links.length > 0 && (
                    <main>
                        <Routes>
                            <Route path={links[0].src} element={<Home />} />
                            <Route path={links[1].src} element={<Role />} />
                            <Route path={links[2].src} element={<Document />} />
                            {links.length > 3 && (
                                <Route path={links[3].src} element={<User />} />
                            )}
                        </Routes>
                    </main>
                    )}
                </BrowserRouter>
            ): (
                <section className='flex m-auto'>
                    <h1 className='text-4xl text-title'>Debes iniciar sesión</h1>
                </section>
            )}
        </>
    );
}

//EXPORT THE COMPONENT
export default App;