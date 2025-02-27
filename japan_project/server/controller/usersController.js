import UsersModel from "../models/users.Model.js";

const getAllUsers = async (req, res) => {
  console.log("running".bgYellow);

  try {
    const allUsers = await UsersModel.find();
    console.log("allUsers :>> ", allUsers);

    if (allUsers.length == 0) {
      res.status(200).json({
        message: "no information in the db",
      });
    }

    res.status(200).json({
      message: "all information from db",
      amount: allUsers.length,
      allUsers,
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error: "something went wrong",
    });
  }
};

const getAllUsersEmails = async (req, res) => {
  const { email } = req.params;

  if (req.query.name) {
    console.log("req.query.name :>> ", req.query.name);
    const userByEmail = await UsersModel.find({
      email: email,
      name: req.query.name,
    }).exec();
    console.log(userByEmail);
    res.status(200).json({
      message: "its working",
      amount: userByEmail.length,
      userByEmail,
    });
    return;
  }

  if (!req.query.name) {
    try {
      const userByEmail = await UsersModel.find({ email: email }).exec();
      console.log(userByEmail);

      console.log("email :>> ", email);

      if (userByEmail.length > 0) {
        res.status(200).json({
          message: "its working",
          amount: userByEmail.length,
          userByEmail,
        });
      }

      if (userByEmail.length == 0) {
        res.status(200).json({
          message: "no information in the db",
        });
      }
    } catch (error) {
      console.log("error :>> ", error);
      res.status(500).json({
        error: "something went wrong",
      });
      return;
    }
  }
};

export { getAllUsers };
export { getAllUsersEmails };
