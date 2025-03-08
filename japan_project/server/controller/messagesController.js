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
  const { from_id, to_id, message, from_name, to_name  } = req.body;

  const newMessageObject = new MessagesModel({
    from_id: from_id,
    to_id: to_id,
    message: message,
    from_name: from_name,
    to_name: to_name,
      })
      try {
          const newMessage = await newMessageObject.save();
      if(newMessage){
        return res.status(201).json({
          message: "Message sent",
          id: newMessage._id,
                         });
      }
      } catch (error) {
        return res.status(500).json({ error: "Something went wrong" });
      }
      }
    


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

export { getAllMessages };
export { getMessagesBetweenTwo };

export { postMessage};