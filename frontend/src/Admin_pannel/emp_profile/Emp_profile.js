import React,{useEffect, useState} from 'react';
import './profile.scss';
import '../Assets/style/empProfile.scss';
import {Row,Col} from 'react-bootstrap';
import neeraj from '../Assets/images/neeraj.jpg';
import hp_lg from '../Assets/images/hp_lg.png';
import {  CardHeader, CardBody, CardFooter,Image,Stack,Button,ButtonGroup,Divider,Text,Heading } from '@chakra-ui/react';
import Card from 'react-bootstrap/Card';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { SiPrivateinternetaccess } from "react-icons/si";
import { TbPasswordFingerprint } from "react-icons/tb";
import { TbEditCircle } from "react-icons/tb";

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';




const Emp_profile = () => {

  const [data, setData] = useState([]); 
  const [dataId, setDataId] = useState({});

  const navigate = useNavigate();
  let location = useLocation()
  const patientId = location.state.id;
  // console.log(patientId)
  // console.log(dataId)
  

  const empProfileId = (id)=>{
    console.log(id)
    navigate('/empProfile',{state:{id:id}})
    // console.log(state , id)
  }
  const fetchUsersid = async (patientId) => {
    console.log(patientId)
    const response = await axios.get(
      `http://localhost:8080/hptl/profid/${patientId}`
    );
    setDataId(response.data[0]);
          

  };
  useEffect(()=>{
    fetchUsersid(patientId)
  },[])
  return (
  <>
     <div className='profile-wrap '>
     <header className="header">
    <div className="logo">
      <h2>Profile</h2>
    </div>
    <div className="profile">
      <img src={hp_lg} alt="Profile" className="profile-pic" />
     
    </div>
  </header>
    <div className="doctor-profile d-flex">
    
  <Row className='d-flex'>
  <Col className='md-4 w-30' >
     
     

    <Card style={{ width: '25rem' }}>
    <Card.Body>
      <Card.Title style={{display:"flex",justifyContent:"center"}}>
      <div style={{padding:"3.3%",borderRadius:"50%",width:"8rem",height:"8rem",borderStyle:"dashed"}}>
      <Image
      src={neeraj}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
      style={{width:"100px",height:"100px",borderRadius:"50%"}}
    />
    <label htmlFor="upload-photo">
    <TbEditCircle style={{marginTop:"-45px",marginLeft:"4rem",borderRadius:"50%",backgroundColor:"white",cursor: "pointer"}} type='file'/>
    </label>
    <input
    type="file"
    id="upload-photo"
    name="photo"
    style={{ display: "none"}}
    
/>
    </div>
    </Card.Title>
    <Card.Title className='font-weight-700 mb-2' style={{fontWeight:"bold",fontFamily:'italic'}}>{dataId.emp_name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted mt-2" style={{fontWeight:"bold",fontFamily:'italic',color:"GrayText"}}><MdOutlineAlternateEmail /> :&nbsp;{dataId.email}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted mt-2"><FaPhoneAlt size={13}/> <span style={{fontSize:"20px"}}>:</span>&nbsp;+21-&nbsp;{dataId.mobile}</Card.Subtitle>

      <hr/>
      <Card.Text className='p-2'>
      <div className='pi' style={{textAlign:"left"}}>
    
        <Link to='/empProfile'><Row className='side-lbl mt-1 rounded-2 d-flex' onClick={()=> empProfileId(dataId)}><Col style={{cursor: "pointer"}}
        ><GoPerson /> &nbsp;
        Personal Info</Col></Row></Link>
        </div>
        <div className='pi' style={{textAlign:"left"}}>
        <Link to='/empProfile/patientinfo'>
        <Row className='side-lbl mt-2 rounded-2' style={{cursor: "pointer"}}>
        <Col style={{cursor: "pointer"}}
        ><BsFillPersonPlusFill /> &nbsp;Patient</Col>
        </Row>
        </Link>
        </div>
        <div className='pi' style={{textAlign:"left"}}>
       <Link to='/empProfile/appoinment'> <Row className='side-lbl mt-2 rounded-2' style={{cursor: "pointer"}}><Col style={{cursor: "pointer"}}><MdOutlineDateRange /> &nbsp;Appoinments</Col></Row></Link>
        </div>
        <div className='pi' style={{textAlign:"left"}}>
        <Link to='#'></Link><Row className='side-lbl mt-2 rounded-2' style={{cursor: "pointer"}}><Col style={{cursor: "pointer"}}><FaRegMoneyBill1 /> &nbsp;Payments</Col></Row>
        </div>
        <div className='pi' style={{textAlign:"left"}}>
        <Row className='side-lbl mt-2 rounded-2' style={{cursor: "pointer"}}><Col style={{cursor: "pointer"}}><SiPrivateinternetaccess /> &nbsp;Access Controll</Col></Row>
        </div>
        <div className='pi' style={{textAlign:"left"}}> 
        <Link to='/empProfile/password'><Row className='side-lbl mt-2 rounded-2' ><Col style={{cursor: "pointer"}}><TbPasswordFingerprint /> &nbsp;Change Password</Col></Row></Link>
        </div>
      </Card.Text>
    
    </Card.Body>
  </Card>
      
      </Col>
      <Col className='md-8 w-70'>

    
      </Col>

      </Row>
      <div>
    <Outlet/>
    </div>
    </div>
    
    </div>
    
    </>

  );
};

export default Emp_profile;