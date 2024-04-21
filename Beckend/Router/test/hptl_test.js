const express = require("express");
const empRouter = express.Router();
const { getEmployee,postEmployee,deleteEmployee} = require("../../Controller/auth/test/test");
empRouter.get("/apiemp",getEmployee);
empRouter.post("/apiemp",postEmployee);
empRouter.delete("/apiemp",deleteEmployee);
// empRouter.post("/loginemp",postLoginEmployee);
module.exports = empRouter;