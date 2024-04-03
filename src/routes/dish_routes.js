import express from "express";
import {
  createDish,
  getDish,
  updateDish,
  deleteDish,
} from "../handlers/dish_handler.js";
import {
  validateCreateDish,
  validateUpdateDish,
} from "../configurations/ajv.js";
import { validateRequestBody } from "../middleware/ajv_middleware.js";

const dishRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dish
 *   description: Operations related to dishes
 */

/**
 * @swagger
 * /dishes:
 *   post:
 *     summary: Create a new dish
 *     tags: [Dish]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Dish created successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /dishes/{dishId}:
 *   get:
 *     summary: Get a dish by ID
 *     tags: [Dish]
 *     parameters:
 *       - in: path
 *         name: dishId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Dish found
 *       '404':
 *         description: Dish not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /dishes/{dishId}:
 *   put:
 *     summary: Update a dish by ID
 *     tags: [Dish]
 *     parameters:
 *       - in: path
 *         name: dishId
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
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Dish updated successfully
 *       '404':
 *         description: Dish not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /dishes/{dishId}:
 *   delete:
 *     summary: Delete a dish by ID
 *     tags: [Dish]
 *     parameters:
 *       - in: path
 *         name: dishId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Dish deleted successfully
 *       '404':
 *         description: Dish not found
 *       '500':
 *         description: Internal server error
 */

dishRoutes.post("/dishes", validateRequestBody(validateCreateDish), createDish);
dishRoutes.get("/dishes/:dishId", getDish);
dishRoutes.put(
  "/dishes/:dishId",
  validateRequestBody(validateUpdateDish),
  updateDish
);
dishRoutes.delete("/dishes/:dishId", deleteDish);

export default dishRoutes;
