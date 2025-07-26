const { createOtherCost, getOtherCost, updateOtherCost, deleteOtherCost } = require('../controllers/otherCostController');

const router=require('express').Router();

router.route('/range/:rangeId/otherCost').post(createOtherCost);
router.route('/range/:rangeId/otherCost/:otherCostId').get(getOtherCost).put(updateOtherCost).delete(deleteOtherCost);

module.exports=router;