const express=require('express');
const { registerUser, loginUser, forgotpassword, resetPassword, logoutUser, getuserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController.js');

const {}= require('../middleware/auth.js');
const { isAuthenticateduser } = require('../middleware/auth.js');
const { authorizeRoles } = require('../middleware/auth.js');

const router=express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotpassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logoutUser);
router.route('/me').get(isAuthenticateduser,getuserDetails);
router.route('/password/update').put(isAuthenticateduser,updatePassword)
router.route('/me/update').put(isAuthenticateduser,updateProfile);
router.route('/admin/users').get(isAuthenticateduser,authorizeRoles('admin'),getAllUser);
router.route('/admin/user/:id').get(isAuthenticateduser,authorizeRoles('admin'),getSingleUser).put(isAuthenticateduser,authorizeRoles('admin'),updateUserRole).delete(isAuthenticateduser,authorizeRoles('admin'),deleteUser)


module.exports=router;