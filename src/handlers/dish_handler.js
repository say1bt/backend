import Dish from "../model/dish_model.js";

const createDish = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const dish = await Dish.create({ name, description, price });
    res.status(201).json({ dish });
  } catch (error) {
    console.error("Error creating dish:", error);
    res.status(500).json({ error: "Could not create dish" });
  }
};

const getDish = async (req, res) => {
  try {
    const { dishId } = req.params;
    const dish = await Dish.findByPk(dishId);
    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }
    res.status(200).json({ dish });
  } catch (error) {
    console.error("Error getting dish:", error);
    res.status(500).json({ error: "Could not get dish" });
  }
};

const updateDish = async (req, res) => {
  try {
    const { dishId } = req.params;
    const { name, description, price } = req.body;
    const dish = await Dish.findByPk(dishId);
    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }
    await dish.update({ name, description, price });
    res.status(200).json({ message: "Dish updated successfully" });
  } catch (error) {
    console.error("Error updating dish:", error);
    res.status(500).json({ error: "Could not update dish" });
  }
};

const deleteDish = async (req, res) => {
  try {
    const { dishId } = req.params;
    const dish = await Dish.findByPk(dishId);
    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }
    await dish.destroy();
    res.status(200).json({ message: "Dish deleted successfully" });
  } catch (error) {
    console.error("Error deleting dish:", error);
    res.status(500).json({ error: "Could not delete dish" });
  }
};

export { createDish, getDish, updateDish, deleteDish };
