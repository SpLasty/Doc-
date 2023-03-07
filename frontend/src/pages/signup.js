import React from 'react'
import 'antd/dist/reset.css'
import { Button, Checkbox, Form, Input } from 'antd'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {showLoading,hideLoading} from '../redux/alertsSlice'


const Signup = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate();
  
  const onFinish = async(values) => {
    
    try{
      dispatch(showLoading())
      const response = await axios.post('/api/user/signup',values)
      dispatch(hideLoading())
      if(response.data.success){
        toast.success(response.data.message)
        toast('Redirecting to Login page')
        Navigate('/login')
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error){
      dispatch(hideLoading())
      toast.error('Something went wrong')
  
    }
  }

  return (
    <div className = 'authenticate'>
      <div className = 'form card p-2'>
        <h1 className = 'card-title'>SignUp</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label = 'Username' name = 'username'>
            <Input placeholder = 'Enter username'/>
          </Form.Item>
          <Form.Item label = 'Email' name = 'email'>
            <Input placeholder = 'Enter your email'/>
          </Form.Item>
          <Form.Item label = 'Password' name = 'password'>
            <Input placeholder = 'Enter your password' type='password'/>
          </Form.Item>
          <Button className='primary-button my-4 full-width-button' htmlType='submit' >Register</Button>

          <Link to = '/login' className = 'loginlink'>Or Login !</Link>
        </Form>
      </div>
    </div>
  )
}

export default Signup ;