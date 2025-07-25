const express = require("express")
const app = express();
const {dbConnection} = require("./config/dbconnection.js");
const { createServer } = require("http");
const connectToSocket = require("./controllers/socketManager");

const server = createServer(app);  // ✅ HTTP server for socket.io
const httpServer = connectToSocket(server);

port = process.env.PORT || 4000;

const cors = require("cors");
require("dotenv").config();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://video-conference-beige.vercel.app"
  ],
  credentials: true,
}));

app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}))
const userRoutes = require("./routes/userRoutes.js");
const iceRoute = require("./routes/iceRoute");

app.use("/api/ice", iceRoute);



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

