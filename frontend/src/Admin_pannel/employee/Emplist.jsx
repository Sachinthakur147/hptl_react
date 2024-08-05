

import React,{useState,useEffect} from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import axios from 'axios';
import './emp.scss';
import hp_lg from '../Assets/images/hp_lg.png';
import { MdOutlineWatchLater } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { BsCalendar2Month } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Row, Col, Dropdown, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaEye } from "react-icons/fa6";
import { navigate,useLocation,useNavigate } from 'react-router-dom';
import { Tooltip } from '@chakra-ui/react'


const Emplist = () => {
  const [pending, setPending] = React.useState(true); 
    // const [state,setState] = useState()
  const [rows, setRows] = React.useState([]);
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show1, setShow1] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [filters, setFilters] = useState({});
  const [formData, setFormData] = useState({
    emp_id: "",
    emp_name: "",
    email: "",
    password:"",
    qualification:"",
    roles:""
  });

  const [dataId, setDataId] = useState({});
  const [deptId, setDeptId] = useState();
  const [updateData, setUpdateData] = useState({
    emp_name: "",
    email: "",
    password:"",
    qualification:"",
    roles:""
  });

  const [empId, setEmpId] = useState([])
  const [rolePost, setRolePost] = useState([])


  function postroledata(roll_id, emp_id) {
    setRolePost(roll_id)

    setEmpId(emp_id)
  }

  const postdata = {
    roll_id: rolePost,

    emp_id: empId,
  }

  const handelrolepost = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8080/hptl/role_assign', postdata)
    try {
      console.log(res.data)
      fetchUsers();

      console.log("data post successfully")
      handleClose3();

      console.log("data post successfully")

    } catch (err) {
      console.log("data not insert ......", err)
    }
  }

