"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const orders = [];
    for (let i = 0; i < 10000; i++) {
      orders.push({
        customer_name: faker.person.fullName(),
        customer_phone: faker.phone.number(),
        location: faker.location.streetAddress(),
        status: faker.helpers.arrayElement([
          "pending",
          "processing",
          "completed",
        ]),
        total_price: faker.number.float({
          min: 10,
          max: 500,
          precision: 0.01,
        }),
        items: JSON.stringify([
          {
            name: faker.commerce.productName(),
            quantity: faker.number.int({ min: 1, max: 10 }),
          },
          {
            name: faker.commerce.productName(),
            quantity: faker.number.int({ min: 1, max: 10 }),
          },
        ]),
        user_id: faker.unique(() => faker.number.int({ min: 1, max: 10000 })),
        restaurant_id: faker.unique(() =>
          faker.number.int({ min: 1, max: 10000 })
        ),
        menu_id: faker.unique(() => faker.number.int({ min: 1, max: 10000 })),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("orders", orders, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orders", null, {});
  },
};
