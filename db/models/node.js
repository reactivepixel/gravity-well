import { Model, DataTypes } from "sequelize";
import { ulid } from "ulid";

class Node extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.STRING(26),
          primaryKey: true,
          defaultValue: () => ulid(),
        },
        type: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        properties: {
          type: DataTypes.JSONB,
          allowNull: false,
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
        modelName: "node",
        tableName: "nodes",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(this, {
      through: models.node_relation,
      as: "children",
      foreignKey: "parent_id",
      otherKey: "child_id",
    });

    this.belongsToMany(this, {
      through: models.node_relation,
      as: "parents",
      foreignKey: "child_id",
      otherKey: "parent_id",
    });
  }
}

export default Node;
