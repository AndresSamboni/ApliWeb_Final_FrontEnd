// IMPORT ROUTER LIBRARIES
import { Router } from 'express';

// IMPORT CONTROLLERS
import { indexWelcome } from '../controllers/index.controller';
import { getUsers } from '../controllers/user.controller';
import { getRoles } from '../controllers/role.controller';
import { getGenders } from '../controllers/gender.controller';
import { getDocuments } from '../controllers/document.controller';

// DEFINITION OF ROUTES
const router = Router();

// ENDPOINT BASE WITH GET METHOD
router.route('/').get(indexWelcome);

// ENDPOINTS TO USER TABLE
router.route('/users').post(getUsers); // GET ALL USERS

// ENDPOINTS TO ROLES TABLE
router.route('/roles').post(getRoles); // GET ALL ROLES

// ENDPOINTS TO GENDER TABLE
router.route('/genders').post(getGenders); // GET ALL GENDERS

// ENDPOINTS TO DOCUMENT TABLE
router.route('/documents').post(getDocuments); // GET ALL DOCUMENTS

// EXPORT ROUTES
export default router;