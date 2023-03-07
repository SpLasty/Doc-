import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { useSelector, useDispatch } from "react-redux";
import DoctorForm from "../components/DoctorForm";
import dayjs from "dayjs";

function Doctor() {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/apply-doctor", {
        ...values,
        userID: user._id,
        timings: [
          dayjs(values.timings[0]).format("HH:mm"),
          dayjs(values.timings[1]).format("HH:mm"),
        ]
      }, {
        headers: {
            //We are getting the user object from backend and so we have to get it from local storage
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        Navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };


  return (
    <Layout>
      <h1 className="doctor-title">Apply as a Doctor</h1>
      <hr />
      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
}

export default Doctor;
