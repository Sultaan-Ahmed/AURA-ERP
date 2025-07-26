const mongoose=require('mongoose');


// Range Schema
const rangeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter range name.'],
       
    },
    styles:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Style',
        }
    ],
    CurrentStage:{
        type:String
    },
    TotalOrderQty:{
        type:Number,
        
    },
    OrderLiveDate:{
        type:Date
    },
    ExFtyDate:{
        type:Date
    },
    VendorName:[
        {
            type:String,
        }
    
    ],
    CustomerName:{
        type:String,
        
    }

});

module.exports=mongoose.model('Range',rangeSchema);