import React from 'react'
import { useNavigate } from 'react-router-dom'



function ListOfDoctors({doctor}) {
    const navigate = useNavigate()
  return (
    <div className = 'card p-2' onClick = {() => navigate(`/book-appointment/${doctor._id}`)}>
        <h4 className = 'card-title'>{doctor.firstName} {doctor.lastName}</h4>
        <hr/>
        <p ><b>Phone Number: </b>{doctor.phoneNumber}</p>
        <p  ><b>Address: </b>{doctor.address}</p>
        <p  ><b>Fee per visit: </b>{doctor.feePerVisit}</p>
        <p  ><b>Availability: </b>{doctor.timings[0]} - {doctor.timings[1]}</p>
    </div>
  )
}

export default ListOfDoctors