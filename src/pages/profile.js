import React, { useEffect, useState } from 'react'
//import { useAuth } from '../components/authcontext';

const Profile = () => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch("http://localhost:5001/authen", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer '+token
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.status  === 'ok') {
            setEmail(data.email)
        } else {
            //alert('authen failed')
            localStorage.removeItem('token');
            window.location = '/login'
        }
        //console.log("Success:", data);
      } )
      .catch ((error) => {
        console.error("Error:", error);
      })
      }, [])

    return (
      <div>
        <h2>Profile Page</h2>
        <p>Welcome, {email} </p>
        <button >Logout</button>
      </div>
    );
  };
  
  export default Profile;
