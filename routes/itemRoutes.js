const path = require('path');
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController'); // Import controller
console.log("itemController>>>>>>>",itemController)
// Define routes and link them to controller methods
router.get('/types', itemController.getItemTypes);
router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItemById);
router.post('/', itemController.createItem);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);
//router.post('/item-types', itemController.createItemType);

module.exports = router;