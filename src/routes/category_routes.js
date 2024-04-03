import express from "express";

import {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../handlers/category_handler.js";
import { validateRequestBody } from "../middleware/ajv_middleware.js";
import { validateCreateCategory } from "../configurations/ajv.js";

const categoryRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Operations related to categories
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Category created successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /categories/{categoryId}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Category found
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /categories/{categoryId}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
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
 *     responses:
 *       '200':
 *         description: Category updated successfully
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /categories/{categoryId}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Category deleted successfully
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: Internal server error
 */

categoryRoutes.post(
  "/categories",
  validateRequestBody(validateCreateCategory),
  createCategory
);
categoryRoutes.get("/categories/:categoryId", getCategory);
categoryRoutes.put("/categories/:categoryId", updateCategory);
categoryRoutes.delete("/categories/:categoryId", deleteCategory);

export default categoryRoutes;
