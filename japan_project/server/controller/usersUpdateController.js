import UsersModel, { PostingsModel } from "../models/usersModel.js";

const updateUserName = async (req, res) => {
  const { user_id } = req.params;
  const { name } = req.body;

  try {
    const newUpdate = await UsersModel.findOneAndUpdate(
      { _id: user_id },
      { name: name },
      { new: true }
    );

    if (!newUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Name updatet",
      name: newUpdate.name,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateUserTargetLevel = async (req, res) => {
  const { user_id } = req.params;
  const { target_language_level } = req.body;

  try {
    const newUpdate = await UsersModel.findOneAndUpdate(
      { _id: user_id },
      { target_language_level: target_language_level },
      { new: true }
    );

    if (!newUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Language level updatet",
      target_language_level: newUpdate.target_language_level,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateUserEmail = async (req, res) => {
  const { user_id } = req.params;
  const { email } = req.body;

  try {
    const newUpdate = await UsersModel.findOneAndUpdate(
      { _id: user_id },
      { email: email },
      { new: true }
    );

    if (!newUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Email updatet",
      email: newUpdate.email,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong", errormessage: error });
  }
};

const updateUserAge = async (req, res) => {
  const { user_id } = req.params;
  const { age } = req.body;

  try {
    const newUpdate = await UsersModel.findOneAndUpdate(
      { _id: user_id },
      { age: age },
      { new: true }
    );

    if (!newUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Age updatet",
      age: newUpdate.age,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong", errormessage: error });
  }
};

const updateUserLocation = async (req, res) => {
  const { user_id } = req.params;
  const { location } = req.body;

  try {
    const newUpdate = await UsersModel.findOneAndUpdate(
      { _id: user_id },
      { location: location },
      { new: true }
    );

    if (!newUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Location updatet",
      location: newUpdate.location,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateUserPassword = async (req, res) => {
  const { user_id } = req.params;
  const { password } = req.body;
  //REVIEW are you storing the new user's password without hashing it?
  try {
    const newUpdate = await UsersModel.findOneAndUpdate(
      { _id: user_id },
      { password: password },
      { new: true }
    );

    if (!newUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Password updatet",
      password: newUpdate.password,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateUserTargetLanguage = async (req, res) => {
  const { user_id } = req.params;
  const { target_language } = req.body;

  try {
    const newUpdate = await UsersModel.findOneAndUpdate(
      { _id: user_id },
      { target_language: target_language },
      { new: true }
    );

    if (!newUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Language target updatet",
      target_language: newUpdate.target_language,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateUserImage = async (req, res) => {
  const { user_id } = req.params;
  const { imageUrl } = req.body;

  try {
    const newUpdate = await UsersModel.findOneAndUpdate(
      { _id: user_id },
      { imageUrl: imageUrl },
      { new: true }
    );

    if (!newUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Profile image updatet",
      imageUrl: newUpdate.imageUrl,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateUserAbout = async (req, res) => {
  const { user_id } = req.params;
  const { about } = req.body;

  try {
    const newUpdate = await UsersModel.findOneAndUpdate(
      { _id: user_id },
      { about: about },
      { new: true }
    );

    if (!newUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "About into updatet",
      about: newUpdate.about,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
//REVIEW you have several functions: updateUserAbout, updateUserImage, updateUserTargetLanguage, etc.. in which the only difference is the field you update. Make your code more DRY by trying to build one single function that can do it
export { updateUserName };
export { updateUserTargetLevel };
export { updateUserEmail };
export { updateUserAge };
export { updateUserLocation };
export { updateUserPassword };
export { updateUserTargetLanguage };
export { updateUserImage };
export { updateUserAbout };
