const express = require("express")
const app = express();
const { createServer } = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose") ;
const connectToSocket = require("./controllers/socketManager");

const server = createServer(app);  // ✅ HTTP server for socket.io
const httpServer = connectToSocket(server);
const {dbConnection} = require("./config/dbconnection.js");
const cors = require("cors");
require("dotenv").config();
port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}))
const userRoutes = require("./routes/userRoutes.js");



server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

app.get("/", (req, res)=>{
    return res.json({
        "Name":"World"
    })//res.send("Hello World");
})

app.use("/api/v1/users", userRoutes);

dbConnection();

