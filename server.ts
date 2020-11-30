import "reflect-metadata";
import { createConnection } from 'typeorm';
import app from './app'

createConnection()
  .then(async (connection) => {
    app.run()
  })
  .catch((err) => console.log(err));