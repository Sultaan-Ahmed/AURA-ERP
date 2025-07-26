const mongoose=require('mongoose');
const connectDatabase=()=>{
    mongoose.connect(process.env.DB_URI,{
       
        
    })
};


module.exports=connectDatabase;