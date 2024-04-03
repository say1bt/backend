import express from "express";
import {
  createRestaurant,
  getRestaurant,
  getAllRestaurants,
  updateRestaurant,
  deleteRestaurant,
} from "../handlers/restaurant_handler.js";
import { validateRestaurant } from "../configurations/ajv.js";
import { validateRequestBody } from "../middleware/ajv_middleware.js";

const restaurantRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: Operations related to restaurants
 */

/**
 * @swagger
 * /restaurants/create:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               hyg_rating:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Restaurant created successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /restaurants/{restaurantId}:
 *   get:
 *     summary: Get a restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Restaurant found
 *       '404':
 *         description: Restaurant not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 *     responses:
 *       '200':
 *         description: List of restaurants
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /restaurants/{restaurantId}:
 *   put:
 *     summary: Update a restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               hyg_rating:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Restaurant updated successfully
 *       '404':
 *         description: Restaurant not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /restaurants/{restaurantId}:
 *   delete:
 *     summary: Delete a restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Restaurant deleted successfully
 *       '404':
 *         description: Restaurant not found
 *       '500':
 *         description: Internal server error
 */

restaurantRouter.post(
  "/create",
  validateRequestBody(validateRestaurant),
  createRestaurant
);
restaurantRouter.get("/:restaurantId", getRestaurant);
restaurantRouter.get("/", getAllRestaurants);
restaurantRouter.put(
  "/:restaurantId",
  validateRequestBody(validateRestaurant),
  updateRestaurant
);
restaurantRouter.delete("/:restaurantId", deleteRestaurant);

export default restaurantRouter;
