const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const ACTIONS = require('./src/Actions');

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('build'));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const rooms = {};

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on('send-ok', (username) => {
    io.emit('ok-message', username);
  });

  socket.on(ACTIONS.JOIN, ({ roomId, username, roomType }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = {
        creatorSocketId: socket.id,
        users: {},
        roomType: roomType,
      };
    }
    rooms[roomId].users[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    io.in(roomId).emit(ACTIONS.JOINED, {
      clients,
      username,
      socketId: socket.id,
      roomType: roomType,
    });
    console.log(roomType);
  });

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    const room = rooms[roomId];
   if (room && (room.creatorSocketId === socket.id || room.roomType === 'writeAll')) {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  }
  });

  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });
  
  socket.on('disconnecting', () => {
    const roomIds = [...socket.rooms];
    roomIds.forEach((roomId) => {
      const room = rooms[roomId];
      if (room) {
        const { users, creatorSocketId } = room;
        const username = users[socket.id];
        delete users[socket.id];
        io.in(roomId).emit(ACTIONS.DISCONNECTED, {
          socketId: socket.id,
          username,
        });
        if (creatorSocketId === socket.id && Object.keys(users).length === 0) {
          delete rooms[roomId];
        }
        
      }

    });
  });
});


function getAllConnectedClients(roomId) {
  const room = rooms[roomId];
  if (!room) {
    return [];
  }
  const { users } = room;
  return Object.keys(users).map((socketId) => ({
    socketId,
    username: users[socketId],
  }));
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
