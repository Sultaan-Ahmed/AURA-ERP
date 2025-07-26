const mongoose=require('mongoose');

// BOM schema
const bomSchema=new mongoose.Schema({
    RangeId:{
        type:mongoose.Schema.ObjectId,
        ref:'Range'
    },
    StyleId:{
        type:mongoose.Schema.ObjectId,
        ref:'Style'
    },
     BOMDetails: [
        {
            Type: {
                type:String,
            },
            SupplierName:  {
                type:String,
            },
            MaterialInfo:  {
                type:String,
            },
            Article:  {
                type:String,
            },
            Color: [
                 {
                type:String,
            },
            ],
            Width: [
                 {
                type:String,
            },
            ],
            Placement:  {
                type:String,
            },
        },
       
    ],
    BOMImages: [
      {
      type: String, // or Buffer if storing directly in DB
    },
        
    ]
})

module.exports=mongoose.model('BOM',bomSchema)