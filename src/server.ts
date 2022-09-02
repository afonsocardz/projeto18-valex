import express, { json } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routers';
import errorHandler from './middlewares/errorHandlingMiddleware';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(json());
app.use(cors());

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});