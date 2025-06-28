"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("node_relations", {
      id: {
        type: Sequelize.STRING(26),
        primaryKey: true,
        allowNull: false,
      },
      parent_id: {
        type: Sequelize.STRING(26),
        allowNull: false,
        references: {
          model: "nodes",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      child_id: {
        type: Sequelize.STRING(26),
        allowNull: false,
        references: {
          model: "nodes",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      relation_type: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      properties: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: {},
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add unique constraint for parent_id and child_id
    await queryInterface.addConstraint("node_relations", {
      fields: ["parent_id", "child_id"],
      type: "unique",
      name: "unique_parent_child",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("node_relations");
  },
};
