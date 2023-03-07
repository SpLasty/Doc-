const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../authorization/auth')

router.post('/signup' , async (req,res) =>{
    console.log(req.body)
    try{
        const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error creating user", success: false, error });
    }
});

router.post('/login' , async(req,res) =>{
    try{
      const user = await User.findOne({ email: req.body.email })
      if(!user){
        return res.status(200).send({ message: 'User does not exist', success:false })

      }

      const isMatch = await bcrypt.compare(req.body.password, user.password) 
      if(!isMatch){
        return res.status(200).send({ message: 'Password is incorrect', success: false })

      }
      else{
        const token = jwt.sign({ id:user._id }, process.env.SECRET_KEY, {expiresIn:'1h'})
      
      res.status(200).send({ message: 'Login successful', success: true, data:token })
      }

    } catch(error){
        res.status(500).send({ message: 'Error logging in', success: false, })
        console.log(error)
    }
})

router.post('/get-user-info-by-id',auth, async(req,res)=> {
  try{
    const user = await User.findOne({ _id: req.body.userId })
    user.password = undefined;
    if(!user){
      return res.status(200).send({ message: 'No user found', success:false })

    }
    else{
      res.status(200).send({ message: 'User found', success: true, data:user
       })
    }
  }
  catch(error){
    res.status(500).send({ message: 'Could not get user info', success: false, })
    console.log(error)
  }
})

//Api endpoints for doctors
router.post('/apply-doctor' ,auth, async (req,res) =>{
  console.log(req.body)
  try{
    const newdoctor = new Doctor({ ...req.body, status: 'pending'});
    await newdoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });

    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: 'new-doctor-request',
      message: `${newdoctor.firstName} ${newdoctor.lastName} has applied to be a doctor`,
      data: {
        doctorId: newdoctor._id,
        name: newdoctor.firstName + ' ' + newdoctor.lastName,
      },
      onClickPath : '/admin/doctorslist'
    })
    await User.findByIdAndUpdate(adminUser._id,{ unseenNotifications })  
    res.status(200).send({
      success: true,
      message: "Doctor application sent successfully",
    })
     //Push the notification to admin's inbox and he can then clear it
} catch (error) {
  console.log(error);
  res
    .status(500)
    .send({ message: "Error creating your doctor account", success: false, error });
  }
});

// Clearing notifications
router.post('/mark-all-notifications-as-seen' ,auth, async (req,res) =>{
  console.log(req.body)
  try{
    // First get userID from the frontend
   const user = await User.findOne({ _id: req.body.userId })
   const unseenNotifications = user.unseenNotifications;
   const seenNotifications = user.seenNotifications;
   //Push all unseen to seen notifications
   seenNotifications.push(...unseenNotifications)
   //clear unReadNotifications since we are calling mark all notifications as seen
   user.unseenNotifications = [];
   user.seenNotifications = seenNotifications;
   //Saving the changes in database
   const updatedUser =  await user.save()
   updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications cleared successfully",
      data: updatedUser
    })
} catch (error) {
  console.log(error);
  res
    .status(500)
    .send({ message: "Failed", success: false, error });
  }
});

//Delete notifications
router.post('/delete-all-notifications' ,auth, async (req,res) =>{
  console.log(req.body)
  try{
   const user = await User.findOne({ _id: req.body.userId })
   user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save()
    //send updated user by making password undefined
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications deleted successfully",
      data: updatedUser
    })
} catch (error) {
  console.log(error);
  res
    .status(500)
    .send({ message: "Error creating your doctor account", success: false, error });
  }
});


//List of approved doctors in home screen
router.get("/get-approved-doctors", auth, async (req, res) => {
  try {
    const doctors = await Doctor.find({status: 'approved'});
    res.status(200).send({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});




module.exports = router;