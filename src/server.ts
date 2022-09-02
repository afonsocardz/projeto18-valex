import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})