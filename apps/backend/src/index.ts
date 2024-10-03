import express from 'express';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';
import path from 'path';
import cors from 'cors';
import env from './env';

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: env.REACT_APP_URL,
    methods: '*',
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.json());

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
