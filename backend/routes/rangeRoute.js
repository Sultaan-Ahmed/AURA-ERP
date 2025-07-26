const { createRange, getAllRange, getRangeDetails, updateRange, deleteRange } = require('../controllers/rangeController');

const router= require('express').Router();


router.route('/range').post(createRange).get(getAllRange);
router.route('/range/:id').get(getRangeDetails).put(updateRange).delete(deleteRange);


module.exports=router;
