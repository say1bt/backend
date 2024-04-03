import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database_utils.js";
import { RATING } from "../constants/model_constants.js";

const Rating = sequelize.define(RATING, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
  },
  dish_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "dishes",
      key: "id",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: "updated_at",
  },
});

export default Rating;
