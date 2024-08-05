const jwt = require("jsonwebtoken");
const userModel = require("../../../Model/userModel");

exports.signup = async (req, res) => {
  const { emp_id,emp_name, email, password, qualification } = req.body;

  try {
    await userModel.createUser(emp_id,emp_name, email, password, qualification);
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.emp_id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
