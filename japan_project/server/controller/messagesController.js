import MessagesModel from "../models/messagesModel.js";

const getAllMessages = async (req, res) => {
  console.log("running".bgYellow);

  try {
    const allMessages = await MessagesModel.find();
    console.log("allMessages :>> ", allMessages);

    if (allMessages.length == 0) {
      res.status(200).json({
        message: "no information in the db",
      });
    }

    res.status(200).json({
      message: "all information from db",
      amount: allMessages.length,
      allMessages,
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error: "something went wrong",
    });
  }
};

const postMessage = async (req, res) => {
  const { from_id, to_id, message, from_name, to_name } = req.body;

  const newMessageObject = new MessagesModel({
    from_id: from_id,
    to_id: to_id,
    message: message,
    from_name: from_name,
    to_name: to_name,
  });
  try {
    const newMessage = await newMessageObject.save();
    if (newMessage) {
      return res.status(201).json({
        message: "Message sent",
        id: newMessage._id,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getMessagesById = async (req, res) => {
  const { id } = req.params;

  // if (req.query.name) {
  //   console.log("req.query.name :>> ", req.query.user2_name);
  const userById = await MessagesModel.find({
    $or: [
      { to_id: id, from_id: req.query.from_id },
      { to_id: req.query.from_id, from_id: id },
    ],
  }).exec();
  console.log(userById);
  res.status(200).json({
    message: "its working", //REVIEW that kind of message is ok for development, but maybe a more informative one would be recommended.
    amount: userById.length,
    userById,
  });
  return;
};

const getChatPartner = async (req, res) => {
  const { id } = req.params;

  // if (req.query.name) {
  //   console.log("req.query.name :>> ", req.query.user2_name);
  const userById = await MessagesModel.find({
    $or: [{ to_id: id }, { from_id: id }],
  }).exec();
  console.log(userById);
  res.status(200).json({
    message: "its working",
    amount: userById.length,
    userById,
  });
  return;
};

const getMessagesBetweenTwo = async (req, res) => {
  const { message } = req.params;

  // if (req.query.name) {
  //   console.log("req.query.name :>> ", req.query.user2_name);
  const userById = await MessagesModel.find({
    to_name: message,
    from_name: req.query.from_name,
  }).exec();
  console.log(userById);
  res.status(200).json({
    message: "its working",
    amount: userById.length,
    userById,
  });
  return;
  // }

  // if (!req.query.name) {
  //   try {
  //     const userByEmail = await UsersModel.find({ email: email }).exec();
  //     console.log(userByEmail);

  //     console.log("email :>> ", email);

  //     if (userByEmail.length > 0) {
  //       res.status(200).json({
  //         message: "its working",
  //         amount: userByEmail.length,
  //         userByEmail,
  //       });
  //     }

  //     // if (userByEmail.length == 0) {
  //     //   res.status(200).json({
  //     //     message: "no information in the db",
  //     //   });
  //     // }
  //   } catch (error) {
  //     console.log("error :>> ", error);
  //     res.status(500).json({
  //       error: "something went wrong",
  //     });
  //     return;
  //   }
  // }
};

const getMessagesTest = async (req, res) => {
  const { user1 } = req.params;
  const user2 = req.query.user2;
  console.log("req.params :>> ", req.params);

  try {
    const chatByUser = await MessagesModel.findOne({
      users: { $all: [user1, user2] },
    })
      .populate({ path: "users", select: ["name", "imageUrl"] })
      .exec();
    if (chatByUser) {
      res.status(200).json({
        message: "Chat found",
        chatByUser,
      });
    } else {
      return res.status(404).json({
        message: "Chat not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getChatsTest = async (req, res) => {
  const { user1 } = req.params;

  try {
    const chatByUser = await MessagesModel.find({
      users: user1,
    })
      .populate({ path: "users", select: ["name", "imageUrl"] })
      .exec();
    if (chatByUser) {
      res.status(200).json({
        message: "Chat found",
        chatByUser,
      });
    } else {
      return res.status(404).json({
        message: "Chat not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const postMessageTest = async (req, res) => {
  const { user1, user2, from_id, to_id, message, from_name, to_name } =
    req.body;

  try {
    const chatByUser = await MessagesModel.findOne({
      users: { $all: [user1, user2] },
    });

    if (!chatByUser) {
      const newMessageObject = {
        from_id: from_id,
        to_id: to_id,
        message: message,
        from_name: from_name,
        to_name: to_name,
      };

      const newChatByUser = new MessagesModel({
        users: [user1, user2],
        messages: [newMessageObject],
      });
      const newChatRoom = await newChatByUser.save();

      if (newChatRoom) {
        res.status(200).json({
          message: "new chat created and message saved",
        });
      }
    }

    if (chatByUser) {
      const newMessageObject = {
        from_id: from_id,
        to_id: to_id,
        message: message,
        from_name: from_name,
        to_name: to_name,
      };

      const newMessage = await MessagesModel.updateOne(
        { users: { $all: [user1, user2] } },
        { $push: { messages: newMessageObject } }
      );
      if (newMessage) {
        res.status(200).json({
          message: "message sent",
          newMessage,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export { getAllMessages }; //REVIEW, you can export all in the same pair of {} : export {getAllMessages, getChatPartner, ....}
export { getMessagesBetweenTwo };
export { getChatPartner };
export { getMessagesById };
export { postMessage };
export { getMessagesTest };
export { postMessageTest };
export { getChatsTest };
