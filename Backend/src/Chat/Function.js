const { default: mongoose } = require("mongoose");
const ChatModel = require("./Model");

async function AddChat(Credentials, id) {
  try {
    if (!Credentials?.Person && id) {
      return { status: 400, message: "Please Fill All The Fields" };
    }

    const Chat = new ChatModel({
      Person1: new mongoose.Types.ObjectId(id),
      Person2: new mongoose.Types.ObjectId(Credentials?.Person),
      UnreadMessages: 0,
      Chat_ID: `${id}_${Credentials?.Person}`,
    });

    await Chat.save();
    return { id: Chat?._id, status: 200, message: "Chat Added in Succesfully" };
  } catch (error) {
    console.log(error);

    return { status: 500, message: error };
  }
}

async function DeleteChat(Chat_id, id) {
  try {
    const FindAndDelete = ChatModel.findOne({ _id: Chat_id })
      .populate("Person1", "Person2")
      .then(async (Chat) => {
        if (Chat?.Person1?._id == id || Chat?.Person2?._id == id) {
          const Delete = await ChatModel.findByIdAndDelete({ _id: Chat_id })
            .then((docs) => {
              return { status: 200, message: "Chat Deleted Succesfully" };
            })
            .catch((error) => {
              return { status: 500, message: error };
            });
          return await Delete;
        } else
          return { status: 500, message: "You are Not Allowed Delete Chat" };
      })
      .catch((err) => {
        return { status: 500, message: err };
      });

    return await FindAndDelete;
  } catch (error) {
    return { status: 500, message: error };
  }
}

async function GetChat(Chat_id, id) {
  try {
    const Data = ChatModel.findOne({ _id: Chat_id })
      .populate("Person1", "Person2")
      .then((Chat) => {
        if (Chat?.Person1?._id == id || Chat?.Person2?._id == id) {
          return { status: 200, data: Chat };
        } else
          return {
            status: 500,
            message: "You are Not Allowed To Get Chat Config",
          };
      })
      .catch((err) => {
        return { status: 500, message: err };
      });
    return await Data;
  } catch (error) {
    return { status: 500, message: error };
  }
}

async function GetChatWithPerson(Person, id) {
  try {
    const Data = ChatModel.find()
      .populate("Person1", "Person2")
      .then((Chat) => {
        let newChat;
        Chat.filter(function (a) {
          if (
            (a?.Person1?._id == Person || a?.Person2?._id == Person) &&
            (a?.Person1?._id == id || a?.Person2?._id == id)
          ) {
            newChat = a;
          }
        });
        console.log(Chat);
        return { status: 200, data: newChat };
      })
      .catch((err) => {
        return { status: 500, message: err };
      });

    return await Data;
  } catch (error) {
    return { status: 500, message: error };
  }
}

async function GetAllChats(id) {
  try {
    const Data = ChatModel.find()
      .populate("Person1", "Person2")
      .then((Chat) => {
        Chat = Chat.filter(function (a) {
          return a?.Person1?._id == id || a?.Person2?._id == id;
        });
        return { status: 200, data: Chat };
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
  AddChat,
  DeleteChat,
  GetChat,
  GetAllChats,
  GetChatWithPerson,
};
