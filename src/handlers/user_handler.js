import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user_model.js";
import Auth from "../model/auth_model.js";
import { getAccessToken, getRefreshToken } from "../utils/token_utils.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with email ${email} does not exist` });
    }

    const savedPassword = user?.password;

    const isMatch = await bcrypt.compare(password, savedPassword);

    if (!isMatch) {
      return res.status(400).json({ message: `User's password is incorrect` });
    }

    const access_token = getAccessToken(user?.id);
    const refresh_token = getRefreshToken(user?.id);

    const [auth, created] = await Auth.findOrCreate({
      where: { user_id: user?.id },
      defaults: { refresh_token },
    });

    if (!created) {
      await Auth.update({ refresh_token }, { where: { user_id: user?.id } });
    }

    res.cookie("jwt", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Login successful", access_token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const newAccessToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const refresh_token = cookies.jwt;

  try {
    const auth = await Auth.findOne({ where: { refresh_token } });
    if (!auth) {
      return res.status(403).json({ message: "Invalid token" });
    }

    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || auth?.user_id !== decoded?.id) {
          return res.status(403).json({ message: "Invalid token" });
        }

        const access_token = getAccessToken(auth?.user_id);

        return res.status(200).json({
          message: "Refresh token successful",
          access_token: access_token,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logoutUser = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(204).json({ message: "No token found" });
  }

  const refresh_token = cookies.jwt;

  try {
    const auth = await Auth.findOne({ where: { refresh_token } });
    console.log("auth", auth);
    if (!auth) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const result = await Auth.update(
      { refresh_token: null },
      { where: { refresh_token } }
    );

    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { createUser, loginUser, newAccessToken, logoutUser };
