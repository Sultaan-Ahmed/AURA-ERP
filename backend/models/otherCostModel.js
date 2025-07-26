const mongoose=require('mongoose');

// othercost Schema

const otherCost=new mongoose.Schema({
    RangeId:{
        type:mongoose.Schema.ObjectId,
        ref:'Range'
    },
    StyleId:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Style'
        }
    ],
    FreightCost:{
        type:Number,
    },
    CourierCost:{
        type:Number,
    },
    MOQMCQCost:{
        type:Number,
    },
    SamplingCost:{
        type:Number,
    },
    EPM:{
        type:Number,
        default:0.12
    },
    SMV:{
        type:Number,
        
    },
    CMCost:{
        type:Number,
    },
    Margin:{
        type:Number,
    }

    // TODO: CM & Margin will be auto generate here. 
})

module.exports=mongoose.model('OtherCost',otherCost)