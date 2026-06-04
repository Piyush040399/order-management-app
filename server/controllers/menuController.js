import Menu from "../models/Menu.js";
import menuData from "../data/menuData.js";

export const getAllMenuItems = async (req, res) => {
  try {
    const existingItems = await Menu.countDocuments();

    if (existingItems === 0) {
      await Menu.insertMany(menuData);
    }

    const menu = await Menu.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: menu.length,
      data: menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
