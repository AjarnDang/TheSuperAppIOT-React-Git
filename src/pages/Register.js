import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Register() {
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "fname": inputs.fname,
            "lname": inputs.lname,
            "username": inputs.username,
            "password": inputs.password,
            "email": inputs.lname,
            "avatar": inputs.lname
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://www.melivecode.com/api/users/create", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.status === 'ok') {
                    MySwal.fire({
                        html: <i>{result.message}</i>,
                        icon: 'success'
                      }).then((value) => {
            
                        //token สำหรับยืนยันตัวตนว่าเข้าสู่ระบบแล้ว
                        localStorage.setItem('token', result.accessToken)
                        navigate('/')
                      })
                } else {
                    MySwal.fire({
                        html: <i>{result.message}</i>,
                        icon: 'error'
                      })
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicFullname">

                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="fname" value={inputs.fname || ""} onChange={handleChange} placeholder="Enter First name" />

                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" name="lname" value={inputs.lname || ""} onChange={handleChange} placeholder="Enter Last name" />    

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUandP">

                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" name="username" value={inputs.username || ""} onChange={handleChange} placeholder="Enter Username" />

                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="password" name="password" value={inputs.password || ""} onChange={handleChange} placeholder="Enter Password" />    
                
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUandP">

                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={inputs.email || ""} onChange={handleChange} placeholder="Enter email" />   

                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="text" name="text" value={inputs.email || ""} onChange={handleChange} placeholder="http//:example-avatar.jpg" />   
                
                </Form.Group>
    
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form> 
    )
}

export default Register