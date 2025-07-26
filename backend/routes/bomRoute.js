const { createBOM, getBOMDetails, updateBOM, deleteBOM, getAllBOM } = require('../controllers/bomController');
// const {upload}=require('../app')

const router=require('express').Router();

router.route('/style/:styleId/bom').post(createBOM);
router.route('/bom/:bomID').get(getBOMDetails).put(updateBOM).delete(deleteBOM);
router.route('/bom').get(getAllBOM)

module.exports=router;
