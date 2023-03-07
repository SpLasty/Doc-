import React from 'react';
import "../../index.css";
import { useEffect } from 'react'
import { useState } from 'react'
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import axios from 'axios'
import { Table } from 'antd'
import Layout from '../../components/Layout'
import toast from 'react-hot-toast'




function DoctorsList() {

    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();
  
    const getDoctorsData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get("/api/admin/get-all-doctors",                     //Dont send payload for get methods
          {
            headers: {
                //We are getting the user object from backend and so we have to get it from local storage
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
          setDoctors(response.data.data);
        }
      } catch (error) {
        dispatch(hideLoading());
      }
    }; 

    const updateStatus = async (record, status) => {
      try {
        dispatch(showLoading());
        const response = await axios.post("/api/admin/change-doctor-status", {doctorID: record._id, userID: record.userID, status: status },                     //Dont send payload for get methods
          {
            headers: {
                //We are getting the user object from backend and so we have to get it from local storage
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          //After updating user and changing status we have to get all doctors
          getDoctorsData();
        }
      } catch (error) {
        dispatch(hideLoading());
      }
    }; 

    useEffect(() => {
        getDoctorsData();
      },[])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            //Since doctors have first and last name, we need to combine them
            render: (text, record) => <h1 className = 'normal-text'>{record.firstName}  {record.lastName}</h1>
        },

        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
        },
        {
            title: 'status',
            dataIndex: 'status',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className = 'd-flex'>
                    {record.status === "pending" && ( <h4 className="anchor" onClick={() => updateStatus(record, "approved")} > Approve </h4> )}
                    {record.status === "approved" && ( <h4 className="anchor" onClick={() => updateStatus(record, "blocked")} > Reject </h4> )}
                </div>
            )
        }
    ]
      


  return (
    <Layout>
    <h1 className="page-header">Doctors List </h1>
    <Table columns = {columns} dataSource = {doctors}/>
  </Layout>
  )
}

export default DoctorsList