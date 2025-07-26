const { createItem, getAllItems, getItemDetails, updateItem, deleteItem } = require('../controllers/itemsController');

const router=require('express').Router();

router.route('/item').post(createItem).get(getAllItems);
router.route('/item/:itemId').get(getItemDetails).put(updateItem).delete(deleteItem);


module.exports=router;