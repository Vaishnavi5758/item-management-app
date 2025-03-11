const { Item, ItemType } = require('../models');


//const { ItemType } = require('../models');

const getItemTypes = async (req, res) => {
    try {
        const itemTypes = await ItemType.findAll();
        res.json(itemTypes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve item types' });
    }
};

//get all items(JOIN)
const getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll({
            include: [
                {
                    model: ItemType,
                    attributes: ['type_name'],
                  //as: 'ItemType' 
                }
            ],
            raw:true,
            nest:true
        });

        res.status(200).json(items);
        console.log("items>>>>>>>>>>>>>>>>>:", items);

    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: error.message });
    }
};
//get a item by ID
const getItemById = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id, {
            include: [{ model: ItemType, attributes: ['type_name'] }]
        });

        if (!item) return res.status(404).json({ message: 'Item not found' });

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//create new item
const createItem = async (req, res) => {
    try {
        const { name, purchase_date, stock_available, item_type_id } = req.body;
        console.log("REQ BODY>>>>>>>>>>>>>>>>",req.body);

        
        const itemType = await ItemType.findByPk(item_type_id);
        if (!itemType) return res.status(400).json({ message: 'Invalid Item Type ID' });

        const item = await Item.create({ name, purchase_date, stock_available, item_type_id });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//update
const updateItem = async (req, res) => {
    try {
        const { name, purchase_date, stock_available, item_type_id } = req.body;

        const itemType = await ItemType.findByPk(item_type_id);
        if (!itemType) return res.status(400).json({ message: 'Invalid Item Type ID' });

        const updated = await Item.update(
            { name, purchase_date, stock_available, item_type_id },
            { where: { id: req.params.id } }
        );

        if (updated[0] === 0) return res.status(404).json({ message: 'Item not found' });

        res.json({ message: 'Item updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//delete
const deleteItem = async (req, res) => {
    try {
        const deleted = await Item.destroy({ where: { id: req.params.id } });

        if (!deleted) return res.status(404).json({ message: 'Item not found' });

        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getItemTypes,
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};