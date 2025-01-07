const { User } = require("../models/users");

const getUsers = async (req, res) => {
  try {
    const allUser = await User.find();

    res.status(200).json({
      users: allUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user_id = req.params["user_id"];

    const singleUser = await User.findOne({ _id: user_id });

    if (!singleUser) {
      return res.json({
        msg: "this user is does not exist",
      });
    } else {
      return res.json({
        user: singleUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
      error: error,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password, age } = req.body;
    await User.create({ username: username, password, age });

    res.json({
      msg: "user added",
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
      error: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user_id = req.params["user_id"];

    const singleUser = await User.findOne({ _id: user_id });

    const user_data = req.body;

    if (!singleUser) {
      return res.json({
        msg: "this user is does not exist",
      });
    } else {
      if (user_data["username"]) {
        singleUser["username"] = user_data["username"];
      }
      if (user_data["age"]) {
        singleUser["age"] = user_data["age"];
      }
      if (user_data["password"]) {
        singleUser["password"] = user_data["password"];
      }

      singleUser.save();
      return res.status(202).json({
        msg: "user updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
      error: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user_id = req.params["user_id"];

    const singleUser = await User.findOne({ _id: user_id });

    if (!singleUser) {
      return res.json({
        msg: "this user is does not exist",
      });
    } else {
      await User.deleteOne({ _id: user_id });
      return res.json({
        msg: "user removed",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
      error: error,
    });
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
