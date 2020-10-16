require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { errorHandler, error404 } from './middlewares/errorHandler';
import morgan from 'morgan';
import { connectDatabase } from './utils/db-connection';
import yaml from 'yamljs';
import { initializeMiddleware } from 'swagger-tools';

const createApp = async () => {
  const app = express();
  const swaggerObject = yaml.load(__dirname + "/../apispec/comment-svc.yaml");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(compression());
  app.use(cors());
  app.use(morgan("dev"));

  initializeMiddleware(swaggerObject, (swaggerMiddleware) => {
    app.use(swaggerMiddleware.swaggerMetadata());
    app.use(swaggerMiddleware.swaggerValidator());
    require('./routes/')(app);
  });

  await connectDatabase();

  app.use(error404());
  app.use(errorHandler());

  return app;
};

export default createApp;
