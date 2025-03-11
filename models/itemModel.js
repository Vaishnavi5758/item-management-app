const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const ItemType = require("./itemTypeModel");

class Item extends Model {}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchase_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    item_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: "item_types",
        key: "id",
      },
      onDelete: "RESTRICT",
    },
    stock_available: {  // Add this field
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,  // Default value
    },
  },
  {
    sequelize,
    modelName: "Item",
    tableName: "items",
    timestamps: false,
  }
);


Item.belongsTo(ItemType, { foreignKey: "item_type_id", onDelete: "RESTRICT" });

module.exports = Item;