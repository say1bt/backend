import Order from "../model/order_model.js";

const placeOrder = async (req, res) => {
  try {
    const { customer_name, customer_phone, location, items, total_price } =
      req.body;

    const order = await Order.create({
      customer_name,
      customer_phone,
      location,
      items,
      total_price,
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, error: "Error placing order" });
  }
};

const getOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({ success: false, error: "Error getting order" });
  }
};

const getOrders = async (req, res) => {
  try {
    const { status, sortBy, sortOrder, startDate, endDate, page, limit } =
      req.query;
    const queryOptions = {
      where: {},
      order: [],
    };

    if (status) {
      queryOptions.where.status = status;
    }

    if (sortBy && sortOrder) {
      queryOptions.order.push([sortBy, sortOrder.toUpperCase()]);
    }

    if (startDate && endDate) {
      queryOptions.where.createdAt = {
        [Op.between]: [startDate, endDate],
      };
    }

    const pageNumber = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * itemsPerPage;

    const orders = await Order.findAndCountAll({
      ...queryOptions,
      offset,
      limit: itemsPerPage,
    });

    const totalPages = Math.ceil(orders.count / itemsPerPage);

    res.status(200).json({
      success: true,
      orders: orders.rows,
      currentPage: pageNumber,
      totalPages,
    });
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ success: false, error: "Error getting orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    await order.update({ status });

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({ success: false, error: "Error updating order status" });
  }
};

const completeOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    await order.update({ status: "completed" });

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error completing order:", error);
    res.status(500).json({ success: false, error: "Error completing order" });
  }
};

export { placeOrder, getOrder, getOrders, updateOrderStatus, completeOrder };