const [roleDelete,setRoleDelete] =useState("");
const [empIdDelete,setEmpIdDelete] = useState("")

  const deleterole= (roll_id,emp_id)=>{
    setEmpIdDelete(emp_id)
    setRoleDelete(roll_id)
  }

  const deleteData = {
    emp_id:empIdDelete,
    roll_id:roleDelete,
  }
  const handelroledelete = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8080/hptl/role_assign/delete', deleteData)
    try {
      console.log(res.data)
      fetchUsers();

      console.log("data post successfully")
      handleClose4();

      console.log("data post successfully")

    } catch (err) {
      console.log("data not insert ......", err)
    }
  }




  // console.log(deptId, "deptId");

  const [filter,setFilter] = useState([])
  const [search, setSearch] = useState('')

  const location = useLocation()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);


  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

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

    fetch("http://localhost:8080/hptl/employee", {
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
      .put(`http://localhost:8080/hptl/employee/${deptId}`, updateData)
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
    const response = await axios.get("http://localhost:8080/hptl/employee");

    setData(response.data);
    setLoading(false);
  };


  //--------------------------Role Assign--------------------

const  [roleAs, setRoleAs] = useState([]);

  const roleAssign = async ()=>{
    const res = await axios.get("http://localhost:8080/hptl/role_assign");
console.log(res,"res")
    setRoleAs(res.data)

    
  };

  useEffect(()=>{
    roleAssign();
  },[])

//--------------------------------------------------------
  const  [role, setRole] = useState([]);

  const roleget = async ()=>{
    const resrole = await axios.get("http://localhost:8080/hptl/role");
console.log(resrole,"resname")
setRole(resrole.data)

    
  };


  useEffect(()=>{
    roleget();
  },[])

  const [roleId,setRoleId] = useState({})



  const handleUpdateRole = async (e,row) => {
    e.preventDefault();
    console.log(row,e.target.value)
    try {
      if (e.target.value) {
        
        const roleChangeData = {
          roll_id: e.target.value, 
          emp_id: row, 
        };
  
        const response = await axios.post(
          "http://localhost:8080/hptl/role_assign",
          roleChangeData // Pass roleChangeData instead of roleChange directly
        );
        roleAssign()
        console.log(response.data);
        // fatchRoleData();
      }
    } catch (error) {
      console.log(error, "Error not posting data");
    }
  };

 

  const fetchUsersid = async (patientId) => {
    const response = await axios.get(
      `http://localhost:8080/hptl/employee/${patientId}`
    );
    setDataId(response.data[0]);

  };

  const handleDelete = () => {
    setData(data.filter((item) => item.p_id !== idToDelete));
    setIdToDelete("");
  };

  //=========================delete===================
  const deleteUsersid = async (deptIds) => {
    const response = await axios
      .delete(`http://localhost:8080/hptl/employee/${deptIds}`)
      .then(() => {
        fetchUsers();
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
    // setDataId(response.data);
  };

  console.log(dataId, "dataId");

  // useEffect(() => {
  //   deleteUsersid(deptId);
  // }, [deptId]);

  // useEffect(() => {
  //   fetchUsersid(deptId);
  // }, [deptId]);

  useEffect(() => {
    
    fetchUsers();
  }, []);


  useEffect(()=>{
    const result = data.filter((item)=>{
      return item.emp_name.toLowerCase().match(search.toLocaleLowerCase())
    })
    setFilter(result)
      },[search])

      function profileid(id){
        navigate('/empProfile',{state:{id:id}})
      }

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
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        fetchUsers();
      }
    });
  };

  const navigate = useNavigate();

  const imageBodyTemplate = (data) => {
    return <img src={data.image} alt={data.image} className="w-6rem shadow-2 border-round" />;
};

  const columns = [
    {
      name: 'Id',
      selector: row => row.emp_id,
    },
  

    {
      name: 'Name',
      selector: row => row.emp_name,
    },

    {
      name: "Role",
      sortable: true,
      cell: (row) => {
        // Initialize an array to store role names for the current row
        const roleNames = [];

        // Iterate through the roleAssign array to find matching roles for the current row
        roleAs.forEach((item) => {
          if (row.emp_id === item.emp_id) {
            // Push the role name to the roleNames array
            roleNames.push(item.roll_name);
          }
        });

        // Render the role names separately
        return (
          <>
            {roleNames.map((role, index) => (
              <span key={index}>
                {role}
                {/* Add comma and space if it's not the last role */}
                {index !== roleNames.length - 1 && ",  "}
              </span>
            ))}
          </>
        );
      }
    },

    //
    //   name: "Role Assign",
    //   selector: (row) => row.roll_name,
    //   cell: (row) => {
    //     return (
    //       <>
    //       <Form.Select
    //         aria-label="Default select example"
    //         id="roleName"
    //         name="roll_name"
    //         // defaultValue={roleId?.emp_id}
    //         value={role.emp_id}
    //         onChange={(e)=>handleUpdateRole(e,row.emp_id)}
    //         // onClick={()=>{getByIdata(row.emp_id,)}}
    //       >
          
    //         <option>Select</option>
    //         {role.map((roleName, index) => (
             
    //       <option  name="roll_name" value={roleName.roll_id} key={index}  >
    //             {roleName.roll_name}
    //           </option>
    //         ))}
    //       </Form.Select>
    //     </>
    //     );
    //   },
    // },

    {
    name: "Role Assign",
 cell: (row) => {
        return (
          <Dropdown className="justifyContent-around">
            <FaRegEdit
              onClick={() => {
                
              handleShow3(postroledata(row.roll_id, row.emp_id))
              
              }}
              size={20}
              style={{ color: "gray" }}
            />
 <MdDeleteForever
              onClick={() => {
                
              handleShow4(deleterole(row.roll_id, row.emp_id))
              
              }}
              size={20}
              style={{ color: "red" }}
            />

          </Dropdown>
        );
      },
    },

    
    {
      name: 'Email',
      selector: row => row.email,
    },
    
    {
      name: 'Qualification',
      selector: row => row.qualification,
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <Dropdown className="justifyContent-around">
            <FaRegEdit
              onClick={() => {
                updateShow();
                fetchUsersid(row.emp_id);
                setDeptId(row.emp_id);
              }}
              size={20}
              style={{ color: "gray" }}
            />

            <MdDeleteForever
              size={23}
              onClick={() => {
                handleDelete();
                handleConfirmation(row.emp_id);
                setDeptId(row.emp_id);
              }}
              style={{ color: "red", marginLeft: "1rem" }}
            />
            <Tooltip label='View profile' fontSize='md'>
           <FaEye size={18} style={{color:"gray",  marginLeft: "1rem",cursor:"pointer" }} onClick={()=>
            profileid(row.emp_id)
          }/>
</Tooltip>
            

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
			minHeight: '45px', // override the row height
            fontSize:"12px",
		},
	},
    columns: {
        fontSize:"12px",
		style: {
			minHeight: '62px', // override the row height
            fontSize:"12px",
		},
	},
	headCells: {
    style: {
      background: "#89bec5",
      paddingLeft: "2%",
      paddingRight: "2%",
      fontSize: "15px",
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
            fontSize:"10px"
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
      fontSize:"10px",
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
    <div className='emplist-wrap'>
    <div className="emplist">
      <header className="header">
        <div className="logo">
          <h2>Employee details</h2>
        </div>
        <div className="profile">
          <img src={hp_lg} alt="Profile" className="profile-pic" />
         
        </div>
      </header>
      
      <div className="main-content">
     
        
        <main className="content">
          
          
          <div className="stats-cards">
            <div className="cardpatient">
              <h5><span style={{fontWeight:"800",fontFamily:"italic"}}>Today Employee</span></h5>
              <div className='d-flex justify-content-between'><p className="count">3110 </p><p className='watch' style={{backgroundColor:"#63b6a2",height:"1.8rem",width:"2rem",borderRadius:"5px",color:"white"}}><MdOutlineWatchLater size={20}/></p></div>
              {/*<p className="label">Total Employee &nbsp;<span style={{color:"#63b6a2"}}>10</span>&nbsp; today</p>*/}
            </div>
            <div className="cardpatient">
              <h5>  <span style={{fontWeight:"800",fontFamily:"italic"}}>Total Managers</span></h5>
            
              <div className='d-flex justify-content-between'><p className="count">25 </p><p className='watch' style={{backgroundColor:"#f87218",height:"1.8rem",width:"2rem",borderRadius:"5px",color:"white"}}><BsCalendar2Month  size={20}/></p></div>
             {/* <p className="label">Total Managers &nbsp;<span style={{color:"#f87218"}}> 25</span>&nbsp; this month</p>*/}
            </div>
            <div className="cardpatient">
              <h5><span style={{fontWeight:"800",fontFamily:"italic"}}>Total Doctors</span></h5>
              <div className='d-flex justify-content-between' ><p className="count">1500 </p><p className='watch' style={{backgroundColor:"#23c65d",height:"1.8rem",width:"2rem",borderRadius:"5px",color:"white"}}><LuCalendarDays size={20}/></p></div>
             {/* <p className="label">Total Doctors &nbsp;<span style={{color:"#23c65d"}}>1500 </span>&nbsp; this year</p>*/}
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
              
              <Dropdown>
              <Dropdown.Toggle variant="default" id="dropdown-basic" style={{fontWeight:"600",height:"3rem"}}>
                Gender
              </Dropdown.Toggle>
        
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Male</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Female</Dropdown.Item>
                
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
            Add Employee
          </Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} style={{marginTop:"5%"}}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

          <Row>
          <Col>
          <Form.Label>ID</Form.Label>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1"
              style={{ justifyContent: "space-between" }}
            >
             
              <Form.Control
                name="emp_id"
                value={formData.emp_id}
                onChange={handleChange}
                className="w-100"
                type="text"
                placeholder="Emp ID"
                autoFocus
              />
            </Form.Group>
            </Col>
            <Col>
            <Form.Label>Name</Form.Label>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
              style={{ justifyContent: "space-between" }}
            >
             
              <Form.Control
                name="emp_name"
                value={formData.emp_name}
                onChange={handleChange}
                className="w-100"
                type="text"
                placeholder="Name"
              />
            </Form.Group>
            </Col>
            </Row>

            <Row>
            <Col>
            <Form.Label>Email</Form.Label>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
              style={{ justifyContent: "space-between" }}
            >
              
              <Form.Control
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-100"
                type="text"
                placeholder="Ex@gmail.com"
              />
            </Form.Group>
            </Col>
            <Col>
            <Form.Label>Password</Form.Label>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
              style={{ justifyContent: "space-between" }}
            >
             
              <Form.Control
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-100"
                type="text"
                placeholder="1234567"
              />
            </Form.Group>
            </Col>
            </Row>

            <Row>
            <Col>
            <Form.Label>Qualifications</Form.Label>
            <Form.Group
            className="mb-3 d-flex"
            controlId="exampleForm.ControlTextarea1"
            style={{ justifyContent: "space-between" }}
          >
            
            <Form.Control
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-100"
              type="number"
              placeholder="qualification"
            />
          </Form.Group>
          </Col>
         <Col>
         
        
            </Col>
            </Row>

           
            <hr/>
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
            <DataTable columns={columns} progressPending={pending} 
            data={filter}
              timeout
              pagination
              selectableRowsHighlight
              selectableRows
              highlightOnHover
              paginations customStyles={customStyles} theme="solarized" style={styleobj}/>
            
          
              <Modal show={show1} onHide={updateClose} style={{marginTop:"5%"}}>
          <Modal.Header closeButton>
            <Modal.Title>Update Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={updateSubmit}>
  
            <Row>
            <Col>
            <Form.Label>ID</Form.Label>
              <Form.Group
                className="mb-3 d-flex"
                controlId="exampleForm.ControlInput1"
                style={{ justifyContent: "space-between" }}
              >
               
                <Form.Control
                disabled
                name="emp_id"
                defaultValue={dataId?.emp_id}
                onChange={(e) =>
                  setDeptId({ ...formData, emp_id: e.target.value })
                }
                className="w-100"
                type="text"
                autoFocus
              />
              </Form.Group>
              </Col>
              <Col>
              <Form.Label>Name</Form.Label>
              <Form.Group
                className="mb-3 d-flex"
                controlId="exampleForm.ControlTextarea1"
                style={{ justifyContent: "space-between" }}
              >
              
                <Form.Control
                name="emp_name"
                defaultValue={dataId?.emp_name}
                onChange={(e) =>
                  setUpdateData({ ...updateData, emp_name: e.target.value })
                }
                className="w-100"
                type="text"
                placeholder="Employee name"
                />
              </Form.Group>
              </Col>
              </Row>
  
              <Row>
              <Col>
              <Form.Label>Email</Form.Label>
              <Form.Group
                className="mb-3 d-flex"
                controlId="exampleForm.ControlTextarea1"
                style={{ justifyContent: "space-between" }}
              >
               
                <Form.Control
                name="email"
                defaultValue={dataId?.email}
                onChange={(e) =>
                  setUpdateData({ ...updateData, email: e.target.value })
                }
                className="w-100"
                type="text"
                placeholder="email"
                />
              </Form.Group>
              </Col>
              <Col>
              <Form.Label>Password</Form.Label>
              <Form.Group
                className="mb-3 d-flex"
                controlId="exampleForm.ControlTextarea1"
                style={{ justifyContent: "space-between" }}
              >
              
                <Form.Control
                name="gender"
                defaultValue={dataId?.password}
                onChange={(e) =>
                  setUpdateData({ ...updateData, password: e.target.value })
                }
                className="w-100"
                type="text"
                placeholder="password"
                />
              </Form.Group>
              </Col>
              </Row>
  
              <Row>
              <Col>
              <Form.Label>Qualification</Form.Label>
              <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
              style={{ justifyContent: "space-between" }}
            >
              
              <Form.Control
              name="age"
                defaultValue={dataId?.qualification}
                onChange={(e) =>
                  setUpdateData({ ...updateData, qualification: e.target.value })
                }
                className="w-100"
                type="text"
                placeholder="qualification"
              />
            </Form.Group>
            </Col>
            <Col>
            <Form.Label>Role</Form.Label>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
              style={{ justifyContent: "space-between" }}
            >
             
              <Form.Control
              name="roles"
              defaultValue={dataId?.roles}
              onChange={(e) =>
                setUpdateData({ ...updateData, roles: e.target.value })
              }
              className="w-100"
              type="text"
              placeholder="roles"
              />
            </Form.Group>
            </Col>
              </Row>
  
              <hr/>
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
                    Update employee
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

      
        <Modal show={show3} onHide={handleClose3} style={{ marginTop: '3%' }}>

        <Modal.Header closeButton style={{ backgroundColor: '#eee' }}>
          <Modal.Title >Assign Role</Modal.Title>
        </Modal.Header>
        <Container style={{ backgroundColor: '#eee' }}>
          <Form.Group className="mb-3">
            <Form.Label style={{ borderRadius: '12px' }}>Employee ID</Form.Label>
            <Form.Control style={{ borderRadius: '12px' }} 
              value={empId}
              onChange={(e) => {
                setEmpId( e.target.value );
              }} />
               
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ borderRadius: '12px' }}>Role Name  </Form.Label>

            <select

              value={rolePost}
              onChange={(e) => {

                setRolePost(e.target.value);
              }}
              style={{ borderRadius: '12px', height: '40px', border: 'none' }}
            >
              <option value="">Select a role</option>
              {role.map((roles) => (
                <option key={roles.roll_id} value={roles.roll_id}>
                  {roles.roll_name}
                </option>
              ))}
            </select>

          </Form.Group>

        </Container>
        <Modal.Footer style={{ backgroundColor: '#eee' }}>
          <Button className='add' variant="secondary" onClick={handleClose3}>
            Close
          </Button>
          <Button className='add' variant="primary" onClick={handelrolepost}>
            Save
          </Button>
        </Modal.Footer>

      </Modal >

