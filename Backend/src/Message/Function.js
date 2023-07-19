const { default: mongoose } = require("mongoose");
const MessageModel = require("./Model");
const ChatModal = require("../Chat/Model");

async function AddMessage(Credentials, id) {
  try {
    if (!Credentials?.Text && !Credentials?.Chat && id) {
      return { status: 400, message: "Please Fill All The Fields" };
    }

    const Message = new MessageModel({
      SentBy: new mongoose.Types.ObjectId(id),
      Chat: new mongoose.Types.ObjectId(Credentials?.Chat),
      Text: Credentials?.Text,
    });

    await Message.save();
    
    ChatModal.findOne({ _id: Credentials?.Chat })
      .populate("Person1", "Person2")
      .then(async (Chat) => {
        if (Chat?.Person1?._id == id) {
          io.to(Chat?.Person2?._id).emit("Message", Credentials?.Text);
        } else {
          io.to(Chat?.Person1?._id).emit("Message", Credentials?.Text);
        }
      });

    return {
      id: Message?._id,
      status: 200,
      message: "Message Added in Succesfully",
    };
  } catch (error) {
    return { status: 500, message: error };
  }
}

async function DeleteMessage(Message_id, id) {
  try {
    const FindAndDelete = MessageModel.findOne({ _id: Message_id })
      .populate("SentBy")
      .then(async (Message) => {
        if (Message?.SentBy?._id == id) {
          const Delete = await MessageModel.findByIdAndDelete({
            _id: Message_id,
          })
            .then((docs) => {
              return { status: 200, message: "Message Deleted Succesfully" };
            })
            .catch((error) => {
              return { status: 500, message: error };
            });
          return await Delete;
        } else
          return { status: 500, message: "You are Not Allowed Delete Message" };
      })
      .catch((err) => {
        return { status: 500, message: err };
      });

    return await FindAndDelete;
  } catch (error) {
    return { status: 500, message: error };
  }
}

async function GetMessage(Message_id) {
  try {
    const Data = MessageModel.findOne({ _id: Message_id })
      .then((Message) => {
        return { status: 200, data: Message };
      })
      .catch((err) => {
        return { status: 500, message: err };
      });
    return await Data;
  } catch (error) {
    return { status: 500, message: error };
  }
}

async function GetAllMessages(Chat_Id) {
  try {
    const Data = MessageModel.find()
      .populate("Chat")
      .then((Message) => {
        Message = Message.filter(function (a) {
          return a?.Chat?._id == Chat_Id;
        });
        return { status: 200, data: Message };
      })
      .catch((err) => {
        return { status: 500, message: err };
      });
    return await Data;
  } catch (error) {
    return { status: 500, message: error };
  }
}

module.exports = {
  AddMessage,
  DeleteMessage,
  GetMessage,
  GetAllMessages,
};
