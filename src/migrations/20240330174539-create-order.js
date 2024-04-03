"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customer_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customer_phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("pending", "processing", "completed"),
        allowNull: false,
        defaultValue: "pending",
      },

      total_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      items: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: [],
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "restaurants",
          key: "id",
        },
      },
      menu_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "menus",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
