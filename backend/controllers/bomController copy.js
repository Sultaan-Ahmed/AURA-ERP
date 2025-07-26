const BOM=require('../models/bomModel');
const catchAsyncError=require('../middleware/catchAsyncError');
const Range=require('../models/rangeModel');
const Style=require('../models/styleModel');
const ErrorHandler = require('../utils/errorhandler');


// Create BOM-Admin
exports.createBOM=catchAsyncError(async(req,res,next)=>{
    let styleId=req.params.styleId;
    if(!styleId){
        return next(new ErrorHandler('Style not found.',404))
    };

    let  style= await Style.findById(styleId);
    if(!style){
        return next(new ErrorHandler('Style not found.',404))
    }
    const  {_id}=await Range.findById(style.RangeId)


    // TODO: Should check, if same bom already created, update the bom.

    let BOMhave= await BOM.findOne({StyleId:styleId});
    if(BOMhave){
        return next(new ErrorHandler('BOM has already been created. Please update or create new one.',400))
    }

    const bom=await BOM.create({
        RangeId:_id,
        StyleId:styleId,
        ...req.body,
    });

    // TODO: BOM image should include here.

    res.status(201).json({
        success:true,
        bom
    })

})

// Get BOM Details
exports.getBOMDetails=catchAsyncError(async(req,res,next)=>{
    const bomID= req.params.bomID;
    if(!bomID){
        return next(new ErrorHandler('BOM not found.',404))
    };

    let  bom= await BOM.findById(bomID);
    if(!bom){
        return next(new ErrorHandler('BOM not found.',404))
    }
    res.status(200).json({
        success:true,
        bom
    })

})


// Update  BOM -Admin
exports.updateBOM=catchAsyncError(async(req,res,next)=>{
    const bomID= req.params.bomID;
    if(!bomID){
        return next(new ErrorHandler('BOM not found.',404))
    };

    let  bom= await BOM.findById(bomID);
    if(!bom){
        return next(new ErrorHandler('BOM not found.',404))
    }
    const {StyleId,RangeId}=bom;

     bom=await BOM.findByIdAndUpdate(bomID,{
        RangeId,
        StyleId,
        ...req.body,
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });



    // TODO: BOM image should include here.

    res.status(201).json({
        success:true,
        bom
    })

});

// Delete BOM-Admin
exports.deleteBOM=catchAsyncError(async(req,res,next)=>{
    const bomID= req.params.bomID;
    if(!bomID){
        return next(new ErrorHandler('BOM not found.',404))
    };

    let  bom= await BOM.findById(bomID);
    if(!bom){
        return next(new ErrorHandler('BOM not found.',404))
    }
    const {StyleId,RangeId}=bom;
    // TODO:  Before delete must delete bom id from styles and range.

    // Delete range related styles
   
    await BOM.findByIdAndDelete(bomID);

    res.status(200).json({
        success:true,
        message:"BOM has been deleted successfully."
    })

})