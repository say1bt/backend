"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const menus = [];

    for (let i = 0; i < 10000; i++) {
      menus.push({
        name: faker.word.words({ count: { min: 1, max: 3 } }),
        description: faker.word.words({ count: { min: 5, max: 10 } }),
        restaurant_id: faker.unique(() =>
          faker.number.int({ min: 1, max: 10000 })
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("menus", menus, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("menus", null, {});
  },
};
