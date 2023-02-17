import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Helmets from "../components/Helmets";


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
        if (result.status === 'ok') {
          setUser(result.user)
          setIsLoaded(false)
        } else if (result.status === 'forbidden') {
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
  },
    [])

  if (isLoaded) return (
    <div className="d-flex align-items-center justify-content-center  h-3">
      Loading
    </div>
    )
  else {
    return (
      <body id="page-top">
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <Header />
              <div className="container-fluid">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                    <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                </div>

                <p>{user.id}</p>
                <p>{user.fname}</p>
                <p>{user.lname}</p>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <img src={user.avatar} alt={user.id} width={100} />
              </div>
            </div>
            <Footer />
          </div>
        </div>
        <Helmets />
      </body>
    )
  }


}

export default Index