const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Database connection

const Item = require("./itemModel"); // Import model directly
const ItemType = require("./itemTypeModel"); // Import model directly

// Establish relationships (Associations)
Item.belongsTo(ItemType, { foreignKey: "item_type_id",onDelete:"RESTRICT" });
ItemType.hasMany(Item, { foreignKey: "item_type_id" });

module.exports = { sequelize, Item, ItemType };