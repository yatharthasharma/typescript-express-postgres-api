import express, { Express } from 'express';
import helmet from 'helmet';
import { Sequelize } from 'sequelize';

const app: Express = express();

app.use(express.json());
app.use(helmet());

// setup routes
app.use('/', require('./src/routes/index'));

// setup database connection
const sequelize: Sequelize = new Sequelize('postgres', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error: any) => console.error('Unable to connect to the database:', error));

// start the server
app.listen(3000, () => console.log('Listening on port 3000...'));
