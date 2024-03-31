import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  // Set the cookie in the response header
  res.cookie("jwt", token, {
    httpOnly: true, // This cookie cannot be accessed by client-side scripts
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    sameSite: "strict", // The cookie is sent only to the same site as the domain in the address bar (no cross-site access).
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS
  });
};

export default generateTokenAndSetCookie;
