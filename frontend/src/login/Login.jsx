import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Login = () => {
  const [inputValue, setInputValue] = useState("");
  
  const [value, setValues] = useState({
    email: "",
    password: "",
  });

  const showSwal = () => {
    withReactContent(Swal).fire({
      title: <i>Please enter valid email and password</i>,

      preConfirm: () => {
        setInputValue(Swal.getInput()?.value || "");
      },
    });
  };

  const navigate = useNavigate();
  
  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };
   
  

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", value)
      .then((res) => {
        if (res.data.status) {
          console.log(res,"login")
          // navigate("/");
         if(res.data.data.roles === "Admin"){
          navigate('/');
         } else if(res.data.data.roles != "Admin"){
          navigate('/empDashboard');
         }
         
        } else {
          showSwal();
        }
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ overflowY: "hidden", overflowX: "hidden" }}>
      <div className="" style={{ display: "flex", justifyContent: "center" }}>
        <span
          style={{ fontSize: "4rem", fontFamily: "serif", fontWeight: "bold" }}
        >
          SignIn
        </span>
      </div>

      <section className="vh-100" style={{ height: "50vh" }}>
        <div
          className="container p-5 h-70"
          style={{ border: "1px solid gray", borderRadius: "10px" }}
        >
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Enter email</label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    name="email"
                    type="email"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    onChange={handleInput}
                    style={{ background: "#b1e2f2" }}
                  />
                </div>

                <div>
                  <label className="form-label" for="form1Example23">
                    Password
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    name="password"
                    type="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    onChange={handleInput}
                    style={{ background: "#b1e2f2" }}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  
                  <a href="#!">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Sign in
                </button>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>

                <a
                  className="btn btn-primary btn-lg btn-block"
                  style={{ backgroundColor: "#3b5998" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-facebook-f me-2"></i>Continue with
                  Facebook
                </a>
                <a
                  className="btn btn-primary btn-lg btn-block"
                  style={{ backgroundColor: "#55acee" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-twitter me-2"></i>Continue with Twitter
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
