import React, { useState } from 'react'
import './sign.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
     const [value,setValues]=useState({
         
          name:"",
          email:"",
          password:""
     })

     const navigate = useNavigate();
     const handleInput =(e)=>{
          setValues((prev)=>({...prev,[e.target.name]:[e.target.value]}))
     }

     const handleSubmit = (e)=>{
e.preventDefault();
axios.post('http://localhost:8080/signup',value)
.then(res=> {
     console.log(res)
     navigate('/login')
}
)
.catch(err => console.log(err))
     }
  return (
    <div className='container p-2' style={{overflowY:"hidden",overflowX:"hidden"}}>
   
    <section className="text-center">
     
      <div className="p-5 bg-image"></div>
      
    
      <div className="card mx-4 mx-md-5 shadow-5-strong" style={{
            marginTop: '-100px',
            background: 'hsla(0, 0%, 100%, 0.8)',
            backdropFilter: 'blur(30px)'
      }}>
        <div className="card-body py-5 px-md-5">
    
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-5">Sign up now</h2>
              <form onSubmit={handleSubmit}>
               
                <div className="row">
                 
                
                  <div className="col-md-6 mb-4">
                  
                    <div className="form-outline">
                      <input name='name' type="text" id="form3Example2" className="form-control" onChange={handleInput}/>
                      
                    </div>
                  </div>
                </div>
    
               
                <div className="form-outline mb-4">
                  <input name='email' type="email" id="form3Example3" className="form-control" onChange={handleInput}/>
                  <label className="form-label" for="form3Example3">Email address</label>
                </div>
    
                <div className="form-outline mb-4">
                  <input name='password' type="password" id="form3Example4" className="form-control" onChange={handleInput}/>
                  <label className="form-label" for="form3Example4">Password</label>
                </div>
    
                <button type="submit" className="btn btn-primary btn-block mb-4">
                  Sign up
                </button>
    
               
                <div className="text-center">
                  <p>or sign up with:</p>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                  </button>
    
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google"></i>
                  </button>
    
                  <button type ="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                  </button>
    
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    </div>
  )
}

export default Signup
