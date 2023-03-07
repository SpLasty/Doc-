import React from "react";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Table } from "antd";
import Layout from "../../components/Layout";

function UsersList() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getUsersData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-users",
        {
            headers: {
                //We are getting the user object from backend and so we have to get it from local storage
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
      );
      console.log('Response:', response.data)
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };  useEffect(() => {
    getUsersData();
  },[])


  const columns = [
    {
        title: 'username',
        dataIndex: 'username',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        render: (text, record) => (
            <div className = 'd-flex'>
                <h4 className = 'anchor'>Block</h4>
               
            </div>
        )
    }
  ]

  return (
    <Layout>
      <h1 className="page-header">Users List </h1>
      <Table columns = {columns} dataSource = {users}/>
    </Layout>
  );
}

export default UsersList;
