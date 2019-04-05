import express from 'express';
import http from 'http';
import logger from 'morgan';
import customEnv from 'custom-env';
import apiRouter from './routes/index';

customEnv.env();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
  res.header('Access-Control-Allow-Methods', 'POST');
  next();
});
app.use('/api/v1', apiRouter);

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

export default server;
