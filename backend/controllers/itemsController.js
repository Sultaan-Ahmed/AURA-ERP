const Item=require('../models/ItemsModel');
const BOM=require('../models/bomModel');
const Style=require('../models/styleModel');
const catchAsyncError=require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');


// create Items-Admin
exports.createItem=catchAsyncError(async(req,res,next)=>{
    // TODO: Items will be created independently. Any BOM can use that information on their items list.

    const ItemHave= await Item.findOne({Article:req.body.Article, Color:req.body.Color})
    if(ItemHave){
        return next(new ErrorHandler('Item has already been created. Please create new one.',400))
    };

    const item= await Item.create(req.body);

    res.status(201).json({
        success:true,
        item
    })
});

// Get all items
exports.getAllItems=catchAsyncError(async(req,res,next)=>{
    const items= await Item.find();
    if(items.length<=0){
        return next(new ErrorHandler('Items not found, please item create first.',404))
    }

    res.status(200).json({
        success:true,
        noOfItems:items.length,
        items
    })
})

// Get Item Details-
exports.getItemDetails=catchAsyncError(async(req,res,next)=>{
    const itemId=req.params.itemId;
    if(!itemId){
        return next(new ErrorHandler('Item not found.',404));
    };
    const item= await Item.findOne({_id:itemId});
    if(!item){
        return next(new ErrorHandler('Item not found or it has been deleted, please create new one.',404));
    };

    res.status(200).json({
        success:true,
        item

    })

})

// Update Item-Admin
exports.updateItem=catchAsyncError(async(req,res,next)=>{
    const itemId=req.params.itemId;
    if(!itemId){
        return next(new ErrorHandler('Item not found.',404));
    };
    let item= await Item.findOne({_id:itemId});
    if(!item){
        return next(new ErrorHandler('Item not found or it has been deleted, please create new one.',404));
    };
    const article= req.body.Article;
    let existArticle= (await Item.find({Article:article})).filter((item)=>item._id!=itemId);
   
    if(existArticle.length>0){
        return next(new ErrorHandler('This article already been created. Please update with another one.',400))
    }

    item= await Item.findByIdAndUpdate(itemId,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(201).json({
        success:true,
        item
    })
});

// Delete Item-Admin
exports.deleteItem=catchAsyncError(async(req,res,next)=>{
    const itemId=req.params.itemId;
    if(!itemId){
        return next(new ErrorHandler('Item not found.',404));
    };
    let item= await Item.findOne({_id:itemId});
    if(!item){
        return next(new ErrorHandler('Item not found or it has been deleted, please create new one.',404));
    };

    // TODO: Before deleting item, we have to remove item id from connected all models.

    await Item.findByIdAndDelete(itemId);

    res.status(200).json({
        success:true,
        message:'Item has been deleted successfully.'
    })
})