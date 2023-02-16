import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Sidebar from "../components/Sidebar";

function Index() {
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()

  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://www.melivecode.com/api/auth/user", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status === 'ok') {
          setUser(result.user)
          setIsLoaded(false)
        } else if(result.status === 'forbidden') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'error'
          }).then((value) => {
            navigate('/')
          })
        }
        console.log(result)
      })
      .catch(error => console.log('error', error));
  }, [])

  if (isLoaded) return (<div>Loading</div>)
   else {
    return (
      <div>
        
        <p>{user.id}</p> 
        <p>{user.fname}</p> 
        <p>{user.lname}</p>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <img src={user.avatar} alt={user.id} width={100} /> 
      </div>
    )
  }
  

}

export default Index