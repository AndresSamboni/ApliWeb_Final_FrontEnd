// IMPORT LIBRARIES
import express from 'express';
import cors from 'cors';
import router from './routes/routes';

// IMPORT DEV LIBRARIES
import morgan from 'morgan'

// CREATE EXPRESS APPLICATION
const app = express();

// ENABLE CORS
app.use(cors());

// ENABLE MIDLEWARES TO DEV
app.use(morgan('dev'));

// USE ROUTES
app.use(router);

// SWITCH ON SERVER
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})