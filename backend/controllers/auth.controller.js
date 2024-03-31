export const login = (req, res) => {
  res.send("Login");
};

export const register = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gemder } = req.body;
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const logout = (req, res) => {
  res.send("Logout");
};
