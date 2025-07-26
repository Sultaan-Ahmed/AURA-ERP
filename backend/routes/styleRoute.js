const { createStyle, getAllStyles, getSingleStyle, updateStyle, getAllSytlesfromAllRanges, deleteStyle } = require('../controllers/styelController');

const router=require('express').Router();

// 
router.route('/range/style/:rangeId').post(createStyle).get(getAllStyles);
router.route('/style/:styleId').get(getSingleStyle).put(updateStyle).delete(deleteStyle);
router.route('/styles').get(getAllSytlesfromAllRanges);

module.exports=router;

