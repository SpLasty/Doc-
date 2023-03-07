const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },

    userID:{
        type: String,
        required: true
    },
    phoneNumber : {
        type: String,
        required: true
    },
    website : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },

    // doctor's speciality
    specialization : {
        type: String,
        required: true
    },
    // doctor's experience
    experience : {
        type: String,
        required: true
    },
    // doctor fees
    feePerVisit : {
        type: Number,
        required: true
    },
    // doctor's appointment timings
    timings : {
        type: Array,
        required: true
    },
    // doctor's approval status
    status:{
        type: String,
        default: 'pending'
    }


},
{
    timestamps: true,
}
)


module.exports = mongoose.model('Doctor', doctorSchema);