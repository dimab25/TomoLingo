import UsersModel from "../models/users.Model.js";
import { hashingPassword } from "../utilities/hashPassword.js";
import uploadingImage from "../utilities/UploadingImages.js";

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

const imageUpload = async (req, res) => {
  console.log("imageupload working");
  console.log("req :>> ", req.file);
  if (!req.file) {
    return res.status(500).json({ error: "File not supported" });
  }
  if (req.file) {
    console.log("will be uploaded".bgYellow);

    const sentImage = await uploadingImage(req.file);
    console.log("sentImage :>> ".bgBlue, sentImage);
    if (!sentImage) {
      return res.status(400).json({ error: "Image couldn not be uploaded" });
    }

    if (sentImage) {
      res.status(200).json({
        message: "image uploaded",
        imageUrl: sentImage.secure_url,
      });
    }
  }
};

const registerNewUser = async (req, res) => {
  console.log("registeruserworks");
  const { name, password, email, age, native_language,target_language_level, target_language, about, imageUrl} = req.body;
  // Does user exist in database?
  try {
    const existingUser = await UsersModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exist in db",
      });
    }

    if (!existingUser) {
      // Hash Password
      const hashedPassword = await hashingPassword(password);
      console.log("hashedPassword :>> ", hashedPassword);

      if (!hashedPassword) {
        return res
          .status(500)
          .json({ error: "We could not register the user" });
      }

      if (hashedPassword) {
        const newUserObject = new UsersModel({
          name: name,
          email: email,
          password: hashedPassword,
          age: age,
          about: about,
          native_language: native_language,
          target_language_level:target_language_level,
          target_language: target_language,
          imageUrl: imageUrl
            // ? imageUrl
            // : "https://res-console.cloudinary.com/dggcfjjc3/thumbnails/v1/image/upload/v1740755825/YW5vbnltX29tb2xnZg==/drilldown",
        });
        const newUser = await newUserObject.save();
        if (newUser) {
          return res.status(201).json({
            message: "User registration succesfull",
            email: newUser.email,
            imageUrl: newUser.imageUrl,
            id: newUser._id,
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export { getAllUsers };
export { getAllUsersEmails };
export { imageUpload };
export { registerNewUser };
