import jsonServer from 'json-server';
import data from './db.js';

const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

