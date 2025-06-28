const { Model, DataTypes } = require("sequelize");
const { ulid } = require("ulid");

class Node_relation extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.STRING(26),
          primaryKey: true,
          defaultValue: () => ulid(),
        },
        parent_id: {
          type: DataTypes.STRING(26),
          allowNull: false,
          references: {
            model: "nodes",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        child_id: {
          type: DataTypes.STRING(26),
          allowNull: false,
          references: {
            model: "nodes",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        relation_type: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        properties: {
          type: DataTypes.JSONB,
          allowNull: true,
          defaultValue: {},
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "node_relation",
        tableName: "node_relations",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
          {
            unique: true,
            fields: ["parent_id", "child_id"],
          },
        ],
      }
    );
  }

  static associate(models) {
    // Associations are defined in the Node model
  }
}

module.exports = Node_relation;
