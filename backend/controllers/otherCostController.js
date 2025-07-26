
const Style=require('../models/styleModel');
const Range=require('../models/rangeModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');
const OtherCost = require('../models/otherCostModel');

// Create Other Cost-Admin
exports.createOtherCost=catchAsyncError(async(req,res,next)=>{
    const rangeId=req.params.rangeId;
    const range= await Range.findById(rangeId);

    if(!range){
        return next(new ErrorHandler('Range not found. Please create range first.',404))
    };
    const otherCostHave= await OtherCost.findOne({RangeId:rangeId});

    if(otherCostHave){
        return next(new ErrorHandler('Other cost has already been added for this range. Please update or create new one.',400))
    }
    let CMCost=req.body.SMV*req.body.EPM;
    CMCost=CMCost.toFixed(3);
    let Margin=req.body.SMV*0.01; 
    Margin=Margin.toFixed(3);

    const otherCost=await OtherCost.create({
        RangeId:rangeId,
        StyleId:range.styles,
        ...req.body,
        CMCost, 
        Margin
    });

    res.status(201).json({
        success:true,
        otherCost
    })


});


// Get other cost
exports.getOtherCost=catchAsyncError(async(req,res,next)=>{
    const getOtherCostID= req.params.otherCostId;

    let otherCost= await OtherCost.findOne({_id:getOtherCostID});
    if(!otherCost){
        return next(new ErrorHandler('Other cost not found.',404))
    };

    res.status(200).json({
        success:true,
        otherCost
    })

})

// Update Other Cost - Admin
exports.updateOtherCost=catchAsyncError(async(req,res,next)=>{
    const getOtherCostID= req.params.otherCostId;

    let otherCost= await OtherCost.findOne({_id:getOtherCostID});
    if(!otherCost){
        return next(new ErrorHandler('Other cost not found.',404))
    };

    await OtherCost.findByIdAndUpdate(getOtherCostID,{
        RangeId:otherCost.RangeId,
        StyleId:otherCost.StyleId,
        ...req.body,
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    await otherCost.save();

    res.status(200).json({
        success:true,
        otherCost
    })
});

// Delete Other Cost-Admin
exports.deleteOtherCost=catchAsyncError(async(req,res,next)=>{
    const getOtherCostID= req.params.otherCostId;

    let otherCost= await OtherCost.findOne({_id:getOtherCostID});
    if(!otherCost){
        return next(new ErrorHandler('Other cost not found.',404))
    };

    await OtherCost.findByIdAndDelete(getOtherCostID);

    res.status(200).json({
        success:true,
        message:'Other cost has been deleted successfully.'
    })
})
