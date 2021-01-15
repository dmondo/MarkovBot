import express from 'express';
import morgan from 'morgan';
import parser from 'body-parser';
import path from 'path';
import router from './router';

const appEnv = process.env.ENVIRONMENT;

const app = express();

app.use(express.static(path.join(__dirname, '..')));

app.use(parser.urlencoded({
  parameterLimit: 100000,
  limit: '500mb',
  extended: true,
}));
app.use(parser.json({ limit: '50mb' }));
if (appEnv === 'development') { app.use(morgan('dev')); }
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port);