{/*-----------------------------------Role delete-------------------------------*/}

 <Modal show={show4} onHide={handleClose4} style={{ marginTop: '3%' }}>

        <Modal.Header closeButton style={{ backgroundColor: '#eee' }}>
          <Modal.Title >Assign Role</Modal.Title>
        </Modal.Header>
        <Container style={{ backgroundColor: '#eee' }}>
          <Form.Group className="mb-3">
            <Form.Label style={{ borderRadius: '12px' }}>Employee ID</Form.Label>
            <Form.Control style={{ borderRadius: '12px' }} 
              value={empIdDelete}
              onChange={(e) => {
                setEmpIdDelete( e.target.value );
              }} />
               
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ borderRadius: '12px' }}>Role Name  </Form.Label>

            <select

              value={roleDelete}
              onChange={(e) => {

                setRoleDelete(e.target.value);
              }}
              style={{ borderRadius: '12px', height: '40px', border: 'none' }}
            >
              <option value="">Select a role</option>
              {role.map((roles) => (
                <option key={roles.roll_id} value={roles.roll_id}>
                  {roles.roll_name}
                </option>
              ))}
            </select>

          </Form.Group>

        </Container>
        <Modal.Footer style={{ backgroundColor: '#eee' }}>
          <Button className='add' variant="secondary" onClick={handleClose4}>
            Close
          </Button>
          <Button className='add' variant="primary" onClick={handelroledelete}>
            Save
          </Button>
        </Modal.Footer>

      </Modal >

          </div>

        </main>
      </div>
    </div>
    </div>
  );
};

export default Emplist;