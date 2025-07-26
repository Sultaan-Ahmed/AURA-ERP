const mongoose=require('mongoose');

// Booking  RM schema

const bookingRMSchema=new mongoose.Schema({
    RangeId:{
        type:mongoose.Schema.ObjectId,
        ref:'Range'
    },
    StyleId:{
        type:mongoose.Schema.ObjectId,
        ref:'Style'
    },
    ItemId:{
        type:mongoose.Schema.ObjectId,
        ref:'Item'
    }
});

module.exports=mongoose.model('BookingRM',bookingRMSchema)