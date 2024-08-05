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
import hp_lg from "../Assets/images/hp_lg.png";
import "./appointment.scss";
import Card from "react-bootstrap/Card";

import axios from "axios";
import moment from "moment";

const Appointment = () => {
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
    id: "",
    p_name: "",
    p_mobile: "",
    gender: "",
    age: "",
    symptoms: "",
    doctor: "",
    date: "",
  });

  //  const [dataId, setDataId] = useState({});
  const [appointmentId, setAppointmentId] = useState();
  const [updateData, setUpdateData] = useState({
    p_name: "",
    p_mobile: "",
    gender: "",
    age: "",
    symptoms: "",
    doctor: "",
    date: "",
  });
  // console.log(appointmentId, "appointmentId");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateClose = () => {
    setShow1(false);
    setAppointmentId(null);
    setUpdateData({
      p_name: "",
      p_mobile: "",
      gender: "",
      age: "",
      symptoms: "",
      doctor: "",
      date: "",
    });
  };
  const updateShow = () => setShow1(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/hptl/appointment", {
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
      .put(
        `http://localhost:8080/hptl/appointment/${appointmentId}`,
        updateData
      )
      .then((result) => {
        console.log(result, "43211123333");
        fetchUsers();
        updateClose();
      })
      .catch((err) => console.log(err));
  };

  const fetchUsers = async (start = 0, end = 10) => {
    const response = await axios.get("http://localhost:8080/hptl/appointment");

    setData(response.data.slice(start, end));
    setLoading(false);
  };

  //===================get doctor dtl=====================

  const fetchUsersid = async (appointmentId) => {
    const response = await axios.get(
      `http://localhost:8080/hptl/appointment/${appointmentId}`
    );
    setUpdateData(response.data);
  };

  const handleDelete = () => {
    setData(data.filter((item) => item.id !== idToDelete));
    setIdToDelete("");
  };

  //=========================delete===================
  const deleteUsersid = async (appointmentIds) => {
    const response = await axios
      .delete(`http://localhost:8080/hptl/appointment/${appointmentIds}`)
      .then(() => {
        fetchUsers();
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //===================assign-doctor=============

  const [doctorAppointment, setDoctorAppointment] = useState([]);

  const doctorAssign = async () => {
    const res = await axios.get("http://localhost:8080/hptl/doc_assign");
    console.log(res, "res");
    setDoctorAppointment(res.data);
  };

  useEffect(() => {
    doctorAssign();
  }, []);

  const [docName, setDocName] = useState([]);

  const doctorget = async () => {
    const resrole = await axios.get("http://localhost:8080/hptl/doctor/dtl");
    // console.log(resrole,"resname")
    setDocName(resrole.data);
  };

  useEffect(() => {
    doctorget();
  }, []);

  const [roleId, setRoleId] = useState({});

  const handleUpdateRole = async (e, row) => {
    // e.preventDefault();

    try {
      if (e.target.value) {
        const roleChangeData = {
          id: row,
          emp_id: e.target.value,
        };

        const response = await axios.post(
          "http://localhost:8080/hptl/doc_assign",
          roleChangeData
        );
        doctorAssign();
        console.log(response.data);
      }
    } catch (error) {
      console.log(error, "Error not posting data");
    }
  };

  //=====================Search ===================

  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const result = data.filter((item) => {
      return item.p_name.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilter(result);
  }, [search]);

  //=========================================
  const handleConfirmation = (id) => {
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
      selector: (row) => row.id,
    },
    {
      name: "Patient Name",
      selector: (row) => row.p_name,
    },
    {
      name: "Mobile",
      selector: (row) => row.p_mobile,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Age",
      selector: (row) => row.age,
    },
    {
      name: "Symptoms",
      selector: (row) => row.symptoms,
    },

    {
      name: "Doctor",
      sortable: true,
      cell: (row) => {
        const roleNames = [];

        doctorAppointment.forEach((item) => {
          console.log(item, "item1234");
          if (row.id === item.id) {
            roleNames.push(item.emp_name);
          }
        });

        return (
          <>
            {roleNames.map(
              (docName, index) => (
                console.log(docName, "role12"),
                (
                  <span key={index}>
                    {docName}

                    {index !== roleNames.length - 1 && ",  "}
                  </span>
                )
              )
            )}
          </>
        );
      },
    },

    {
      name: "Assign Doctor",
      selector: (row) => row.emp_name,
      cell: (row) => {
        return (
          <>
            <Form.Select
              aria-label="Default select example"
              id="roleName"
              name="emp_name"
              // defaultValue={roleId?.emp_id}
              value={docName.id}
              onChange={(e) => handleUpdateRole(e, row.id)}
              // onClick={()=>{getByIdata(row.emp_id,)}}
            >
              <option>Select</option>
              {docName.map((roleName, index) => (
                <option name="emp_name" value={roleName.emp_id} key={index}>
                  {roleName.emp_name}
                </option>
              ))}
            </Form.Select>
          </>
        );
      },
    },

    {
      name: "Date",
      type: "date",
      selector: (row) => row.date,
      format: (row) => moment(row.date).format("YYYY-MM-DD"),
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <Dropdown className="justifyContent-around">
            <FaRegEdit
              onClick={() => {
                updateShow();
                setAppointmentId(row.id);
                fetchUsersid(row.id);
              }}
              size={20}
              style={{ color: "gray" }}
            />

            <MdDeleteForever
              size={23}
              onClick={() => {
                handleDelete();
                handleConfirmation(row.id);
                setAppointmentId(row.id);
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
        minHeight: "40px", // override the row height
        fontSize: "13px",
      },
    },

    headCells: {
      style: {
        background: "#89bec5",
        paddingLeft: "2%",
        paddingRight: "1%",
        fontSize: "13px",
        fontWeight: "700",
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
        fontSize: "13px",
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
        fontSize: "13px",
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
      <div className=" appointment-wrap" style={{ width: "80vw" }}>
        <header className="header">
          <div className="logo">
            <h2>Appointment list</h2>
          </div>
          <div className="profile">
            <img src={hp_lg} alt="Profile" className="profile-pic" />
          </div>
        </header>
        <Row style={{ marginBottom: "1%", marginTop: "2%" }}>
          <Col className="d-flex content-center" style={{ fontWeight: "700" }}>
            <div className="search-bar">
              <input
                type="text"
                className="w-100 form-control"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </Col>
          <Col style={{ display: "flex", justifyContent: "end" }}>
            <Button className="mb-2 bookAppointment" onClick={handleShow}>
              Book Appointment
            </Button>
          </Col>
        </Row>
        <div className="d-flex justify-content-end"></div>
        <Modal show={show} onHide={handleClose} style={{ marginTop: "5%" }}>
          <Modal.Header closeButton>
            <Modal.Title>New Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="d-flex">
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
                      placeholder="Patient name"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="d-flex">
                <Col>
                  <Form.Label>Mobile</Form.Label>
                  <Form.Group
                    className="mb-3 d-flex"
                    controlId="exampleForm.ControlInput1"
                    style={{ justifyContent: "space-between" }}
                  >
                    <Form.Control
                      name="p_mobile"
                      value={formData.p_mobile}
                      onChange={handleChange}
                      className="w-75"
                      type="text"
                      placeholder="Mobile"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Gender</Form.Label>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput3"
                  >
                    <Form.Select
                      name="gender"
                      value={formData?.gender}
                      onChange={handleChange}
                    >
                      <option>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="d-flex">
                <Col>
                  <Form.Label>Age</Form.Label>
                  <Form.Group
                    className="mb-3 d-flex"
                    controlId="exampleForm.ControlInput1"
                    style={{ justifyContent: "space-between" }}
                  >
                    <Form.Control
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-75"
                      type="text"
                      placeholder="Age"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Symptoms</Form.Label>
                  <Form.Group
                    className="mb-3 d-flex"
                    controlId="exampleForm.ControlTextarea1"
                    style={{ justifyContent: "space-between" }}
                  >
                    <Form.Control
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      className="w-75"
                      type="text"
                      placeholder="symptoms"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="d-flex">
                {/* <Col>
               <Form.Label>Doctor</Form.Label>
               <Form.Group
               className="mb-3 d-flex"
               controlId="exampleForm.ControlInput1"
               style={{ justifyContent: "space-between" }}
             >
               
               <Form.Control
                 name="doctor"
                 value={formData.doctor}
                 onChange={handleChange}
                 className="w-75"
                 type="text"
                 placeholder="Doctor"
                 autoFocus
               />
             </Form.Group>
     </Col>*/}

                <Col>
                  <Form.Label>Doctor</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    id="roleName"
                    name="emp_name"
                    // defaultValue={roleId?.emp_id}
                    value={docName.id}
                    onChange={(id, e) => handleUpdateRole(e, id)}
                    // onClick={()=>{getByIdata(row.emp_id,)}}
                  >
                    <option>Select</option>
                    {docName.map((roleName, index) => (
                      <option
                        name="emp_name"
                        value={roleName.emp_id}
                        key={index}
                      >
                        {roleName.emp_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col>
                  <Form.Label>Date</Form.Label>
                  <Form.Group
                    className="mb-3 d-flex"
                    controlId="exampleForm.ControlTextarea1"
                    style={{ justifyContent: "space-between" }}
                  >
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

              <hr />
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
                  <Button variant="primary" type="submit" onClick={fetchUsers}>
                    Book Apoointment
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>

        <div className="card">
          <div>
            <Card>
              <Card.Body>
                <DataTable
                  tableStyle={{ minWidth: "50rem" }}
                  columns={columns}
                  data={filter}
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
        <Modal show={show1} onHide={updateClose} style={{ marginTop: "5%" }}>
          <Modal.Header closeButton>
            <Modal.Title>Update Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={updateSubmit}>
              <Row className="d-flex">
                <Col>
                  <Form.Label>Patient Name</Form.Label>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="p_name"
                      placeholder="Enter Patient Name"
                      value={updateData.p_name}
                      onChange={handleUpdateChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="d-flex">
                <Col>
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                  >
                    <Form.Control
                      type="text"
                      name="p_mobile"
                      placeholder="Enter Mobile Number"
                      value={updateData.p_mobile}
                      onChange={handleUpdateChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Gender</Form.Label>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput3"
                  >
                    <Form.Select
                      name="gender"
                      value={updateData.gender}
                      onChange={handleUpdateChange}
                    >
                      <option>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="d-flex">
                <Col>
                  <Form.Label>Age</Form.Label>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Control
                      type="number"
                      name="age"
                      placeholder="Enter Age"
                      value={updateData.age}
                      onChange={handleUpdateChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Symptoms</Form.Label>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput5"
                  >
                    <Form.Control
                      type="text"
                      name="symptoms"
                      placeholder="Enter Symptoms"
                      value={updateData.symptoms}
                      onChange={handleUpdateChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="d-flex">
                <Col>
                  <Form.Label>Doctor</Form.Label>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput6"
                  >
                    <Form.Control
                      type="text"
                      name="doctor"
                      placeholder="Assign Doctor"
                      value={updateData.doctor}
                      onChange={handleUpdateChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput7"
                  >
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={updateData.date}
                      onChange={handleUpdateChange}
                    />
                  </Form.Group>
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

export default Appointment;
