import Menu from "../model/menu_model.js";

const createMenu = async (req, res) => {
  try {
    const { rating, comment, timestamp } = req.body;
    const menu = await Menu.create({ rating, comment, timestamp });
    res.status(201).json({ menu });
  } catch (error) {
    console.error("Error creating menu:", error);
    res.status(500).json({ error: "Could not create menu" });
  }
};

const getMenu = async (req, res) => {
  try {
    const { menuId } = req.params;
    const menu = await Menu.findByPk(menuId);
    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }
    res.status(200).json({ menu });
  } catch (error) {
    console.error("Error getting menu:", error);
    res.status(500).json({ error: "Could not get menu" });
  }
};

const getAllMenu = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const offset = (page - 1) * pageSize;

    const menus = await Menu.findAll({
      limit: pageSize,
      offset: offset,
    });

    res.json(menus);
  } catch (error) {
    console.error("Error retrieving menus:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateMenu = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { rating, comment, timestamp } = req.body;
    const menu = await Menu.findByPk(menuId);
    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }
    await menu.update({ rating, comment, timestamp });
    res.status(200).json({ message: "Menu updated successfully" });
  } catch (error) {
    console.error("Error updating menu:", error);
    res.status(500).json({ error: "Could not update menu" });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { menuId } = req.params;
    const menu = await Menu.findByPk(menuId);
    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }
    await menu.destroy();
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({ error: "Could not delete menu" });
  }
};

export { createMenu, getMenu, getAllMenu, updateMenu, deleteMenu };
