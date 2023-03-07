import React from 'react'
import Layout from '../components/Layout'
import { Tabs } from 'antd';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {showLoading,hideLoading} from '../redux/alertsSlice'
import toast from 'react-hot-toast'
import {setUser} from '../redux/userSlice'



function Notifications() {
    const {user} = useSelector((state) => state.user);
    const Navigate = useNavigate();
    const dispatch = useDispatch()
    //Pushing seen notifications to read tab
    const markAllSeen = async () => {
      console.log('Marking all as seen')
      try{
        dispatch(showLoading())
        const response = await axios.post('/api/user/mark-all-notifications-as-seen',{userID: user._id}, {
          headers: {
              //We are getting the user object from backend and so we have to get it from local storage
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })     
        dispatch(hideLoading())
        if(response.data.success){
          toast.success(response.data.message)
          dispatch(setUser(response.data.data))
        }
        else{
          toast.error(response.data.message)
        }
      } catch (error){
        dispatch(hideLoading())
        toast.error('Something went wrong')
    
      }
    }

    const deleteAll = async () => {
      console.log('Marking all as seen')
      try{
        dispatch(showLoading())
        const response = await axios.post('/api/user/delete-all-notifications',{userID: user._id}, {
          headers: {
              //We are getting the user object from backend and so we have to get it from local storage
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })     
        dispatch(hideLoading())
        if(response.data.success){
          toast.success(response.data.message)
          dispatch(setUser(response.data.data))
        }
        else{
          toast.error(response.data.message)
        }
      } catch (error){
        dispatch(hideLoading())
        toast.error('Something went wrong')
    
      }
    }
    const unreadNotification = user?.unseenNotifications.map((notification) => (
        <div className = 'card p-2' onClick = {() => Navigate(notification.onClickPath)}>
            <div className="card-text">{notification.message}</div>
        </div>
      ));
      const readNotification = user?.seenNotifications.map((notification) => (
        <div className = 'card p-2' onClick = {() => Navigate(notification.onClickPath)}>
            <div className="card-text">{notification.message}</div>
        </div>
      ));
      
    
  return (
    <Layout>
        <h1 className = 'page-title'>Notifications</h1>
        <Tabs
    defaultActiveKey="1"
    items={[
      {
        label: <h4>Unread</h4>,
        key: '1',
        children:
        <div>
              <div className="d-flex justify-content-end">
                <h4 className="anchor" onClick= {()=>markAllSeen()}>Mark as all seen</h4>
              </div>
              {unreadNotification}
            </div>
        
        
        
      },
        
     
      //Render Notifications
      {
        label: <h4>Read</h4>,
        key: '2',
        children:
        <div>
        <div className="d-flex justify-content-end">
          <h4 className="anchor" onClick = {()=> deleteAll()} >Delete all</h4>
        </div>
        {readNotification}
      </div>
      },
    ]}
    
  />
    </Layout>
  )
}

export default Notifications