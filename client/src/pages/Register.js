import React, { useState } from 'react';
import './style.css'
import { API } from '../api/Request';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
      if(name && email && password) {
        const res = await API.PostRequest("/user/registeration", {name, email, password});
        if(res?.status === 200) {
          alert(res?.data?.message);
          setTimeout(() => {
            const localData = {
              userId: res?.data?.userId,
              name: res?.data?.name,
              email: res?.data?.email
            }
            localStorage.setItem("user", JSON.stringify(localData))
            navigate('/')
          }, 1000)
        } else {
          alert(res?.data?.message || res?.data?.Error)
        }
        
      }else {
        alert("please fill the Register form complete !");
      }
    }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} style={{display:'flex', flexDirection:"column", alignItems:"center"}}>
        <h2> Registeration </h2>
        <div className='row'>
        <label>Name* :</label>
        <input type='text' onChange={(e) => setName(e.target.value)}/>
        </div><br></br>

        <div className='row'>
            <label>Email* :</label>
            <input type='email' onChange={(e) => setEmail(e.target.value)}/>
        </div><br></br>

        <div className='row'>
            <label>Password* :</label>
            <input type='password' onChange={(e) => setPassword(e.target.value)}/>
        </div><br></br>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Register
