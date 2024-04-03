import User from "../models/user.model.js";

export const getSidebarUsers = async (req, res) => {
  try {
    const cuurentUserId = req.user._id;
    const users = await User.find({ _id: { $ne: cuurentUserId } }).select(
      "fullname profilePic"
    ); // Find all users except the current user and select only the name and profilePic fields
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getting sidebar users: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
