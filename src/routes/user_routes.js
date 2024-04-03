import express from "express";
import {
  createUser,
  loginUser,
  newAccessToken,
  logoutUser,
} from "../handlers/user_handler.js";
import { validateRequestBody } from "../middleware/ajv_middleware.js";
import {
  validateCreateUser,
  validateLoginUser,
} from "../configurations/ajv.js";

const userRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to Users
 */

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '409':
 *         description: User already exists
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '400':
 *         description: User's password is incorrect
 *       '404':
 *         description: User with specified email does not exist
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/new-token:
 *   get:
 *     summary: Get a new access token
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Refresh token successful
 *       '401':
 *         description: Invalid token
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: Log out a user
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Logout successful
 *       '204':
 *         description: No token found
 *       '404':
 *         description: User does not exist
 *       '500':
 *         description: Internal server error
 */

userRoutes.post("/create", validateRequestBody(validateCreateUser), createUser);
userRoutes.post("/login", validateRequestBody(validateLoginUser), loginUser);
userRoutes.get("/new-token", newAccessToken);
userRoutes.get("/logout", logoutUser);

export default userRoutes;
