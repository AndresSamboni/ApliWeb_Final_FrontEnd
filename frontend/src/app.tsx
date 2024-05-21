import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Navbar from "./components/navbar/navbar";
import { getFullLinks, getPartialLinks } from './components/navbar/constants';

function App() {
  const [isLogIn, setLogIn] = useState(false);
  const [userRole, setUserRole] = useState<string>(''); // Inicializa como cadena vacía
  const [links, setLinks] = useState(() => getPartialLinks());

  useEffect(() => {
    if (userRole === 'SUPER ADMINISTRADOR') {
      setLinks(getFullLinks());
    } else {
      setLinks(getPartialLinks());
    }
  }, [userRole]);

  return (
    !isLogIn ? (
      <BrowserRouter>
        <header className="m-0 p-2 border-b-4 border-x-4 border-nav-border shadow-lg shadow-shadow bg-nav-bg">
          <Navbar userRole={userRole} setLogIn={setLogIn} />
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            {links.map(link => (
              <Route
                key={link.src}
                path={link.src}
                element={link.component}
              />
            ))}
          </Routes>
        </main>
      </BrowserRouter>
    ) : (
      <Login setIsLoggedIn={setLogIn} setUserRole={setUserRole} />
    )
  );
}

export default App;
