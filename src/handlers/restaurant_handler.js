import Restaurant from "../model/restaurant_model.js";

export const createRestaurant = async (req, res) => {
  try {
    const { name, phone, location, description, hyg_rating } = req.body;
    const restaurant = await Restaurant.create({
      name,
      phone,
      location,
      description,
      hyg_rating,
    });
    res.status(201).json(restaurant);
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ error: "Failed to create restaurant" });
  }
};

export const getRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error getting restaurant:", error);
    res.status(500).json({ error: "Failed to get restaurant" });
  }
};

export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error getting all restaurants:", error);
    res.status(500).json({ error: "Failed to get restaurants" });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const { name, phone, location, description, hyg_rating } = req.body;
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    restaurant.name = name;
    restaurant.phone = phone;
    restaurant.location = location;
    restaurant.description = description;
    restaurant.hyg_rating = hyg_rating;
    await restaurant.save();
    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ error: "Failed to update restaurant" });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    await restaurant.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ error: "Failed to delete restaurant" });
  }
};
