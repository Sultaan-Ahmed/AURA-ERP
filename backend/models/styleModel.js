const mongoose=require('mongoose');

// style Schema
const styleSchema=new mongoose.Schema({
    RangeId:{
        type:mongoose.Schema.ObjectId,
        ref:"Range",
        // required:[true,'Please enter range ID.']
    },
    BOMId:{
        type:mongoose.Schema.ObjectId,
        ref:"BOM",
        // required:[true,'Please enter range ID.']
    },
    StyleName:{
        type:String,
        required:[true,'Please enter style name.']
    },
    TotalOrderQty:{
        type:Number,
    },
    // Colors:[
    //     {
    //         type:String,
    //     }
    // ],
    ColorWiseQty:[
        {   
            Color:{
                type:String,
            },
            ColorOrderQty:{
                type:Number,
                default:0
            }
        }
    ],
    OrderLiveDate:{
        // TODO: Should pass here type date and make the changes accordingly.
        type:String,
    },
    ExFtyDate:{
        type:String,
    },
    RMDetails:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Item"
        }
    ],

})


module.exports=mongoose.model('Style',styleSchema);