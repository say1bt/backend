import jwt from "jsonwebtoken";
import User from "../model/user_model.js";
import { jwtDecode } from "jwt-decode";

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        error: "Authorization is required.",
      });
    }
    const token = authorization;

    const decoded = jwtDecode(token);

    const { id } = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    const existingUser = await User.findOne({ id });

    if (existingUser) {
      req.user = existingUser.id;
    }
    next();
  } catch (error) {
    console.log("error in authenticationMiddleware", error);
    throw error;
  }
};

export { authMiddleware };
