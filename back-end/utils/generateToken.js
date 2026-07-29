import jwt from "jsonwebtoken";

/** Generate JWT token for a user */
export default function generateToken(userId, role) {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function setTokenCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true, // JS can't access it
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict", // prevents CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });
}
