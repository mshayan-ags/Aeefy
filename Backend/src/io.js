const Express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./User/Routes");
const Chat = require("./Chat/Routes");
const Message = require("./Message/Routes");
const socketIO = require("socket.io");

const app = Express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(User);
app.use(Chat);
app.use(Message);

const httpServer = http.createServer(app);

const io = socketIO(httpServer);

module.exports = {
  io,
  httpServer,
};
