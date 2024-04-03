import express from "express";
import {
  getTotalSales,
  getTopSellingItems,
  getAverageOrderValue,
} from "../handlers/report_handler.js";

const reportRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Operations related to reports
 */

/**
 * @swagger
 * /report/total-sales:
 *   get:
 *     summary: Get total sales within a specified date range
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           description: Start date of the range (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           description: End date of the range (YYYY-MM-DD)
 *     responses:
 *       '200':
 *         description: Total sales within the specified date range
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /report/top-selling-items:
 *   get:
 *     summary: Get top selling items
 *     tags: [Reports]
 *     responses:
 *       '200':
 *         description: List of top selling items
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /report/average-order-value:
 *   get:
 *     summary: Get average order value within a specified date range
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           description: Start date of the range (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           description: End date of the range (YYYY-MM-DD)
 *     responses:
 *       '200':
 *         description: Average order value within the specified date range
 *       '500':
 *         description: Internal server error
 */

reportRoutes.get("/total-sales", getTotalSales);
reportRoutes.get("/top-selling-items", getTopSellingItems);
reportRoutes.get("/average-order-value", getAverageOrderValue);

export default reportRoutes;
