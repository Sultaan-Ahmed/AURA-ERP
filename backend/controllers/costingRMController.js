const ConstingConsumption=require('../models/costingRMModel');
const catchAsyncError= require('../middleware/catchAsyncError');
const ErrorHandler=require('../utils/errorhandler');
const Style=require('../models/styleModel');
const Range=require('../models/rangeModel');


// Create consting consumption-Factory Concern
exports.createCostingConsumption=catchAsyncError(async(req,res,next)=>{
    const{styleId}=req.body;
 if (!styleId) return next(new ErrorHandler('Style not found.', 404));

  const style = await Style.findById(styleId);
  if (!style) return next(new ErrorHandler('Style not found.', 404));

  const range = await Range.findById(style.RangeId);
  if (!range) return next(new ErrorHandler('Range not found.', 404));


   const existingCostingConsumption = await ConstingConsumption.findOne({ StyleId: styleId });
    if (existingCostingConsumption) {
      return next(new ErrorHandler('Costing consumption has already been created. Please update or create new one.', 400));
    }

    const ConstingCons= await ConstingConsumption.create({
        ...req.body,
        RangeId:Style.RangeId
    })

    res.status(201).json({
        success:true,
        message:'Consting Consumption has been created successfully.',
        ConstingCons
    })
}) 

// Get all styles costing consumption

exports.getAllCostCons=catchAsyncError(async (req,res,next)=>{
    const costingConsumptions= await ConstingConsumption.find();

    if (ConstingConsumption.length<=0){
        return next(new ErrorHandler('Costing consumption not created. Please create first.',404))
    }

    res.status(200).json({
        success:true,
        costingConsumptions
    })
})

// Get costing consumption details
exports.getCostCons=catchAsyncError(async(req,res,next)=>{
    const costConsId=req.params.costConsId;
     if(!costConsId){
        return next(new ErrorHandler('Consting consumption not found.',404))
    };

    let  consumption= await ConstingConsumption.findById(costConsId);
    if(!consumption){
        return next(new ErrorHandler('consumption not found.',404))
    }
    res.status(200).json({
        success:true,
        consumption
    })
})

// Update  costing consumption--Factory concern/Admin
exports.updateCostCons=catchAsyncError(async(req,res,next)=>{
    const costConsId=req.params.costConsId;
     if(!costConsId){
        return next(new ErrorHandler('Consting consumption not found.',404))
    };

    let  consumption= await ConstingConsumption.findById(costConsId);
    if(!consumption){
        return next(new ErrorHandler('consumption not found.',404))
    };

    const updatedCostCos= await ConstingConsumption.findByIdAndUpdate(costConsId,{
        ...req.body,
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(201).json({
        success:true,
        updatedCostCos,
        message:'Costing consumption updated successfully.'
    })
});

// Delete  costing consumption--Admin
exports.deleteCostCons=catchAsyncError(async(req,res,next)=>{
    const costConsId=req.params.costConsId;
     if(!costConsId){
        return next(new ErrorHandler('Consting consumption not found.',404))
    };

    let  consumption= await ConstingConsumption.findById(costConsId);
    if(!consumption){
        return next(new ErrorHandler('consumption not found.',404))
    };

    await ConstingConsumption.findByIdAndDelete(costConsId);

    res.status(200).json({
        success:true,
        message:'Costing consumption has been deleted successfully.'
    })
})