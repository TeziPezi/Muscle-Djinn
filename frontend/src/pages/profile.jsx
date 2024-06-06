import React, { useEffect, useState } from 'react';
import '../styles.css';
import axios from 'axios'


function Profile() {

    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('')

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081/profile')
        .then(res => {
            if(res.data.loginValue){
                setAuth(true)
                setUsername(res.data.username)
            } 
            else{
                setAuth(false)
                setMessage(res.data.Error)
            }
        })
        .catch(err => console.log(err));
    }, [])

    const handleDelete = () => {
        axios.get('http://localhost:8081/logout')
        .then(res => {
            window.location.reload();
        })
        .catch(err => console.log(err));
    }

    return (
    <div  className='container' style={{display: 'flex', justifyContent: 'space-around'}}>
       {
        auth ? 
        <div>
            <h3 style={{color: "white"}}>Welcome back {username}!</h3>
            <button type="button" className="Button" onClick={handleDelete}>Logout</button>
        </div>
        :
        <div>
            <h3>{message}</h3>
        </div>
        }
    </div>
    )
}

export default Profile