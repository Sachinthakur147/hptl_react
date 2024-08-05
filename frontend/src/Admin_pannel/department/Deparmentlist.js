import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Dropdown,FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { InputText } from "primereact/inputtext";
import hp_lg from '../Assets/images/hp_lg.png';
import Swal from "sweetalert2";
import './dept.scss';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';

import axios from "axios";

const Departmentlist = () => {
  const rowDisabledCriteria = (row) => row.isOutOfStock;
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [filters, setFilters] = useState({});
  const [formData, setFormData] = useState({
    dept_id: "",
    dept_name: "",
    est_date: "",
  });

  const [dataId, setDataId] = useState({});
  const [deptId, setDeptId] = useState();
  const [updateData, setUpdateData] = useState({
    dept_name: "",
    est_date: "",
  });
  console.log(deptId, "deptId");


  
  /////////   For Search    ///////////////

  // const [view, setView] = useState([]);
const [filter,setFilter] = useState([])
  const [search, setSearch] = useState('')



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

    fetch("http://localhost:8080/hptl/department", {
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
      .put(`http://localhost:8080/hptl/department/${deptId}`, updateData)
      .then((result) => {
        console.log(result);

        if (result.data.Status) {
          fetchUsers();
          console.log(result);
          updateClose();
        } else {
          // alert(result.data.Error);
          setDataId("");
          fetchUsers();
          console.log(result);
          updateClose();
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchUsers = async (start = 0, end = 10) => {
    const response = await axios.get("http://localhost:8080/hptl/department");

    setData(response.data.slice(start, end));
    setLoading(false);
    setFilter(response.data)
  };

  const fetchUsersid = async (deptIds) => {
    const response = await axios.get(
      `http://localhost:8080/hptl/department/${deptIds}`
    );
    setDataId(response.data);

    setLoading(false);
  };

  const handleDelete = () => {
    setData(data.filter((item) => item.dept_id !== idToDelete));
    setIdToDelete("");
  };

  //=========================delete===================
  const deleteUsersid = async (deptIds) => {
    const response = await axios
      .delete(`http://localhost:8080/hptl/department/${deptIds}`)
      .then(() => {
        fetchUsers();
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
    // setDataId(response.data);
  };

  // console.log(deptId, "deptIdhghhh");

  // useEffect(() => {
  //   deleteUsersid(deptId);
  // }, [deptId]);

  useEffect(() => {
    fetchUsersid(deptId);
  }, [deptId]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(()=>{
const result = data.filter((item)=>{
  return item.dept_name.toLowerCase().match(search.toLocaleLowerCase())
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
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        fetchUsers();
      }
    });
  };

  let Sno =0;
  let serial = ++Sno;

  const columns = [
    // {
    //   name: "Id",
    //   selector: (row) => row.dept_id,
    // },
    {
name:"#",
selector:()=>+Sno,
    },
    {
      name: "Name",
      selector: (row) => row.dept_name,
    },
    {
      name: "Est Date",
      
      selector: (row) => row.est_date,
      format: (row) => moment(row.est_date).format('YYYY-MM-DD')
    },
    // {
    //   name:"Est Date",
    //   render:(row)=> DataTable.render.datetime('M/D/YYYY')
    // },
    {
      name: "Action",
      cell: (row) => {
        return (
          <Dropdown className="justifyContent-around">
            <FaRegEdit
              onClick={() => {
                updateShow();
                setDeptId(row.dept_id);
              }}
              size={20}
              style={{ color: "gray" }}
            />

            <MdDeleteForever
              size={23}
              onClick={() => {
                handleDelete();
                handleConfirmation(row.dept_id);
                setDeptId(row.dept_id);
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

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
  };

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={value || ""}
          onChange={(e) => onGlobalFilterChange(e)}
          placeholder="Global Search"
        />
      </span>
    );
  };

 

  return (
    <>
      <div className=" " style={{width:"80vw"}}>
      <header className="header">
    <div className="logo">
      <h2>Department list</h2>
    </div>
    <div className="profile">
      <img src={hp_lg} alt="Profile" className="profile-pic" />
     
    </div>
  </header>
        <Row style={{marginBottom:"1%",marginTop:"2%"}}>
          <Col className="d-flex content-center" style={{ fontWeight: "700" }}>
          
         
          <input type='text' className="w-25 form-control"
                placeholder="Search..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />
        
        
          </Col>
          <Col style={{ display: "flex", justifyContent: "end" }}>
            <Button className="mb-2 " variant="primary" onClick={handleShow} style={{backgroundColor:"gray"}}>
              Add
            </Button>
          </Col>
        </Row>
        <div className="d-flex justify-content-end"></div>
        <Modal show={show} onHide={handleClose} style={{marginTop:"5%"}}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Department</Modal.Title>
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
                  name="dept_id"
                  value={formData.dept_id}
                  onChange={handleChange}
                  className="w-75"
                  type="text"
                  placeholder="department ID"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3 d-flex"
                controlId="exampleForm.ControlTextarea1"
                style={{ justifyContent: "space-between" }}
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="dept_name"
                  value={formData.dept_name}
                  onChange={handleChange}
                  className="w-75"
                  type="text"
                  placeholder="department name"
                />
              </Form.Group>
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

        <div className="card" >
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
        <Modal show={show1} onHide={updateClose} style={{marginTop:"5%"}}>
          <Modal.Header closeButton>
            <Modal.Title>Update Department</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={updateSubmit}>
              <Form.Group
                className="mb-3 d-flex"
                controlId="exampleForm.ControlInput1"
                style={{ justifyContent: "space-between" }}
              >
                <Form.Label>ID</Form.Label>
                <Form.Control
                  disabled
                  name="dept_id"
                  defaultValue={dataId?.dept_id}
                  onChange={(e) =>
                    setDeptId({ ...formData, dept_id: e.target.value })
                  }
                  className="w-75"
                  type="text"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3 d-flex"
                controlId="exampleForm.ControlTextarea1"
                style={{ justifyContent: "space-between" }}
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="dept_name"
                  defaultValue={dataId?.dept_name}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, dept_name: e.target.value })
                  }
                  className="w-75"
                  type="text"
                  placeholder="department name"
                />
              </Form.Group>
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
                  <Button variant="primary" type="submit" onClick={fetchUsers}>
                    Update
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
      </div>
    </>
  );
};

export default Departmentlist;
