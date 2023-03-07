import React, { useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import ListOfDoctors from '../components/ListOfDoctors'
import { Row, Col } from 'antd'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { showLoading, hideLoading } from '../redux/alertsSlice'




const Home = () => {
  const [doctors, setDoctors] = useState([])
  const dispatch = useDispatch()


  const getData = async()=>{
    try{
      dispatch(showLoading())
      const response = await axios.get('/api/user/get-approved-doctors',           // Sending payload via {}
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }) 
      dispatch(hideLoading())
      if (response.data.success) {
        setDoctors(response.data.data)
      }
    }
    catch(error){
      dispatch(hideLoading())
      console.log(error)
    }
  }

  useEffect (() =>{
    getData()
  }, [])
  return (
    <Layout>
      <Row gutter = {20}>
        {doctors.map((doctor) => (
          <Col span = {8} xs ={24} sm = {24} lg = {8}>
            <ListOfDoctors doctor = {doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

export default Home