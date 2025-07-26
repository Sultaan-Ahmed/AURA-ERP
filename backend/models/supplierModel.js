const mongoose=require('mongoose');

// create Supplier Schema
const SupplierSchema=new mongoose.Schema({
    SupplierName:{
        type:String,
    },
    ContactPerson:[
        {
        type:String,
    }
    ],
    ContactEmail:[
        {
        type:String,
    }
    ],
    PaymentTerms:[
        {
            type:String,
        }
    ],
    PaymentPolicy:{
        Type:String,
    },
    DiscountPercentage:{
        type:String,
    },
    Remarks:{
        type:String,
    },
    FollowUp:{
        type:String
    }
});


module.exports=mongoose.model('Supplier',SupplierSchema);