import Category from "../model/category_model.js";

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json({ category });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Could not create category" });
  }
};

const getCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ category });
  } catch (error) {
    console.error("Error getting category:", error);
    res.status(500).json({ error: "Could not get category" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.update({ name });
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Could not update category" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Could not delete category" });
  }
};

export { createCategory, getCategory, updateCategory, deleteCategory };
