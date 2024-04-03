import Rating from "../model/rating_model.js";

const createRating = async (req, res) => {
  try {
    const { score, comment } = req.body;
    const rating = await Rating.create({ score, comment });
    res.status(201).json({ rating });
  } catch (error) {
    console.error("Error creating rating:", error);
    res.status(500).json({ error: "Could not create rating" });
  }
};

const getRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    const rating = await Rating.findByPk(ratingId);
    if (!rating) {
      return res.status(404).json({ error: "Rating not found" });
    }
    res.status(200).json({ rating });
  } catch (error) {
    console.error("Error getting rating:", error);
    res.status(500).json({ error: "Could not get rating" });
  }
};

const updateRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    const { score, comment } = req.body;
    const rating = await Rating.findByPk(ratingId);
    if (!rating) {
      return res.status(404).json({ error: "Rating not found" });
    }
    await rating.update({ score, comment });
    res.status(200).json({ message: "Rating updated successfully" });
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({ error: "Could not update rating" });
  }
};

const deleteRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    const rating = await Rating.findByPk(ratingId);
    if (!rating) {
      return res.status(404).json({ error: "Rating not found" });
    }
    await rating.destroy();
    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    console.error("Error deleting rating:", error);
    res.status(500).json({ error: "Could not delete rating" });
  }
};

export { createRating, getRating, updateRating, deleteRating };
