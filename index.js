require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { postRoute } = require("./src/Routes/postRoute");
const { signupRoute } = require("./src/Routes/signupRoute");
const { connect } = require("./src/db");
const { frindsRouter } = require("./src/Routes/friends.Route");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", signupRoute);
app.use("/friend", frindsRouter);
app.use("/post", postRoute);

const server = app.listen(process.env.PORT || 4000, async () => {
  await connect();
  console.log("listening at 50000");
});

// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected");
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("user joined room" + rrom);
//   });

//   socket.on("new message", (newMessageRcv) => {
//     var chat = newMessageRcv.chat;

//     if (!chat.users) return console.log("chat.user not define");
//     chat.users.forEach((element) => {
//       if (element._id === newMessageRcv.sender._id) return;

//       socket.in(user._id).emit("message recieved", newMessageRcv);
//     });
//   });

//   socket.off("setup", () => {
//     console.log("USER DISCONNECTED");
//     socket.leave(userData._id);
//   });
// });
