// IMPORT REACT COMPONENTS
import GestionRole from "../role/gestionRole";
import Document from "../document";
import Gender from "../gender";
import User from "../user/gestionUsers";

// ICONS SIZE
export const S_HOME = 30;
export const S_LOGOUT = 30;
// DEFAULT LINKS
export const FULL_LINKS = [
    { src: '/roles', name: 'Roles', component: <GestionRole /> },
    { src: '/gender', name: 'Géneros', component: <Gender /> },
    { src: '/documents', name: 'Documentos', component: <Document /> },
    { src: '/users', name: 'Usuarios', component: <User /> }
];
export const PARTIAL_LINKS = [
    { src: '/roles', name: 'Roles', component: <GestionRole /> },
    { src: '/gender', name: 'Géneros', component: <Gender /> },
    { src: '/documents', name: 'Documentos', component: <Document /> }
]