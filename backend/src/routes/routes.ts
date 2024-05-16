// IMPORT NECESSARY LIBRARIES
import { Router } from 'express';
import { indexWelcome } from '../controllers/index.controller';
import { getUsers } from '../controllers/user.controller';

// DEFINITION OF ROUTES
const router = Router();

// ENDPOINT BASE WITH GET METHOD
router.route('/').get(indexWelcome);

// ENDPOINT TO OBTAIN THE LIST OF USERS
router.route('/users').post(getUsers);

// EXPORT ROUTES
export default router;