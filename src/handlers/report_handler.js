import { Op } from "sequelize";
import { sequelize } from "../utils/database_utils.js";
import Order from "../model/order_model.js";
import Menu from "../model/menu_model.js";

const getTotalSales = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const totalSales = await Order.sum("total_price", {
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    res.json({ totalSales });
  } catch (error) {
    console.error("Error fetching total sales:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTopSellingItems = async (req, res) => {
  try {
    const topSellingItems = await Order.findAll({
      attributes: [
        "menuItem",
        [sequelize.fn("sum", sequelize.col("quantity")), "totalQuantity"],
      ],
      group: ["menuItem"],
      order: [[sequelize.literal("totalQuantity"), "DESC"]],
      include: [{ model: Menu, attributes: ["name"] }],
      limit: 10,
    });
    res.json(topSellingItems);
  } catch (error) {
    console.error("Error fetching top-selling items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAverageOrderValue = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const averageOrderValue = await Order.findAll({
      attributes: [
        [
          sequelize.fn("AVG", sequelize.col("total_price")),
          "averageOrderValue",
        ],
      ],
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    res.json(averageOrderValue);
  } catch (error) {
    console.error("Error fetching average order value:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getTotalSales, getTopSellingItems, getAverageOrderValue };
