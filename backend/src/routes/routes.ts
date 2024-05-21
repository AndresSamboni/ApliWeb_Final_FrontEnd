// IMPORT ROUTER LIBRARIES
import { Router } from 'express';

// IMPORT CONTROLLERS
import { indexWelcome } from '../controllers/index.controller';
import { getUsers, setUser, getUser, updateUser, disableUser, enableUser } from '../controllers/user.controller';
import { getRoles, setRole, getRole, updateRole, disableRole, enableRole } from '../controllers/role.controller';
import { getGenders, setGender, getGender, updateGender, disableGender, enableGender } from '../controllers/gender.controller';
import { getDocuments, setDocument, getDocument, updateDocument, disableDocument } from '../controllers/document.controller';
import { getDocumentId, setRegister, updateRegister } from '../controllers/register.controller';
import authRoutes from './auth.routes'; // Importar las rutas de autenticación

// DEFINITION OF ROUTES
const router = Router();

// ENDPOINT BASE WITH GET METHOD
router.route('/').get(indexWelcome);

// ENDPOINTS TO USER TABLE
router.route('/users').post(getUsers); // GET ALL USERS
router.route('/user/create').post(setUser); // CREATE A NEW USER
router.route('/user/:ID').post(getUser); // GET A USER BY ID
router.route('/user/update/:ID').post(updateUser); // UPDATE A USER BY ID
router.route('/user/disable/:ID').post(disableUser); // DELETE A USER BY ID
router.route('/user/enable/:ID').post(enableUser); // RE-ACTIVATE A USER BY ID

// ENDPOINTS TO ROLES TABLE
router.route('/roles').post(getRoles); // GET ALL ROLES
router.route('/role/create').post(setRole); // CREATE A NEW ROLE
router.route('/role/:ID').post(getRole); // GET A ROLE BY ID
router.route('/role/update/:ID').post(updateRole); // UPDATE A ROLE BY ID
router.route('/role/disable/:ID').post(disableRole); // DELETE A ROLE BY ID
router.route('/role/enable/:ID').post(enableRole); // RE-ACTIVATE A ROLE BY ID

// ENDPOINTS TO GENDER TABLE
router.route('/genders').post(getGenders); // GET ALL GENDERS
router.route('/gender/create').post(setGender); // CREATE A NEW GENDER
router.route('/gender/:ID').post(getGender); // GET A GENDER by ID
router.route('/gender/update/:ID').post(updateGender); // UPDATE A GENDER BY ID
router.route('/gender/disable/:ID').post(disableGender); // DELETE A GENDER BY ID
router.route('/gender/enable/:ID').post(enableGender); // RE-ACTIVATE A GENDER BY ID

// ENDPOINTS TO DOCUMENT TABLE
router.route('/documents').post(getDocuments); // GET ALL DOCUMENTS
router.route('/document/create').post(setDocument); // CREATE A NEW DOCUMENT
router.route('/document/:ID').post(getDocument); // GET A DOCUMENT BY ID
router.route('/document/update/:ID').post(updateDocument); // UPDATE A DOCUMENT BY ID
router.route('/document/disable/:ID').post(disableDocument); // DELETE A DOCUMENT BY ID

// ENDPOINTS TO REGISTER TABLE
router.route('/register/document').post(setRegister); // CREATE A NEW REGISTER
router.route('/register/update/document').post(updateRegister); // UPDATE A REGISTER BY ID
router.route('/register/document/maxId').post(getDocumentId); // UPDATE A REGISTER BY ID

// ENDPOINTS TO AUTHENTICATION
router.use('/api/auth', authRoutes); // Usar las rutas de autenticación

// EXPORT ROUTES
export default router;
