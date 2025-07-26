const { createCostingConsumption, getCostCons, deleteCostCons, updateCostCons,getAllCostCons } = require('../controllers/costingRMController');

const router=require('express').Router();

router.route('/costcons').post(createCostingConsumption).get(getAllCostCons);
router.route('/costcons/:costConsId').get(getCostCons).delete(deleteCostCons).put(updateCostCons);

module.exports=router;