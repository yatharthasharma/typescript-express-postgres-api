import express, { Express } from 'express';
import helmet from 'helmet';

const app: Express = express();

app.use(express.json());
app.use(helmet());

// setup routes
app.use('/', require('./src/routes/index'));

// start the server
const server = app.listen(3000, () => console.log('Listening on port 3000...'));