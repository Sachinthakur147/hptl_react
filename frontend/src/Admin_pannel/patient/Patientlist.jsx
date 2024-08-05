// import React,{useState,useEffect} from 'react'
// import DataTable, { createTheme } from 'react-data-table-component';
// import axios from 'axios'

// const Patientlist = () => {
//   const rowDisabledCriteria = row => row.isOutOfStock;
//   const [pending, setPending] = React.useState(true);
//   const [rows, setRows] = React.useState([]);
//   const [data, setData] = useState([]); 
//   const [loading, setLoading] = useState(true);
  
//   const fetchUsers = async (start = 0, end = 10) => {
//     const response = await axios.get("http://localhost:8080/hptl/patient");

//     setData(response.data.slice(start, end));
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);
//   const columns = [
//     {
//       name: 'p_id',
//       selector: row => row.p_id,
//     },
//     {
//       name: 'p_name',
//       selector: row => row.p_name,
//     },
//     {
//       name: 'mobile',
//       selector: row => row.mobile,
//     },
//     {
//       name: 'gender',
//       selector: row => row.gender,
//     },
//     {
//       name: 'age',
//       selector: row => row.age,
//     },
//     {
//       name: 'sumptoums',
//       selector: row => row.sumptoums,
//     },
//     {
//       name: 'date',
//       selector: row => row.date,
//     },
//   ];
  

//   React.useEffect(() => {
//     const timeout = setTimeout(() => {
//       setRows(data);
//       setPending(false);
//     }, 1500);
//     return () => clearTimeout(timeout);
//   }, []);
//   const customStyles = {
// 	rows: {
//         fontSize:"17px",
// 		style: {
// 			minHeight: '62px', // override the row height
//             fontSize:"17px",
// 		},
// 	},
//     columns: {
//         fontSize:"20px",
// 		style: {
// 			minHeight: '62px', // override the row height
//             fontSize:"20px",
// 		},
// 	},
// 	headCells: {
// 		style: {
// 			paddingLeft: '8px', // override the cell padding for head cells
// 			paddingRight: '8px',
// 		},
// 	},
// 	cells: {
// 		style: {
// 			paddingLeft: '8px', // override the cell padding for data cells
// 			paddingRight: '8px',
// 		},
// 	},
//     text:{
//         style:{
//             fontSize:"20px"
//         },
//     },
// };

// createTheme('solarized', {
//     text: {
        
//       primary: 'black',
//       secondary: 'black',
//     },
//     columns:{
//         fontSize:"20px"
//     },
//     background: {
//       default: '#cacccf',
//     },
//     context: {
//       background: '#cb4b16',
//       text: '#FFFFFF',
//       fontSize:"20px",
//     },
//     divider: {
//       default: '#073642',
//     },
//     action: {
//       button: 'rgba(0,0,0,.54)',
//       hover: 'rgba(0,0,0,.08)',
//       disabled: 'rgba(0,0,0,.12)',
//     },
//   }, 'dark');
//   let styleobj = { "font-size": "78px" }
//   return (
//     <div className='w-100 p-2'>
//     <DataTable title="Patient-List" columns={columns} data={data} progressPending={pending}  paginations customStyles={customStyles} theme="solarized" style={styleobj}/>
     
//     </div>
//   )
// }

// export default Patientlist



