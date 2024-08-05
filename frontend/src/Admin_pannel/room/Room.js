import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { InputText } from "primereact/inputtext";
import Swal from "sweetalert2";
import './room.scss';
import axios from "axios";
import hp_lg from '../Assets/images/hp_lg.png';
import Card from 'react-bootstrap/Card';
import { Outlet } from 'react-router-dom';

const Roomlist = () => {
  const rowDisabledCriteria = (row) => row.isOutOfStock;
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [filters, setFilters] = useState({});
  const [roomData, setRoomData] = useState({
    room_id: "",
  });
  const [roomId, setroomId] = useState();
  console.log(roomId, "roomId");
  const [deptId, setDeptId] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setRoomData({
      ...roomData,
      [e.target.name]: e.target.value,
    });
  };

  /////////   For Search    ///////////////

  // const [view, setView] = useState([]);
const [filter,setFilter] = useState([])
const [search, setSearch] = useState('')
//----------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/hptl/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data saved successfully:", data);
        fetchUsers();
        handleClose();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };


  //-------------------------------------------------get method--------------------
  const fetchUsers = async (start = 0, end = 10) => {
    const response = await axios.get("http://localhost:8080/hptl/room");

    setData(response.data.slice(start, end));
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

//==================search fun=======================
  useEffect(()=>{
    const result = data.filter((item)=>{
      return item.room_id.toLowerCase().match(search.toLocaleLowerCase())
    })
    setFilter(result)
  },[search])


  //---------------delete------------------
  const handleDelete = () => {
     setData(data.filter(item => item.room_id !== idToDelete));
     setIdToDelete('');
   };

   
  const deleteUsersid = async (roomIds) => {
     const response = await axios.delete(
       `http://localhost:8080/hptl/room/${roomIds}`
     )
     .then(()=>{
       fetchUsers();
       setLoading(true);
 
     }).catch((err)=>{
       console.log(err)
     })
     // setDataId(response.data);
 
   };


   const handleConfirmation = (id) => {
     // Example of a confirmation dialog
     Swal.fire({
       title: 'Are you sure?',
       text: 'You will not be able to revert this!',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Yes, delete it!',
       cancelButtonText: 'No, cancel!',
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33'
     }).then((result) => {
       if (result.isConfirmed) {
         deleteUsersid(id)
         Swal.fire(
           'Deleted!',
           'Your file has been deleted.',
           'success'
         )
         fetchUsers();
       }
     });
   };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.room_id,
    },

    {
      name: "Action",
      cell: (row) => {
        return (
          <Dropdown className="justifyContent-around">
            <FaRegEdit size={20} style={{ color: "gray" }} />

            <MdDeleteForever
            onClick={() => {
               handleDelete();
               handleConfirmation(row.room_id)
               setDeptId(row.room_id);
             }}
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
      style: {
        minHeight: "45px", // override the row height
        fontSize: "17px",
      },
    },

    headCells: {
      style: {
        background: "#89bec5",
        paddingLeft: "2%",
        paddingRight: "2%",
        fontSize: "17px",
        fontWeight:"700",
        fontFamily: "Arial, sans-serif",
        // position:"fixed"
      },
    },
    cells: {
      style: {
        paddingLeft: "2%", // override the cell padding for data cells
        // paddingRight: "2%",
      },
    },
    text: {
      style: {
        fontSize: "20px",
      },
    },
  };

  createTheme(
    "solarized",
    {
      text: {
        primary: "black",
        secondary: "black",
      },
      columns: {
        fontSize: "20px",
      },
      background: {
        default: "#cacccf",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
        fontSize: "20px",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  return (
    <>
      <div className=" " style={{width:"80vw"}}>
      <header className="header">
    <div className="logo">
      <h2>Room list</h2>
    </div>
    <div className="profile">
      <img src={hp_lg} alt="Profile" className="profile-pic" />
     
    </div>
  </header>
        <Row style={{marginBottom:"1%",marginTop:"2%"}}>
          <Col className="d-flex content-center" >
          
          <input type='text' className="w-25 form-control"
          placeholder="Search..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        
              </Col>
          <Col style={{display:"flex",justifyContent:"end"}}>
          <Button className="mb-2 " variant="primary" onClick={handleShow}>
          Add
        </Button>
        </Col>
        </Row>
        

        <div className="d-flex justify-content-end">
          
        </div>
        <Modal show={show} onHide={handleClose} style={{marginTop:"5%"}}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3 d-flex"
                controlId="exampleForm.ControlInput1"
                style={{ justifyContent: "space-between" }}
              >
                <Form.Label>ID</Form.Label>
                <Form.Control
                  name="room_id"
                  value={roomData.room_id}
                  onChange={handleChange}
                  className="w-75"
                  type="text"
                  placeholder="department ID"
                  autoFocus
                />
              </Form.Group>
            <Row className="content-center">
            <Col>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              </Col>
              <Col className="align-end" style={{justifyContent:"end",display:"flex"}}>
              <Button variant="primary" type="submit">
                Save Dept
              </Button>
              </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer
            className=""
            style={{ justifyContent: "space-between" }}
          ></Modal.Footer>
        </Modal>

        <div className="card" style={{ height: "50vh" }}>
          <div>
          <Card>
          <Card.Body>
            <DataTable
              tableStyle={{ minWidth: "50rem" }}
              columns={columns}
              data={filter}
              timeout
              pagination
              selectableRowsHighlight
              selectableRows
              highlightOnHover
              scrollY={200}
              customStyles={customStyles}
              fixedHeader
            ></DataTable>
            </Card.Body>
            </Card>
          </div>
        </div>
        <Outlet/>
      </div>
    </>
  );
};

export default Roomlist;
