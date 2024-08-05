import React,{useState,useEffect} from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import axios from 'axios';
import { MdOutlineWatchLater } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { BsCalendar2Month } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Row, Col, Dropdown,Card } from "react-bootstrap";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Outlet } from 'react-router-dom';

const Dr_patient = () => {
  const [pending, setPending] = React.useState(true); 
  // const [state,setState] = useState()
const [rows, setRows] = React.useState([]);
const [data, setData] = useState([]); 
const [loading, setLoading] = useState(true);
const [show, setShow] = useState(false);
const [show1, setShow1] = useState(false);
const [idToDelete, setIdToDelete] = useState("");
const [filters, setFilters] = useState({});
const [formData, setFormData] = useState({
  p_id: "",
  p_name: "",
  mobile: "",
  "gender":"",
  "age":"",
  "sumptoums":"",
  "date":"",
  // "image":""
});

//------------fatch-data-----------------
const fetchUsers = async (start = 0, end = 10) => {
  const response = await axios.get("http://localhost:8080/hptl/patient");

  setData(response.data.slice(start, end));
  setLoading(false);
};



useEffect(() => {
    
  fetchUsers();
}, []);

//----------------------------------

const columns = [
 
  {
    name: "Image",
    selector: (row) => row.image,
    cell: (row) => {
      return (
        <img
          src={
            row.image
              ? row.image
              : row.image
          }
          alt="Avatar"
          className="m-1"
          style={{ width: "30px", height: "30px", borderRadius: "10px" }}
        />
      );
    },
    // width: "8%",
    center: "center",
 
  },
  {
    name: 'Id',
    selector: row => row.p_id,
  },
 
  {
    name: 'Name',
    selector: row => row.p_name,
  },
  {
    name: 'Mobile',
    selector: row => row.mobile,
  },
  {
    name: 'Gender',
    selector: row => row.gender,
  },
  {
    name: 'Age',
    selector: row => row.age,
  },
  {
    name: 'Sumptoums',
    selector: row => row.sumptoums,
  },
  {
    name: 'Date',
    selector: row => row.date,
  },
 
  {
    name: "Action",
    cell: (row) => {
      return (
        <Dropdown className="justifyContent-around">
          <FaRegEdit
            
            style={{ color: "gray" }}
          />

          <MdDeleteForever
            size={23}
           
            style={{ color: "red", marginLeft: "1rem" }}
          />
        </Dropdown>
      );
    },
  },
];


React.useEffect(() => {
  const timeout = setTimeout(() => {
    setRows(data);
    setPending(false);
  }, 1500);
  return () => clearTimeout(timeout);
}, []);
const customStyles = {
rows: {
      fontSize:"12px",
  style: {
    minHeight: '25px', // override the row height
          fontSize:"12px",
  },
},
  columns: {
      fontSize:"12px",
  style: {
    minHeight: '42px', // override the row height
          fontSize:"12px",
  },
},
headCells: {
  style: {
    background: "#89bec5",
    paddingLeft: "2%",
    paddingRight: "2%",
    fontSize: "12px",
    // position:"fixed"
  },
},
cells: {
  style: {
    paddingLeft: '1%', // override the cell padding for data cells
    // paddingRight: '8px',
  },
},
  text:{
      style:{
          fontSize:"12px"
      },
  },
};

createTheme('solarized', {
  text: {
      
    primary: 'black',
    secondary: 'black',
  },
  columns:{
      fontSize:"12px"
  },
  background: {
    default: '#cacccf',
  },
  context: {
    // background: '#cb4b16',
    // text: '#FFFFFF',
    fontSize:"12px",
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
}, 'dark');
let styleobj = { "font-size": "78px" }

  return (
    <div>
    <Card style={{ width: '48rem' }}>
    <Card.Body>
     <Row>
     <Col className='d-flex justify-content-left' style={{fontFamily:"italic",fontWeight:"800"}}>
     <p>Patient Detalis</p>
     </Col>
     </Row>
      <DataTable columns={columns} data={data} progressPending={pending} paginations customStyles={customStyles} theme="solarized" style={styleobj}/>
    </Card.Body>
  </Card>
  <Outlet/>
    </div>
  )
}

export default Dr_patient
