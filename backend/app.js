const express= require('express');
const app= express();
const cookieParser= require('cookie-parser');
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload');
const cors=require('cors')



// use cors
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  credentials:true

}));

// connect error middleware.
const errorMiddleware= require('./middleware/error.js')

// config
if(process.env.NODE_ENV!=='PRODUCTION'){
    require('dotenv').config({path:'backend/config/config.env'})
}

// add global middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

// Route imports TODO:
const user=require('./routes/userRoute.js')
const range= require('./routes/rangeRoute.js');
const style=require('./routes/styleRoute.js');
const bom=require('./routes/bomRoute.js');
const item=require('./routes/itemRoute.js');
const otherCost=require('./routes/otherCostRoute.js');
const costingConsumption=require('./routes/costingConsumption.js')

app.use('/api/v1',user)
app.use('/api/v1',range);
app.use('/api/v1',style);
app.use('/api/v1',bom);
app.use('/api/v1',item);
app.use('/api/v1',otherCost);
app.use('/api/v1',costingConsumption)
//test route
app.get('/test',(req,res,next)=>{
    res.status(200).json({
        message:'Welcome  to the AURA ERM backend test route.'
    })
})


// middleware for errors
app.use(errorMiddleware);

module.exports=app;


