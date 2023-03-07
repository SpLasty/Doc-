import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import DoctorForm from '../../components/DoctorForm'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { showLoading, hideLoading } from '../../redux/alertsSlice'
import { useDispatch } from 'react-redux'
import { useCallback, useEffect } from 'react';
import { setUser } from '../../redux/userSlice';
import { useState } from 'react';
import dayjs from 'dayjs';



function Profile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const {user} = useSelector((state) => state.user);
    const [doctor, setDoctor] = useState(null)
    const Navigate = useNavigate();

    const onFinish = async (values) => {

        
        try {
          dispatch(showLoading());
          const response = await axios.post('/api/doctor/update-doctor-profile', {
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


      const getDoctorData = useCallback(async () => {
        try {
          dispatch(showLoading());
          const response = await axios.post(
            '/api/doctor/get-doctor-info-by-id',
            {
                //Using params since it was calling the API before the page is rendered and thus doctor info was null. So we use this to take userID from url
                userID : params.userID
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          dispatch(hideLoading());
          if (response.data.success) {
            setDoctor(response.data.data)
          } 
        } catch (err) {
            dispatch(hideLoading());
        }
      }, [dispatch, navigate]);
    
      useEffect(() => {
          getDoctorData() }, []);


    
  return (
    // We only load the doctor Form if the user is actually a doctor
    <Layout>
    <h1 className="doctor-title">Apply as a Doctor</h1>
    <hr />
    {doctor && <DoctorForm onFinish={onFinish} initialValues={doctor} />}

  </Layout>
  )
}

export default Profile