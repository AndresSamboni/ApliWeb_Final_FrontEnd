//REACT IMPORTS
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//COMPONENT IMPORTS
import Navigation from './components/navigation';
import Home from './components/home';
import Role from './components/role';
import Document from './components/document';
import User from './components/user';

//STYLE IMPORTS
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <header className='flex flex-col m-0 p-2 space-y-4 border-b-4 border-x-4 border-nav-border shadow-lg shadow-shadow bg-nav-bg'>
      <h1 className='text-center text-2xl font-bold text-title'>GESTIÓN DOCUMENTAL</h1>
        <Navigation/>
    </header>
    <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roles" element={<Role />} />
          <Route path="/documents" element={<Document />} />
          <Route path="/users" element={<User />} />
        </Routes>
      </main>
    </BrowserRouter>
  </React.StrictMode>,
)
