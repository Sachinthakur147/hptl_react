

const connection = require("./db_config");
const bcrypt = require("bcrypt");

const userModel = {
  createUser: async (emp_id,emp_name, email, password, qualification) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      "INSERT INTO hptl_employee (emp_id,emp_name, email, password, qualification) VALUES (?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      connection.query(sql, [emp_id,emp_name, email, hashedPassword, qualification], (err, result) => {
        if (err) {
          console.log(err.sqlMessage)
          return reject(err.sqlMessage)
          
        };
        resolve(result);
      });
    });
  },
  findUserByEmail: (email) => {
    const sql = "SELECT * FROM hptl_employee WHERE email = ?";
    return new Promise((resolve, reject) => {
      connection.query(sql, [email], (err, result) => {
        if (err) return reject(err.sqlMessage);
        resolve(result[0]); // return first row if found
      });
    });
  },
};

module.exports = userModel;