import React,{useState,useEffect} from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import axios from 'axios';
import './style.css';
import hp_lg from '../Assets/images/hp_lg.png';
import { MdOutlineWatchLater } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { BsCalendar2Month } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Row, Col, Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Patientlist = () => {
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

  const [dataId, setDataId] = useState({});
  const [patientId, setPatientId] = useState();
  const [updateData, setUpdateData] = useState({
    p_name: "",
    mobile: "",
    "gender":"",
    "age":"",
    "sumptoums":"",
    "date":"",
    // "image":""
  });
  // console.log(patientId, "patientId");


  //------------search---------
  const [filter,setFilter] = useState([]);
  const [search,setSearch] = useState('')


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateClose = () => {
    setShow1(false);
    setDataId("");
  };
  const updateShow = () => setShow1(true);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/hptl/patient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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

  const updateSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/hptl/patient/${patientId}`, updateData)
      .then((result) => {
        console.log(result);

        if (result.data.Status) {
          fetchUsers();
          // console.log(result);
          updateClose();
        } else {
          
          // setDataId("");
          fetchUsers();
          // console.log(result);
          updateClose();
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:8080/hptl/patient");

    setData(response.data);
    setLoading(false);
  };

  const fetchUsersid = async (patientId) => {
    const response = await axios.get(
      `http://localhost:8080/hptl/patient/${patientId}`
    );
    setDataId(response.data);

  };

  const handleDelete = () => {
    setData(data.filter((item) => item.p_id !== idToDelete));
    setIdToDelete("");
  };

  //=========================delete===================
  const deleteUsersid = async (deptIds) => {
    const response = await axios
      .delete(`http://localhost:8080/hptl/patient/${deptIds}`)
      .then(() => {
        fetchUsers();
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
    // setDataId(response.data);
  };

  

  useEffect(() => {
    
    fetchUsers();
  }, []);

  useEffect(()=>{
    const result = data.filter((item)=>{
      return item.p_name.toLowerCase().match(search.toLocaleLowerCase())
    })
    setFilter(result)
      },[search])

  const handleConfirmation = (id) => {
    // Example of a confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUsersid(id);
        Swal.fire("Deleted!", "Your patient data has been deleted.", "success");
        fetchUsers();
      }
    });
  };


