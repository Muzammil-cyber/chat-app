import User from "../models/user.model.js";
import bycrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const register = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const profilePic =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create new user
    // Check Misssing Fields
    if (!fullname || !username || !password) {
      return res.status(400).json({ error: "Missing Fields" });
    }

    // Hash Password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic,
    });
    await newUser.save();
    // Return JWT
    await generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      gender: newUser.gender,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    await generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      id: user._id,
      username: user.username,
      fullname: user.fullname,
      profilePic: user.profilePic,
      gender: user.gender,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
