// IMPORT THE LINKS
import { FULL_LINKS, PARTIAL_LINKS } from './components/navbar/constants';

// IMPORT REACT LIBRARIES AND COMPONENTS
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login/login";
import Navbar from "./components/navbar/navbar";

function App() {
  // SAVE THE SESION
  const [isLogIn, setLogIn] = useState(false);
  const [userRole, setUserRole] = useState('SUPER ADMINISTRADOR'); //HUMBERTO NECESITO QUE CON EL Login ME DES EL ROL QUE TIENE EL USUARIO EN EL setUserRole
  const [links, setLinks] = useState(FULL_LINKS);

  // CHECK THE USER ROLE
  useEffect(() => {
    if (userRole === 'SUPER ADMINISTRADOR') {
      setLinks(FULL_LINKS);
    } else {
      setLinks(PARTIAL_LINKS);
    }
  }, [userRole]);
  return (
    isLogIn ? (
      <BrowserRouter>
        <header className="m-0 p-2 border-b-4 border-x-4 border-nav-border shadow-lg shadow-shadow bg-nav-bg">
          <Navbar userRole={userRole} setLogIn={setLogIn} />
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            {links.map(link => (
              <Route key={links.indexOf(link)} path={link.src} element={link.component} />
            ))}
          </Routes>
        </main>
      </BrowserRouter>
    ) : (
      // HUMBERTO NECESITO QUE CON EL Login ME DES EL ROL QUE TIENE EL USUARIO EN EL setUserRole
      <Login setIsLoggedIn={setLogIn} />
    )
  );
}

export default App;
