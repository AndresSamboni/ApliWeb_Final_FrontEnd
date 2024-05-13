import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import Home from "./components/home";
import Role from "./components/role";
import Document from "./components/document";
import Gestion from "./components/gestionUsers";
import Login from "./components/login";

interface Link {
    src: string;
    name: string;
    component: string;
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [links, setLinks] = useState<Link[]>([]);

    const handleGetLinks = useCallback((links: Link[]) => {
        setLinks(links);
    }, []);

    return (
        <>
            {isLoggedIn ? (
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
                                    <Route path={links[3].src} element={<Gestion />} />
                                )}
                            </Routes>
                        </main>
                    )}
                </BrowserRouter>
            ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
            )}
        </>
    );
}

export default App;
