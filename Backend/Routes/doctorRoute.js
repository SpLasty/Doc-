const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')
const auth = require('../authorization/auth')



router.post('/get-doctor-info-by-id',auth, async(req,res)=> {
  try{
    const doctor = await Doctor.findOne({ userID: req.body.userId })
    res.status(200).send({
        success: true,
        data: doctor,
        message: 'Doctor info fetched successfully'
    })
  }
  catch(error){
    res.status(500).send({ message: 'Could not get user info', success: false, })
    console.log(error)
  }
})


router.post('/update-doctor-profile',auth, async(req,res)=> {
    try{
      const doctor = await Doctor.findOneAndUpdate({
        userID: req.body.userId}, req.body)
      res.status(200).send({
          success: true,
          data: doctor,
          message: 'Doctor profile updated successfully'
      })
    }
    catch(error){
      res.status(500).send({ message: 'Could not get user info', success: false, })
      console.log(error)
    }
  })


module.exports = router;