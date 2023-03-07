const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')
const auth = require('../authorization/auth')

router.get("/get-all-doctors", auth, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
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

router.get('/get-all-users', auth, async (req, res) => {
  try {
    const users = await User.find({});
    console.log('Users:', users)
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
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

router.post('/change-doctor-status', auth, async (req, res) => {
  try {
    //Destructuring. We add userId since notifications are present in the userModel
    const { doctorID, status} = req.body;
    //updating status using doctor
    const doctor = await Doctor.findByIdAndUpdate(doctorID, {
      status
    })
    //Find User first. We are sending the userID from frontend but our middleware overrides it with adminID. So we use doctor.userID
    const user = await User.findOne({_id: doctor.userID})
    //Fetch unread notifications
    const unseenNotifications = user.unseenNotifications;
    //Push new notification to user
    unseenNotifications.push({
      type: 'doctor-status-change',
      message: 'Your doctor account has been ' + status,
      onClickPath : '/notifications'
    })

    //change the user status to doctor after being approved
    user.isDoctor = status === 'approved' ? true : false;
    //save the user
    await user.save();
   
    res.status(200).send({
      message: "Doctors status updated successfully",
      success: true,
      data: doctor,
    })
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