const { default: mongoose } = require("mongoose");
const { httpServer } = require("./io");

mongoose
  .connect(
    "mongodb+srv://user:Trt9fmwDpmE3I6Xw@chatapp.4yxjjzq.mongodb.net/ChatApp?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

httpServer.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});
