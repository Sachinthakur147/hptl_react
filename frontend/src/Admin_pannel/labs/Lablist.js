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
import hp_lg from '../Assets/images/hp_lg.png';
import './lab.scss';
import Card from 'react-bootstrap/Card';

import axios from "axios";

const Lablist = () => {
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
    lab_id: "",
    lab_name: "",
    room_id: "",
  });

  const [dataId, setDataId] = useState({});
  const [deptId, setDeptId] = useState();
  const [updateData, setUpdateData] = useState({
    lab_name: "",
    room_id: "",
  });
  console.log(deptId, "deptId");

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

    fetch("http://localhost:8080/hptl/lab", {
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
      .put(`http://localhost:8080/hptl/lab/${deptId}`, updateData)
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

  const fetchUsers = async (start = 0, end = 10) => {
    const response = await axios.get("http://localhost:8080/hptl/lab");

    setData(response.data.slice(start, end));
    setLoading(false);
  };

  const fetchUsersid = async (labIds) => {
    const response = await axios.get(
      `http://localhost:8080/hptl/labget/${labIds}`
    );
    setDataId(response.data);

  };

  const handleDelete = () => {
    setData(data.filter((item) => item.lab_id !== idToDelete));
    setIdToDelete("");
  };

  //=========================delete===================
  const deleteUsersid = async (deptIds) => {
    const response = await axios
      .delete(`http://localhost:8080/hptl/lab/${deptIds}`)
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

  // useEffect(() => {
  //   fetchUsersid(deptId);
  // }, [deptId]);

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const columns = [
    {
      name: "Id",
      selector: (row) => row.lab_id,
    },
    {
      name: "Name",
      selector: (row) => row.lab_name,
    },
    {
      name: "Room id",
      selector: (row) => row.room_id,
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <Dropdown className="justifyContent-around">
            <FaRegEdit
              onClick={() => {
                updateShow();
                setDeptId(row.lab_id);
                fetchUsersid(row.lab_id)
              }}
              size={20}
              style={{ color: "gray" }}
            />

            <MdDeleteForever
              size={23}
              onClick={() => {
                handleDelete();
                handleConfirmation(row.lab_id);
                setDeptId(row.lab_id);
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

  

  return (
    <>
    <div className=" " style={{width:"80vw"}}>
      <header className="header">
      <div className="logo">
        <h2>Lab list</h2>
      </div>
      <div className="profile">
        <img src={hp_lg} alt="Profile" className="profile-pic" />
       
      </div>
    </header>
      <Row style={{marginBottom:"1%",marginTop:"2%"}}>
      <Col className="d-flex content-center" style={{fontWeight:"700"}}>
      <Form.Control type="email" placeholder="Search" style={{width:"10rem"}}/>
      </Col>
      <Col style={{display:"flex",justifyContent:"end"}}>
      <Button className="mb-2 "  onClick={handleShow}>
      Add Lab
    </Button>
    </Col>
    </Row>
        <div className="d-flex justify-content-end">
     
         
        </div>
        <Modal show={show} onHide={handleClose} style={{marginTop:"5%"}}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Lab</Modal.Title>
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
                  name="lab_id"
                  value={formData.lab_id}
                  onChange={handleChange}
                  className="w-75"
                  type="text"
                  placeholder="lab ID"
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
                  name="lab_name"
                  value={formData.lab_name}
                  onChange={handleChange}
                  className="w-75"
                  type="text"
                  placeholder="lab name"
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
              data={data}
              timeout
              pagination
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
            <Modal.Title>Update lab</Modal.Title>
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
                  name="lab_id"
                  defaultValue={dataId?.lab_id}
                  onChange={(e) =>
                    setDeptId({ ...formData, lab_id: e.target.value })
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
                  name="lab_name"
                  defaultValue={dataId?.lab_name}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, lab_name: e.target.value })
                  }
                  className="w-75"
                  type="text"
                  placeholder="lab name"
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

export default Lablist;
