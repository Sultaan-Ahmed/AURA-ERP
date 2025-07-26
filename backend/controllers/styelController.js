const Style=require('../models/styleModel');
const catchAsyncError=require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');
const Range= require('../models/rangeModel');
const OtherCost=require('../models/otherCostModel');

// Create Style-Admin
exports.createStyle=catchAsyncError(async(req,res,next)=>{
    const rangeId= req.params.rangeId;
    if(!rangeId){
        return next(new ErrorHandler('Please select range first.',400))
    };

    let range= await Range.findById(rangeId);

    if(!range){
        return next(new ErrorHandler('Range not found, please create range first.',404))
    };
    let StyleName=req.body.StyleName;

    if(!StyleName){
        return next(new ErrorHandler('Please enter style name.',400))
    }
    let styleHave= await Style.findOne({StyleName,RangeId:rangeId});
    if(styleHave){
        return next(new ErrorHandler('Style name already have. Please try with another namme.',400))
    }
    let style= await Style.create({
        RangeId:rangeId,
        ...req.body
    });
    // Add styles on range
    // range.styles.push(style._id);
    range.styles=[
        style._id,
        ...range.styles
    ];
    await range.save();
    // Add style Id on other cost
   let otherCost= await OtherCost.findOne({RangeId:rangeId});

   console.log(otherCost)

  otherCost.StyleId= [style._id,...otherCost.StyleId];

    await otherCost.save();



    res.status(201).json({
        success:true,
        style
    })
})

// Get all styels from all ranges
exports.getAllSytlesfromAllRanges=catchAsyncError(async(req,res,next)=>{
    let styles= await Style.find();
    if(styles.length<=0){
        return next(new ErrorHandler('No style found. Please style create first.',404))
    };

    res.status(200).json({
        success:true,
        NoOfTotalStyles:styles.length,
        styles
    })
})

// Get all styles in singel range
exports.getAllStyles=catchAsyncError(async(req,res,next)=>{
    const rangeId= req.params.rangeId;
    if(!rangeId){
        return next(new ErrorHandler('Please select range first.',400))
    };

    let range= await Range.findById(rangeId);

    if(!range){
        return next(new ErrorHandler('Range not found, please create range first.',404))
    };

    let styles= await Style.find({RangeId:rangeId});

  
    console.log(styles)
    if(styles.length<=0){
        return next(new ErrorHandler('No style found under this range.  Please create style first.',404))
    };

    res.status(200).json({
        success:true,
        NoOfStyles:styles.length,
        styles
    })
})

// get Single style
exports.getSingleStyle=catchAsyncError(async(req,res,next)=>{
    let styleId=req.params.styleId;
    
    
    if(!styleId){
        return next(new ErrorHandler('Style not found.',404))
    };

    let  style= await Style.findById(styleId);
    
    if(!style){
        return next(new ErrorHandler('Style not found.',404))
    }

    res.status(200).json({
        success:true,
        style
    })
})

// Update Style-Admin
exports.updateStyle=catchAsyncError(async(req,res,next)=>{
    let styleId=req.params.styleId;
    if(!styleId){
        return next(new ErrorHandler('Style not found.',404))
    };

    let  style= await Style.findById(styleId);
    if(!style){
        return next(new ErrorHandler('Style not found.',404))
    }
    updatedStyle= await Style.findByIdAndUpdate(styleId,req.body);

    res.status(201).json({
        success:true,
        updatedStyle
    })
});

// Delete Style-Admin
exports.deleteStyle=catchAsyncError(async(req,res,next)=>{
    let styleId=req.params.styleId;
    if(!styleId){
        return next(new ErrorHandler('Style not found.',404))
    };

    let  style= await Style.findById(styleId);
    if(!style){
        return next(new ErrorHandler('Style not found.',404))
    }
    // TODO: Style image should  delete before delete the style from database
   
//    remove style id from range and othercost arrray
   let range= await Range.findById(style.RangeId);
   
   let rangeStyles=  range.styles.filter(item=>item!==styleId);

   
   range.styles=rangeStyles;

   await range.save();

//    remove style id from others cost array


let otherCost= await OtherCost.findOne();


let otherCostStylesId= otherCost.StyleId.filter((item)=>item!=otherCost.StyleId);

otherCost.StyleId = [...otherCostStylesId];
await otherCost.save();





    await Style.findByIdAndDelete(styleId);

    res.status(200).json({
        success:true,
        message:'Style has been deleted successfully.'
    })
})