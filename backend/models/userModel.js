const mongoose=require('mongoose');
const validator= require('validator');
const  bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const crypto=require('crypto');

// user Schema
const  userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name'],
        maxLength:[30,'Name can not exceed 30 characters.'],
        minLength:[4,'Name should have more that 4 characters.'],
    },
    email:{
        type:String,
        required:[true,'Please enter your email.'],
        unique:true,
        validate:[validator.isEmail,'Please enter  a valid email.']
    },
    password:{
        type:String,
        required:[true,'Please enter your password.'],
        minLength:[8,'Password should be greater than  8 characters.'
        ],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true,
        }
    },
    Designation:{
        type:String,
        required:[true,'Please enter your designation.']
    },
    CompanyName:{
        type:String,
        required:[true,'Please enter your company name.']
    },
    PhoneNumber:{
        type:Number,
        required:[true,'Please enter your phone number.']
    },
    role:{
        type:String,
        default:'user'
    },
    createAt:{
        type:Date,
        default:Date.now,
    },
    resetPasswordToken:String,
    resetpasswordExpire:Date,
});

userSchema.pre('save',async function (next) {
    if(!this.isModified('password')){
        next();
    };
    this.password= await bcrypt.hash(this.password,10);
});

// JWT Token
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}

// compare password
userSchema.methods.comparePassword=async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generating password  reset token
userSchema.methods.getResetPasswordToken=function (){
    // Generating token
    const resetToken=crypto.randomBytes(20).toString('hex');

    // hashing and adding reset password  token to user schema
    this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetpasswordExpire=Date.now()+15*60*1000;

    return resetToken;
}

module.exports=mongoose.model('User',userSchema)