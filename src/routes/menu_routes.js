import express from "express";
import {
  createMenu,
  getMenu,
  updateMenu,
  deleteMenu,
  getAllMenu,
} from "../handlers/menu_handler.js";
import {
  validateCreateMenu,
  validateUpdateMenu,
} from "../configurations/ajv.js";
import { validateRequestBody } from "../middleware/ajv_middleware.js";

const menuRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Operations related to menu
 */

/**
 * @swagger
 * /menus/create:
 *   post:
 *     summary: Create a new menu
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '201':
 *         description: Menu created successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /menus/{menuId}:
 *   get:
 *     summary: Get a menu by ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: menuId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Menu found
 *       '404':
 *         description: Menu not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /menus:
 *   get:
 *     summary: Get all menus
 *     tags: [Menu]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           description: Number of items per page
 *     responses:
 *       '200':
 *         description: List of menus
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /menus/{menuId}:
 *   put:
 *     summary: Update a menu by ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: menuId
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
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '200':
 *         description: Menu updated successfully
 *       '404':
 *         description: Menu not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /menus/{menuId}:
 *   delete:
 *     summary: Delete a menu by ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: menuId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Menu deleted successfully
 *       '404':
 *         description: Menu not found
 *       '500':
 *         description: Internal server error
 */

menuRoutes.post("/create", validateRequestBody(validateCreateMenu), createMenu);
menuRoutes.get("/:menuId", getMenu);
menuRoutes.get("/", getAllMenu);
menuRoutes.put("/:menuId", validateRequestBody(validateUpdateMenu), updateMenu);
menuRoutes.delete("/:menuId", deleteMenu);

export default menuRoutes;
