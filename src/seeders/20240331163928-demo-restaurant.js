"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 0; i < 10000; i++) {
      restaurants.push({
        name: faker.company.companyName(),
        phone: faker.phone.number(),
        location: faker.location.streetAddress(),
        description: faker.lorem.sentence(),
        hyg_rating: faker.number.int({ min: 1, max: 5 }),
        user_id: faker.unique(() => faker.number.int({ min: 1, max: 10000 })),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("restaurants", restaurants, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
