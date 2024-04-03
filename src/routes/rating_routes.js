import express from "express";

import {
  createRating,
  getRating,
  updateRating,
  deleteRating,
} from "../handlers/rating_handler.js";
import {
  validateCreateRating,
  validateUpdateRating,
} from "../configurations/ajv.js";
import { validateRequestBody } from "../middleware/ajv_middleware.js";

const ratingRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: Operations related to ratings
 */

/**
 * @swagger
 * /ratings:
 *   post:
 *     summary: Create a new rating
 *     tags: [Ratings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Rating created successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /ratings/{ratingId}:
 *   get:
 *     summary: Get a rating by ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: ratingId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Rating found
 *       '404':
 *         description: Rating not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /ratings/{ratingId}:
 *   put:
 *     summary: Update a rating by ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: ratingId
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
 *               score:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Rating updated successfully
 *       '404':
 *         description: Rating not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /ratings/{ratingId}:
 *   delete:
 *     summary: Delete a rating by ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: ratingId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Rating deleted successfully
 *       '404':
 *         description: Rating not found
 *       '500':
 *         description: Internal server error
 */

ratingRoutes.post(
  "/ratings",
  validateRequestBody(validateCreateRating),
  createRating
);
ratingRoutes.get("/ratings/:ratingId", getRating);
ratingRoutes.put(
  "/ratings/:ratingId",
  validateRequestBody(validateUpdateRating),
  updateRating
);
ratingRoutes.delete("/ratings/:ratingId", deleteRating);

export default ratingRoutes;
