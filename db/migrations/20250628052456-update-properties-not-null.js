"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    // Update any null properties to empty object
    await queryInterface.sequelize.query(`
      UPDATE nodes 
      SET properties = '{}'::jsonb 
      WHERE properties IS NULL
    `);

    await queryInterface.sequelize.query(`
      UPDATE node_relations 
      SET properties = '{}'::jsonb 
      WHERE properties IS NULL
    `);

    // Change properties column to not null in nodes table
    await queryInterface.changeColumn("nodes", "properties", {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: {},
    });

    // Change properties column to not null in node_relations table
    await queryInterface.changeColumn("node_relations", "properties", {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: {},
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert properties column to allow null in nodes table
    await queryInterface.changeColumn("nodes", "properties", {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {},
    });

    // Revert properties column to allow null in node_relations table
    await queryInterface.changeColumn("node_relations", "properties", {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {},
    });
  },
};
