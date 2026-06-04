import Order from "../models/Order.js";
import Menu from "../models/Menu.js";
import { getIO } from "../socket/socket.js";

export const createOrder = async (req, res) => {
  try {
    const { customerName, address, phone, items } = req.body;

    if (!customerName || !address || !phone) {
      return res.status(400).json({
        success: false,
        message: "All customer details are required",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart cannot be empty",
      });
    }

    let orderItems = [];
    let totalPrice = 0;

    for (const item of items) {
      const menuItem = await Menu.findById(item.menuId);

      if (!menuItem) {
        return res.status(404).json({
          success: false,
          message: `Menu item not found`,
        });
      }

      orderItems.push({
        menuId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
      });

      totalPrice += menuItem.price * item.quantity;
    }

    const order = await Order.create({
      customerName,
      address,
      phone,
      items: orderItems,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatus = [
      "Order Received",
      "Preparing",
      "Out for Delivery",
      "Delivered",
    ];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    const io = getIO();

    io.to(order._id.toString()).emit("status-update", {
      orderId: order._id,
      status: order.status,
    });

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
