const { Server, Socket } = require("socket.io");

const connections = {};
const messages = {};
const timeOnline = {};
const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
    },
  });

  io.on("connection", (client) => {
    console.log("something connected");
    Socket.on("join-call", (path) => {
      if (connections[path] === undefined) {
        connections[path] = [];
      }
      connections[path].push(Socket.id);
      timeOnline[Socket.id] = new Date();

      // connections[path].forEach(ele =>{
      //     io.to(ele).emit("user-joined", Socket.id, connections[path])
      // })

      // or

      for (let i = 0; ci < connections[path].length; i++) {
        io.to(connections[path][i]).emit(
          "user-joined",
          Socket.id,
          connections[path]
        );
      }

      if (messages[path] != undefined) {
        for (let i = 0; ci < connections[path].length; i++) {
          io.to(Socket.id).emit(
            "chat-message",
            messages[path][i]["data"],
            messages[path][i]["sender"],
            messages[path][a]["socket-id-sender"]
          );
        }
      }
    });

    Socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", Socket.id, message);
    });

    Socket.on("chat-message", (data, sender) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([matchingRoom, isFound], [roomKey, roomValue]) => {
          if (isFound && roomValue.includes(Socket.id)) {
            return [roomKey, true];
          }
          return [room, isFound];
        },
        ["", false]
      );

      if (found === true) {
        if (messages[matchingRoom] === undefined) {
          message[matchingRoom] = [];
        }

        messages[matchingRoom].push({
          sender: sender,
          data: data,
          "socket-id-sender": Socket.id,
        });
        console.log("message", key, ":", sender, data);
        connections[matchingRoom].forEach((ele) => {
          io.to(ele).emit("chat-message", data, sender, Socket.id);
        });
      }
    });

    Socket.on("disconnect", () => {
      var diffTime = Math.abs(timeOnline[Socket.id] - Date.now());
      var key;
      for (const [k, v] of JSON.parse(
        JSON.stringify(Object.entries(connections))
      )) {
        for (let i = 0; i < v.length; ++i) {
          if (v[i] === Socket.id) {
            key = k;

            for (let i = 0; i < connections[key].length; ++i) {
              io.to(connections[key][i]).emit("user-left", Socket.id);
            }

            var index = connections[key].indexOf(Socket.id);
            connections[key].splice(index, 1);

            if (connections[key].length === 0) {
              delete connections[key];
            }
          }
        }
      }
    });
  });

  return io;
};

module.exports = connectToSocket; // Corrected: Use CommonJS export
