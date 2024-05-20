// IMPORT REACT COMPONENTS
import GestionRole from "../role/gestionRole";
import Document from "../document";
import GestionGender from '../gender/gestionGender'
import GestionUser from "../user/gestionUsers";

// ICONS SIZE
export const S_HOME = 30;
export const S_LOGOUT = 30;
// DEFAULT LINKS
export const getFullLinks = () => [
    { src: '/roles', name: 'Roles', component: <GestionRole /> },
    { src: '/gender', name: 'Géneros', component: <GestionGender /> },
    { src: '/documents', name: 'Documentos', component: <Document /> },
    { src: '/users', name: 'Usuarios', component: <GestionUser userRole="SUPER ADMINISTRADOR" /> } // Pasar userRole aquí
];
export const getPartialLinks = () => [
    { src: '/roles', name: 'Roles', component: <GestionRole /> },
    { src: '/gender', name: 'Géneros', component: <GestionGender /> },
    { src: '/documents', name: 'Documentos', component: <Document /> }
];
