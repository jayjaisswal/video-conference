// socket.js
const { Server } = require("socket.io");

let connections = {};
let messages = {};
let timeOnline = {};

function connectToSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "*", // Change to frontend domain in production
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on("join-call", (path) => {
            if (!connections[path]) {
                connections[path] = [];
            }
            connections[path].push(socket.id);
            timeOnline[socket.id] = new Date();

            connections[path].forEach((id) => {
                io.to(id).emit("user-joined", socket.id, connections[path]);
            });

            if (messages[path]) {
                messages[path].forEach((msg) => {
                    io.to(socket.id).emit("chat-message", msg.data, msg.sender, msg["socket-id-sender"]);
                });
            }
        });

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        socket.on("chat-message", (data, sender) => {
            const [roomId, found] = Object.entries(connections).reduce(
                ([room, isFound], [key, value]) =>
                    !isFound && value.includes(socket.id) ? [key, true] : [room, isFound],
                ["", false]
            );

            if (found) {
                if (!messages[roomId]) messages[roomId] = [];

                const msg = { sender, data, "socket-id-sender": socket.id };
                messages[roomId].push(msg);

                connections[roomId].forEach((id) => {
                    io.to(id).emit("chat-message", data, sender, socket.id);
                });

                console.log(`message ${roomId} : ${sender} => ${data}`);
            }
        });

        socket.on("disconnect", () => {
            if (timeOnline[socket.id]) {
                const duration = Math.abs(timeOnline[socket.id] - new Date());
                console.log(`Socket ${socket.id} was online for ${duration / 1000} seconds`);
                delete timeOnline[socket.id];
            }

            for (const [roomKey, socketList] of Object.entries(connections)) {
                const index = socketList.indexOf(socket.id);
                if (index !== -1) {
                    socketList.forEach((id) => {
                        io.to(id).emit("user-left", socket.id);
                    });

                    socketList.splice(index, 1);

                    if (socketList.length === 0) {
                        delete connections[roomKey];
                        delete messages[roomKey];
                    }

                    break;
                }
            }
        });
    });

    return io;
}

module.exports = connectToSocket;
