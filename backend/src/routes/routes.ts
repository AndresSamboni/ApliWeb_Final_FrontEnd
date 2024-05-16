// IMPORT ROUTER LIBRARIES
import { Router } from 'express';

// IMPORT CONTROLLERS
import { indexWelcome } from '../controllers/index.controller';
import { getUsers, setUser, getUser } from '../controllers/user.controller';
import { getRoles, setRole, getRole } from '../controllers/role.controller';
import { getGenders, setGender, getGender } from '../controllers/gender.controller';
import { getDocuments, setDocument, getDocument } from '../controllers/document.controller';

// DEFINITION OF ROUTES
const router = Router();

// ENDPOINT BASE WITH GET METHOD
router.route('/').get(indexWelcome);

// ENDPOINTS TO USER TABLE
router.route('/users').post(getUsers); // GET ALL USERS
router.route('/user/create').post(setUser); // CREATE A NEW USER
router.route('/user/:id').post(getUser); // GET A USER BY ID

// ENDPOINTS TO ROLES TABLE
router.route('/roles').post(getRoles); // GET ALL ROLES
router.route('/role/create').post(setRole); // CREATE A NEW ROLE
router.route('/role/:id').post(getRole); // GET A ROLE BY ID

// ENDPOINTS TO GENDER TABLE
router.route('/genders').post(getGenders); // GET ALL GENDERS
router.route('/gender/create').post(setGender); // CREATE A NEW GENDER
router.route('/gender/:id').post(getGender); // GET A GENDER by ID

// ENDPOINTS TO DOCUMENT TABLE
router.route('/documents').post(getDocuments); // GET ALL DOCUMENTS
router.route('/document/create').post(setDocument); // CREATE A NEW DOCUMENT
router.route('/document/:id').post(getDocument); // GET A DOCUMENT BY ID

// EXPORT ROUTES
export default router;