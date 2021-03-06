const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const {NotFoundError} = require('./utils/errors');
// require('./config/db');

const app = express();
const swaggerDocument = YAML.load('src/docs/swagger.yaml');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:4200']
  }
});

const users = [];

io.on('connection', (socket) => {
  console.log('A new user connected!');

  socket.on('publicMessage', msg => {
    socket.broadcast.emit('publicMessage', msg);
  });

  socket.on('login', ({name, room}) => {
    const user = {name, room, id: socket.id};
    users.push(user);
    socket.join(user.room);
  });

  socket.on('privateMessage', msg => {
    const user = users.find(user => user.id === socket.id);
    socket.to(user.room).emit('privateMessage', msg);
  })
});

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/template-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.use((err, req, res, next) => {
  console.log('Error', err);
  if (err.details) return res.status(400).send(err.details[0].message);
  if (err instanceof NotFoundError) {
    return res.status(404).send(err.message);
  }
  res.status(503).send('Oooops something went wrong, try again');
});

module.exports = server;
