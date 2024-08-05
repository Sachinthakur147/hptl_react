import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { Row, Col, Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import hp_lg from "../Assets/images/hp_lg.png";
import Card from "react-bootstrap/Card";
import moment from "moment";

const Role_list = () => {
  const [pending, setPending] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");

  const [formData, setFormData] = useState({
    roll_id: "",
    roll_name: "",
    est_date: "",
  });

  const [dataId, setDataId] = useState({});
  const [roleId, setRoleId] = useState();
  const [updateRole, setUpdateRole] = useState({
    roll_name: "",
    est_date: "",
  });
  console.log(roleId, "roleId");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateClose = () => {
    setShow1(false);
    setDataId("");
  };
  const updateShow = () => setShow1(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/hptl/role", {
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
      .put(`http://localhost:8080/hptl/role/${roleId}`, updateRole)
      .then((result) => {
        console.log(result);

        if (result.data.Status) {
          fetchUsers();
          console.log(result);
          updateClose();
        } else {
          setDataId("");
          fetchUsers();
          updateClose();
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchUsers = async (start = 0, end = 10) => {
    const response = await axios.get("http://localhost:8080/hptl/role");
    setData(response.data.slice(start, end));
    setLoading(false);
  };

  const fetchUsersid = async (roleIds) => {
    const response = await axios.get(
      `http://localhost:8080/hptl/role/${roleIds}`
    );
    setDataId(response.data);
    setLoading(false);
  };

  const handleDelete = () => {
    setData(data.filter((item) => item.roll_id !== idToDelete));
    setIdToDelete("");
  };

  const deleterole = () => {
    axios
      .delete(`http://localhost:8080/hptl/role/${idToDelete}`)
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

  useEffect(() => {
    const result = data.filter((item) => {
      return item.roll_name.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilter(result);
  }, [search]);

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
        deleterole(id);
        // handleDelete();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        fetchUsers();
      }
    });
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.roll_id,
    },
    {
      name: "Name",
      selector: (row) => row.roll_name,
    },
    {
      name: "Est Date",
      selector: (row) => row.est_date,
      format: (row) => moment(row.est_date).format("YYYY-MM-DD"),
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <Dropdown className="justifyContent-around">
            <FaRegEdit
              onClick={() => {
                updateShow();
                setRoleId(row.roll_id);
                fetchUsersid(row.roll_id);
              }}
              size={20}
              style={{ color: "gray" }}
            />

            <MdDeleteForever
              size={23}
              onClick={() => handleConfirmation(row.roll_id)}
              style={{ color: "red", marginLeft: "1rem" }}
            />
          </Dropdown>
        );
      },
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "45px", // override the row height
        fontSize: "17px",
        borderRadius: "10px",
      },
    },

    headCells: {
      style: {
        background: "#89bec5",
        paddingLeft: "2%",
        paddingRight: "2%",
        fontSize: "17px",
        fontWeight: "700",
        fontFamily: "Arial, sans-serif",
      },
    },
    cells: {
      style: {
        paddingLeft: "2%",
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
    <div className=" " style={{ width: "80vw" }}>
      <header className="header">
        <div className="logo">
          <h2>Role list</h2>
        </div>
        <div className="profile">
          <img src={hp_lg} alt="Profile" className="profile-pic" />
        </div>
      </header>
      <Row style={{ marginBottom: "1%", marginTop: "2%" }}>
        <Col className="d-flex content-center" style={{ fontWeight: "700" }}>
          <input
            type="text"
            className="w-25 form-control"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col style={{ display: "flex", justifyContent: "end" }}>
          <Button className="mb-2 " variant="primary" onClick={handleShow}>
            Add
          </Button>
        </Col>
      </Row>
      <div className="d-flex justify-content-end"></div>

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
      <Modal show={show1} onHide={updateClose} style={{ marginTop: "5%" }}>
        <Modal.Header closeButton>
          <Modal.Title>Update Role</Modal.Title>
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
                name="roll_id"
                defaultValue={dataId?.roll_id}
                onChange={(e) =>
                  setRoleId({ ...formData, roll_id: e.target.value })
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
                name="roll_name"
                defaultValue={dataId?.roll_name}
                onChange={(e) =>
                  setUpdateRole({ ...updateRole, roll_name: e.target.value })
                }
                className="w-75"
                type="text"
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
  );
};

export default Role_list;
