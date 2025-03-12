import { text } from "express";
import UsersModel, { PostingsModel } from "../models/usersModel.js";
import {
  hashingPassword,
  verifyPassword,
} from "../utilities/passwordServices.js";
import { generateToken } from "../utilities/tokenServices.js";
import uploadingImage from "../utilities/UploadingImages.js";

const getAllUsers = async (req, res) => {
  console.log("running".bgYellow);

  try {
    const allUsers = await UsersModel.find().populate("posts");

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

const getUserByEmail = async (req, res) => {
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

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const userById = await UsersModel.find({ _id: id })
      .populate("posts")
      .exec();
    console.log("userById", userById);

    if (userById.length > 0) {
      res.status(200).json({
        message: "its working",
        amount: userById.length,
        userById,
      });
    }

    if (userById.length == 0) {
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
  const {
    name,
    password,
    email,
    age,
    native_language,
    target_language_level,
    target_language,
    about,
    imageUrl,
    location,
  } = req.body;
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
          target_language_level: target_language_level,
          target_language: target_language,
          imageUrl: imageUrl
            ? imageUrl
            : "https://res.cloudinary.com/dggcfjjc3/image/upload/v1741016734/Profile_avatar_placeholder_large_orgqrl.png",
          location: location,
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

const login = async (req, res) => {
  const { email, password } = req.body;
  // find user in db
  try {
    const existingUser = await UsersModel.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(404).json({
        message: "Email does not exist in the database",
      });
    }
    if (existingUser) {
      // 2. Password varify
      const isPasswordCorrect = await verifyPassword(
        req.body.password,
        existingUser.password
      );

      if (!isPasswordCorrect) {
        return res.status(406).json({
          message: "Password not correct",
        });
      }
      if (isPasswordCorrect) {
        // 3. Generate token
        const token = generateToken(existingUser._id);
        console.log("token :>> ".bgBlue, token);

        if (!token) {
          return res.status(500).json({
            error: "Something went wrong",
          });
        }
        if (token) {
          return res.status(200).json({
            message: "Login succesful",
            user: {
              id: existingUser._id,
              email: existingUser.email,
              name: existingUser.name,
              image: existingUser.imageUrl,
            },
            token,
          });
        }
      }
    }
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({
      error: "Something went wrong during login",
      errorMessage: error.message,
    });
  }
};

const getMyProfile = async (req, res) => {
  console.log("myprofile");

  // console.log('process.env.JWT_SECRET_KEY :>> ', process.env.JWT_SECRET_KEY);
  if (!req.user) {
    return res.status(404).json({ error: "User needs to login again" });
  }
  if (req.user) {
    console.log("req.user._id :>> ", req.user._id);
    return res.status(200).json({
      message: "Authorized User",
      _id: req.user._id,
      name: req.user.name,
      age: req.user.age,
      imageUrl: req.user.imageUrl,
    });
  }
};

const postUserImage = async (req, res) => {
  const { imageUrl, text, user_id } = req.body;

  const newAddObject = new PostingsModel({
    text: text,
    imageUrl: imageUrl,
    user_id: user_id,
  });

  try {
    const newAdd = await newAddObject.save();

    if (newAdd) {
      console.log("newAdd :>> ", newAdd._id);
      await UsersModel.findOneAndUpdate(
        { _id: user_id },
        { $push: { posts: newAdd._id } }, // Use $push to add the post ID
        // { new: true } // Return updated document
      );


      return res.status(201).json({
        message: "Comment sent",
        id: newAdd._id,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};


// const addPostId =await addPostIdObject.findOneAndUpdate({_id: user_id}, {posts: newAdd._id});
// const addPostIdObject = new UsersModel({
//   _id: user_id,

// })



export { getAllUsers };
export { getUserByEmail };
export { getUserById };
export { imageUpload };
export { registerNewUser };
export { login };
export { getMyProfile };
export { postUserImage };