//   const imageBodyTemplate = (data) => {
//     return <img src={data.image} alt={data.image} className="w-4rem shadow-2 border-round" />;
// };

  const columns = [
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
      name: "Action",
      cell: (row) => {
        return (
          <Dropdown className="justifyContent-around">
            <FaRegEdit
              onClick={() => {
                updateShow();
                setPatientId(row.p_id);
                fetchUsersid(row.p_id)
              }}
              size={20}
              style={{ color: "gray" }}
            />

            <MdDeleteForever
              size={23}
              onClick={() => {
                handleDelete();
                handleConfirmation(row.p_id);
                setPatientId(row.p_id);
              }}
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
        fontSize:"17px",
		style: {
			minHeight: '45px', // override the row height
            fontSize:"17px",
		},
	},
    columns: {
        fontSize:"20px",
		style: {
			minHeight: '62px', // override the row height
            fontSize:"20px",
		},
	},
	headCells: {
    style: {
      background: "#89bec5",
      paddingLeft: "2%",
      paddingRight: "2%",
      fontSize: "17px",
      // position:"fixed"
    },
	},
	cells: {
		style: {
			paddingLeft: '2%', // override the cell padding for data cells
			// paddingRight: '8px',
		},
	},
    text:{
        style:{
            fontSize:"20px"
        },
    },
};

createTheme('solarized', {
    text: {
        
      primary: 'black',
      secondary: 'black',
    },
    columns:{
        fontSize:"20px"
    },
    background: {
      default: '#cacccf',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
      fontSize:"20px",
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
    <div className="patientlist">
      <header className="header">
        <div className="logo">
          <h2>Patientlist</h2>
        </div>
        <div className="profile">
          <img src={hp_lg} alt="Profile" className="profile-pic" />
         
        </div>
      </header>
      
      <div className="main-content">
     
        
        <main className="content">
          
          
          <div className="stats-cards">
            <div className="cardpatient">
              <h5><span style={{fontWeight:"800",fontFamily:"italic"}}>Today Patients</span></h5>
              <div className='d-flex justify-content-between'><p className="count">10 </p><p className='watch' style={{backgroundColor:"#63b6a2",height:"1.8rem",width:"2rem",borderRadius:"5px",color:"white"}}><MdOutlineWatchLater size={20}/></p></div>
              <p className="label">Total Patients &nbsp;<span style={{color:"#63b6a2"}}>10</span>&nbsp; today</p>
            </div>
            <div className="cardpatient">
              <h5>  <span style={{fontWeight:"800",fontFamily:"italic"}}>Monthly Patients</span></h5>
            
              <div className='d-flex justify-content-between'><p className="count">230 </p><p className='watch' style={{backgroundColor:"#f87218",height:"1.8rem",width:"2rem",borderRadius:"5px",color:"white"}}><BsCalendar2Month  size={20}/></p></div>
              <p className="label">Total Patients &nbsp;<span style={{color:"#f87218"}}> 230</span>&nbsp; this month</p>
            </div>
            <div className="cardpatient">
              <h5><span style={{fontWeight:"800",fontFamily:"italic"}}>Yearly Patients</span></h5>
              <div className='d-flex justify-content-between' ><p className="count">1500 </p><p className='watch' style={{backgroundColor:"#23c65d",height:"1.8rem",width:"2rem",borderRadius:"5px",color:"white"}}><LuCalendarDays size={20}/></p></div>
              <p className="label">Total Patients &nbsp;<span style={{color:"#23c65d"}}>1500 </span>&nbsp; this year</p>
            </div>
          </div>
          
          <div className="patient-table">
            <div className="table-header">
              <div className="search-bar">
              
          <input type='text' className="w-100 form-control"
          placeholder="Search..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
              </div>
              <div className="filters">
               
                <Dropdown>
                <Dropdown.Toggle variant="default" id="dropdown-basic" style={{fontWeight:"600",height:"3rem"}}>
                  Short by
                </Dropdown.Toggle>
          
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Name</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Sumptoums action</Dropdown.Item>
                  
                </Dropdown.Menu>
              </Dropdown>
              
          
                <input type="text" placeholder="04/04/2024 - 04/04/2024" />
                <button className="filter-btn">Filter</button>
              </div>
            </div>
            
            <Row>
        <Col className="d-flex content-center" style={{ fontWeight: "700" }}>
          
        </Col>
        <Col style={{ display: "flex", justifyContent: "end" }}>
          <Button className="mb-2 " variant="primary" onClick={handleShow}>
            Add Patient
          </Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} style={{marginTop:"5%"}}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

          <Row>
          <Col>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1"
              style={{ justifyContent: "space-between" }}
            >
              <Form.Label>ID</Form.Label>
              <Form.Control
                name="p_id"
                value={formData.p_id}
                onChange={handleChange}
                className="w-75"
                type="text"
                placeholder="Patient ID"
                autoFocus
              />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
              style={{ justifyContent: "space-between" }}
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="p_name"
                value={formData.p_name}
                onChange={handleChange}
                className="w-75"
                type="text"
                placeholder="Name"
              />
            </Form.Group>
            </Col>
            </Row>

            <Row>
            <Col>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
              style={{ justifyContent: "space-between" }}
            >
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-75"
                type="text"
                placeholder="Mobile no."
              />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
              style={{ justifyContent: "space-between" }}
            >
              <Form.Label>Gender</Form.Label>
              <Form.Control
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-75"
                type="text"
                placeholder="Gender"
              />
            </Form.Group>
            </Col>
            </Row>

            <Row>
            <Col>
            <Form.Group
            className="mb-3 d-flex"
            controlId="exampleForm.ControlTextarea1"
            style={{ justifyContent: "space-between" }}
          >
            <Form.Label>Age</Form.Label>
            <Form.Control
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-75"
              type="number"
              placeholder="Age"
            />
          </Form.Group>
          </Col>
         <Col>
         


            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
              style={{ justifyContent: "space-between" }}
            >
              <Form.Label>Date</Form.Label>
              <Form.Control
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-75"
                type="date"
                placeholder="Date"
              />
            </Form.Group>
            </Col>
            </Row>

            <Row>

            <Col>
            <Form.Group
            className="mb-3 d-flex"
            controlId="exampleForm.ControlTextarea1"
            style={{ justifyContent: "space-between" }}
          >
            <Form.Label>Sumptoums</Form.Label>
            <Form.Control
              name="sumptoums"
              value={formData.sumptoums}
              onChange={handleChange}
              className="w-75"
              type="text"
              placeholder="Sumptoms"
            />
          </Form.Group>
            </Col>
            <Col>
            
          </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Col>
              <Col
                className="align-end"
                style={{ justifyContent: "end", display: "flex" }}
              >
                <Button variant="primary" type="submit">
                  Add Patient
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
            <DataTable columns={columns}
            data={data}
            progressPending={pending}
            pagination
            paginationPerPage={10}
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            customStyles={customStyles}
            theme="solarized"
            style={{ width: '100%' }}/>
            
          
          </div>
          <Modal show={show1} onHide={updateClose} style={{marginTop:"5%"}}>
          <Modal.Header closeButton>
            <Modal.Title>Update Patient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={updateSubmit}>
  
            <Row>
            <Col>
              <Form.Group
                className="mb-3 d-flex"
                controlId="exampleForm.ControlInput1"
                style={{ justifyContent: "space-between" }}
              >
                <Form.Label>ID</Form.Label>
                <Form.Control
                disabled
                name="p_id"
                defaultValue={dataId?.p_id}
                onChange={(e) =>
                  setPatientId({ ...formData, p_id: e.target.value })
                }
                className="w-75"
                type="text"
                autoFocus
              />
              </Form.Group>
              </Col>
              <Col>
              <Form.Group
                className="mb-3 d-flex"
                controlId="exampleForm.ControlTextarea1"
                style={{ justifyContent: "space-between" }}
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                name="p_name"
                defaultValue={dataId?.p_name}
                onChange={(e) =>
                  setUpdateData({ ...updateData, p_name: e.target.value })
                }
                className="w-75"
                type="text"
                placeholder="patient name"
                />
              </Form.Group>
              </Col>
              </Row>
  
              <Row>
              <Col>
              <Form.Group
                className="mb-3 d-flex"
                controlId="exampleForm.ControlTextarea1"
                style={{ justifyContent: "space-between" }}
              >
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                name="mobile"
                defaultValue={dataId?.mobile}
                onChange={(e) =>
                  setUpdateData({ ...updateData, mobile: e.target.value })
                }
                className="w-75"
                type="text"
                placeholder="mobile"
                />
              </Form.Group>
              </Col>
              <Col>
              <Form.Group
                className="mb-3 d-flex"
                controlId="exampleForm.ControlTextarea1"
                style={{ justifyContent: "space-between" }}
              >
                <Form.Label>Gender</Form.Label>
                <Form.Control
                name="gender"
                defaultValue={dataId?.gender}
                onChange={(e) =>
                  setUpdateData({ ...updateData, gender: e.target.value })
                }
                className="w-75"
                type="text"
                placeholder="gender"
                />
              </Form.Group>
              </Col>
              </Row>
  
              <Row>
              <Col>
              <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
              style={{ justifyContent: "space-between" }}
            >
              <Form.Label>Age</Form.Label>
              <Form.Control
              name="age"
                defaultValue={dataId?.age}
                onChange={(e) =>
                  setUpdateData({ ...updateData, age: e.target.value })
                }
                className="w-75"
                type="text"
                placeholder="age"
              />
            </Form.Group>
            </Col>
           <Col>
           
  
  
              <Form.Group
                className="mb-3 d-flex"
                controlId="exampleForm.ControlTextarea1"
                style={{ justifyContent: "space-between" }}
              >
                <Form.Label>Date</Form.Label>
                <Form.Control
                name="date"
                defaultValue={dataId?.date}
                onChange={(e) =>
                  setUpdateData({ ...updateData, date: e.target.value })
                }
                className="w-75"
                type="year"
                placeholder="date"
                />
              </Form.Group>
              </Col>
              </Row>
  
              <Row>
  
              <Col>
              <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
              style={{ justifyContent: "space-between" }}
            >
              <Form.Label>Sumptoums</Form.Label>
              <Form.Control
              name="p_name"
              defaultValue={dataId?.sumptoums}
              onChange={(e) =>
                setUpdateData({ ...updateData, sumptoums: e.target.value })
              }
              className="w-75"
              type="text"
              placeholder="sumptoums"
              />
            </Form.Group>
              </Col>
              <Col>
              
            </Col>
              </Row>
              <Row>
                <Col>
                  <Button variant="secondary" onClick={updateClose}>
                    Close
                  </Button>
                </Col>
                <Col
                  className="align-end"
                  style={{ justifyContent: "end", display: "flex" }}
                >
                  <Button variant="primary" type="submit">
                    Update Patient
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
        </main>
      </div>
    </div>
  );
};

export default Patientlist;