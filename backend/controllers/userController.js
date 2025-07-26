const catchAsyncErrors=require('../middleware/catchAsyncError.js');
const User=require('../models/userModel.js');
const sendToken=require('../utils/jwtToken.js');
const sendEmail=require('../utils/sendEmail.js')
const crypto=require('crypto');
const cloudinary=require('cloudinary');
const ErrorHandler = require('../utils/errorhandler');


// Register User
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const myCloud= await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'avatars',
        width:150,
        crop:'scale'
    });

    const {name,email,password,designation, company, phoneNumber}=req.body;
    const user= await User.create({
        name,email,password,avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        },
        designation,company,phoneNumber
    });

    sendToken(user,201,res)
})


// Login User
exports.loginUser=catchAsyncErrors(async (req,res,next)=>{
    const {email,password}=req.body;

    // checking  if use has given password and email both
    if(!email || !password){
        return  next(new ErrorHandler('Please enter email & password.',400))
    };

    const user= await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid email',401));
    };

    const isPasswordMatched=  await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid password',401))
    };

    sendToken(user,200,res);
})


// Logout User

exports.logoutUser=catchAsyncErrors(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        messsage:"Logged out successfully."
    })
})


// Forgot Password
exports.forgotpassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler('user not  found.',404));
    }

    // Get Resetpassword token
    const resetToken=user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl=`${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
    const message=`Your password reset token is:= \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`

    try{
        await sendEmail({
            email:user.email,
            subject:`AURA ERP password recovery.`
        });

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully.`
        })
    }catch(err){
        user.resetPasswordToken=undefined;
        user.resetpasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return(next(new ErrorHandler(err.message,500)))
    }

})

// Reset  password
exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{
    // creating token hash
    const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user= await User.findOne({
        resetPasswordToken,
        resetpasswordExpire:{
            $gt:Date.now()
        }
    })

    if(!user){
        return next(new ErrorHandler(`Reset password token is invalid or has been expired.`,400))
    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler(`Password does not matched with confirmed password.`,400))
    }


    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetpasswordExpire=undefined;

    await user.save();
    sendToken(user,200,res)
})

// Get  user details
exports.getuserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })
})

// update user password
exports.updatePassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select('+password');
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler(`Old password is incorrect.`,400))
    }
    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler('password does not matched.',400)
        )
    }

    user.password=req.body.newPassword;
    await user.save();
    
    sendToken(user,200,res)

})

// Update profile
exports.updateProfile=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        designation:req.body.designation,
        company:req.body.company,
        phoneNumber:req.body.phoneNumber,
    };
    if(req.body.avatar!==""){
        const user=await User.findById(req.user.id);
        const imageId=user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
        const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:'avatars',
            width:150,
            crop:'scale'
        })
    }
    const user= await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
    })
})

// Get all users (admin)
exports.getAllUser=catchAsyncErrors(async(req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        success:true,
        users
    })
});

// Get single user (admin)
exports.getSingleUser=catchAsyncErrors(async(req,res,next)=>{
    exports.getSingleUser=catchAsyncErrors(async(req,res,next)=>{
        const user=await User.findById(req.params.id);
        if(!user){
            return next(new ErrorHandler(`User does not exist wit ID: ${req.params.di}`))
        }
    })

    res.status(200).json({
        success:true,
        user
    })
})

// Update user role =(Admin)
exports.updateUserRole=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={

        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }
    await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true
    })
})

// Delete suer=Admin
exports.deleteUser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

if(!user){
    return next(new ErrorHandler(`User does not exist with Id:${req.params.id}`))
}

const imageId=user.avatar.public_id;
await  cloudinary.v2.uploader.destroy(imageId);

await user.remove();

res.status(200).json({
    success:true,
    message:"User deleted successfully."
})
})