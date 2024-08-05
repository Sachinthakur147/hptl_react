const connection = require("../../../Model/db_config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 10;

const loginGet = (req, res) => {
  if (req.session.role) {
    return res.json({ valid: true, role: req.session.role });
  }
  // else{
  // return res.json({valid:false})
  // }
};

const logoutUser = (req, res) => {
  req.session.destroy();
  return res.json("success");
};

const signupUser = (req, res) => {
  const sql =
    "INSERT INTO hptl_employee(`emp_id`,`emp_name`,`email`,`password`,`qualification`) VALUES(?)";
  const values = [
    req.body.emp_id,
    req.body.emp_name,
    req.body.email,
    req.body.password,
    req.body.qualification,
  ];
  connection.query(sql, [values], (err, result) => {
    if (err) {
      return res.json({ message: "Error in node" });
    } else {
      return res.json(result);
    }
  });
};

const loginAuth = (req, res) => {
  const sql = "SELECT * FROM hptl_employee WHERE email = ? AND password = ?";

  // Execute the SQL query to check user credentials
  connection.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({ message: err.message, status: false });
    }

    if (result.length > 0) {
      const empId = result[0].emp_id;
      const name = result[0].emp_name;

      const sql1 =
        "SELECT r.roll_name FROM hptl_role_assign ra JOIN hptl_roles r ON ra.roll_id = r.roll_id WHERE ra.emp_id = ?";

      connection.query(sql1, [empId, name], (error, result2) => {
        if (error) {
          return res.json({ message: error.sqlMessage, status: false });
        } else {
          result[0].password = undefined;

          const responseData = {
            message: "Login successfull",
            status: true,
            data: {
              ...result[0],
              roles: result2[0].roll_name, // Extract role_names into an array
            },
          };

          return res.json(responseData);
        }
      });
    } else {
      // No user found with the provided credentials
      return res.json({ message: "Login failed", status: false });
    }
  });
};

//-----------------------------Jwt------------------------

const employee_datapost = (req, res) => {
  const sql = `INSERT INTO hptl_employee SET ?`;

  // console.log(req.files)
  const data = {
    emp_id: req.body.emp_id,
    emp_name: req.body.emp_name,
    email: req.body.email,
    password: req.body.password,
    qualification: req.body.qualification,
  };
  // console.log(data, "123");
  connection.query(sql, data, (err, result) => {
    if (err) {
      console.log("Employee data Not Post...", err);
      res.json(err);
    } else {
      console.log("Employee data Post SuccessFully....");
      res.json(result);
    }
  });
};

const employee_login = (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json("Email and password are required");
  }

  const sql = `SELECT * FROM hptl_employee WHERE email=?`;
  connection.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json("Database error");
    }

    if (result && result.length > 0) {
      const hashedPassword = result[0].password;
      

      if (hashedPassword === password) {
        
        const token = jwt.sign({ email: result[0].email }, "jwt-secret-key", {
          expiresIn: "1d",
        });

        // Set token as a cookie in the response
        res.cookie("token", token);
        result[0].password = undefined;
        // Return user data and token in response
        return res.status(200).json({ user: result[0], token: token });
      } else {
        // Passwords do not match
        return res.status(401).json("Password does not match");
      }
    } else {
      // User not found in the database
      return res.status(404).json("User not found");
    }
  });
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
};

const getUserdata = (req, res) => {
  return res.json({Status:"success", email: req.email,name:req.emp_name });
};

module.exports = {
  loginGet,
  logoutUser,
  signupUser,
  loginAuth,
  employee_datapost,
  employee_login,
  logout,
  getUserdata,
};
