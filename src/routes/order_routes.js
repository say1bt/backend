import express from "express";
import {
  placeOrder,
  getOrder,
  getOrders,
  updateOrderStatus,
  completeOrder,
} from "../handlers/order_handler.js";
import {
  validatePlaceOrder,
  validateUpdateOrderStatus,
} from "../configurations/ajv.js";
import { validateRequestBody } from "../middleware/ajv_middleware.js";

const orderRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Operations related to orders
 */

/**
 * @swagger
 * /orders/place:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_name:
 *                 type: string
 *               customer_phone:
 *                 type: string
 *               location:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menu_id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *               total_price:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Order placed successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Order found
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           description: Filter orders by status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           description: Sort orders by a specific field
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           description: Sort order (ascending or descending)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           description: Start date of the range (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           description: End date of the range (YYYY-MM-DD)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: Number of items per page
 *     responses:
 *       '200':
 *         description: List of orders
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /orders/{orderId}/status:
 *   put:
 *     summary: Update the status of an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
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
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Order status updated successfully
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /orders/{orderId}/complete:
 *   put:
 *     summary: Mark an order as completed by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Order marked as completed successfully
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error
 */

orderRoutes.post("/place", validateRequestBody(validatePlaceOrder), placeOrder);
orderRoutes.get("/:orderId", getOrder);
orderRoutes.get("/", getOrders);
orderRoutes.put(
  "/:orderId/status",
  validateRequestBody(validateUpdateOrderStatus),
  updateOrderStatus
);
orderRoutes.put("/:orderId/complete", completeOrder);

export default orderRoutes;
