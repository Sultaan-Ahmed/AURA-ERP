const mongoose=require('mongoose');

// consting  RM schema

const constingRMSChema=new mongoose.Schema({
    submittedAt:{
        type:Date,
    },
    styleId:{
        type:mongoose.Schema.ObjectId,
        ref:'Style'
    },
    BOMDetails:[
       {
         Type:{
            type:String,
        },
        SupplierName:{
            type:String,
        },
        MaterialInfo:{
            type:String,
        },
        Article:{
            type:String,
        },
        Color:[
            {
                type:String,
            }
        ],
        Width:[
            {
                type:String,
            }
        ],
        Placement:{
            type:String,
        },
        consumption:[
            {
                color:{
                    type:String,
                },
                value:{
                    type:String,
                },
               width:{
                    type:String
                }
            }
        ]
       }

    ]
});

module.exports=mongoose.model('CostingConsumption',constingRMSChema)