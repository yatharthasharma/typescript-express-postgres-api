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
  dialect: 'postgres',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch((error: any) => console.error('Unable to connect to the database:', error));

// handle server interruptions
process.on('SIGINT', () => {
  gracefulExit(0)
});

process.on('SIGTERM', () => {
  gracefulExit(0)
});

// start the server
const server = app.listen(3000, () => console.log('Listening on port 3000...'));

/**
 * Close the database connection to Postgres and then the Express server
 *
 * @param exitCode code used to exit the Node process with
 */
const gracefulExit = (exitCode: 0 | 1) => {
  sequelize.close()
    .then(() => {
      console.log('Database connection successfully terminated.');
      server.close(() => {
        console.log('Terminating the server process.');
        process.exit(exitCode);
      });
    })
    .catch(() => console.error('Unable to close database connection.'));
};
