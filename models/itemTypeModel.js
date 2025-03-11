const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class ItemType extends Model {}

ItemType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull:true,
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ItemType",
    tableName: "item_types", // Match database table name
    timestamps: false,
  }
);

module.exports = ItemType;