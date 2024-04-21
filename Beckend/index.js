const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path')
let dotenv = require('dotenv')
dotenv.config()

app.use(express.json());

const PORT = 8080;

app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))

const empRouter = require("./Router/test/hptl_test");
app.use('/',empRouter);

const {department} = require('./Router/department/hptl_department');
app.use('/', department);

const {graph} = require('./Router/graph/hptl_graph');
app.use('/', graph);

const {profile1} = require('./Router/profile/emp_profile');
app.use('/',profile1)

const {employee} = require('./Router/employee/hptl_employee');
app.use('/',employee)

const {test} =require('./Router/lab_test/hptl_lab_test');
app.use('/',test)

// app.use('/public',express.static(path.join(__dirname,'public')))

const {labs} = require('./Router/labs/hptl_labs');
app.use('/',labs)

const {patient} = require('./Router/patient/hptl_patient');
app.use('/',patient)

const {prescription} = require('./Router/prescription/hptl_prescription');
app.use('/',prescription)

const {role} = require('./Router/roles/hptl_roles');
app.use('/',role)

const {room} = require('./Router/rooms/hptl_rooms')
app.use('/',room)

const {report}= require('./Router/test_RP/hptl_test_report');
app.use('/',report)

const{treatment} = require('./Router/treatment/hptl_treatment');
app.use('/',treatment)

const{role_assign} = require('./Router/role_assign/hptl_role_assign');
app.use('/',role_assign)


app.listen(PORT, () =>{
     console.log(`Server is running on ${PORT}...`);
 })