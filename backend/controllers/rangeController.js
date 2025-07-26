const User=require('../models/userModel');
const Range= require('../models/rangeModel');
const catchAsyncErrors=require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');
const OtherCost = require('../models/otherCostModel');


// create range=admin

exports.createRange= catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body)
    const {name}=req.body;
    if(!name){
        res.status(400).json({
            success:false,
            message:"Please enter range name first."
        })
    }
    let range= await Range.findOne({name});
    if(range){
        return next(new ErrorHandler(`${name} is already created. Please add new one or view the range deatails.`))
    }
   range=  await Range.create(req.body);


    res.status(201).json({
        success:true,
        range
    })
});

// Get all range
exports.getAllRange=catchAsyncErrors(async(req,res,next)=>{

    // TODO: Need to add filter, sort, search and pagination here features here.
    let ranges= await Range.find();


   

   res.status(200).json({
        success:true,
        NoOfRange:ranges.length,
        ranges,
        
    })
})

// Get Range Details
exports.getRangeDetails=catchAsyncErrors(async(req,res,next)=>{
    const range=await Range.findById(req.params.id);
    if(!range){
        return next(new ErrorHandler('Range not found or removed from database.',404))
    }

    res.status(200).json({
        success:true,
        range
    })
});

// Update Range-Admin
exports.updateRange=catchAsyncErrors(async(req,res,next)=>{

    // TODO: Need to add version system.
    let range=  await Range.findById(req.params.id);
    if(!range){
        return next(new ErrorHandler('Range not found.',404))
    }

    range=await Range.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
        range
    })
})

// Delete Range-Admin

exports.deleteRange=catchAsyncErrors(async(req,res,next)=>{
    const range=await Range.findById(req.params.id);
    if(!range){
        return next(new ErrorHandler('Range not found',404))
    }
    // TODO: Before deleting, need to delete related Styles and BOM as well.
    // Delete range related styles
    range.styles.forEach((item)=>{
         Style.findByIdAndDelete(item)
    });

    // Delete range related other cost
    let otherCost= await OtherCost.find({RangeId:range._id});
    await otherCost.remove();

    await OtherCost.save();

    // Delete Range
    await Range.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        message:'Range has been successfully deleted.'
    })
})