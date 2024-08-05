import logo from "./logo.svg";
import "./App.css";
// import Dashboard from "./dashboard/Dashboardlist";
import "bootstrap/dist/css/bootstrap.min.css";
import Adminlayout from "./Admin_pannel/AdminLayout/Adminlayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Invoicelist from "./Admin_pannel/invoice/Invoicelist";
import Cardcomp from "./Admin_pannel/dashboard/component/cards/Cardcomp";
import Patientlist from "./Admin_pannel/patient/Patientlist";
// import Loginpage from "./Admin_pannel/login/Loginpage";
import Departmentlist from "./Admin_pannel/department/Deparmentlist";
import Roomlist from "./Admin_pannel/room/Room";

import Lablist from "./Admin_pannel/labs/Lablist";
import Role_list from "./Admin_pannel/role/Role_list";
import Emplist from "./Admin_pannel/employee/Emplist";
import "@coreui/coreui/dist/css/coreui.min.css";
import Emp_profile from "./Admin_pannel/emp_profile/Emp_profile";
import Personal_info from "./Admin_pannel/emp_profile/component/Personal_info";
import Dr_patient from "./Admin_pannel/emp_profile/component/Dr_patient";
import Dr_appoinment from "./Admin_pannel/emp_profile/component/Dr_appoinment";
import Ch_pass from "./Admin_pannel/emp_profile/component/Ch_pass";
// import Dashboard_login from "./dashboard/Dashboard";
import Loginpage from "./Admin_pannel/login/Loginpage";
import Signup from "./signup/Signup";
import Dashboard from "./Admin_pannel/dashboard/Dashboardlist";
import Dashboard_list from "./emp_pannel/emplo/dashboard/Dashboard_list";
import Appointment from "./Admin_pannel/appointment/Appointment";
// import Dashboard_list from "./emp_pannel/emplo/dashboard/Dashboard_list";

export const userContext = createContext();
function App() {
  // const [data,setData] =useState('');
  return (
    <>
      <div
        className="App"
        component="main"
        style={{ display: "flex", marginTop: "7%", width: "100%" }}
      >
      
        <Routes>
        
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={<Adminlayout/>}>
            <Route path="/" element={<Cardcomp />} />

            <Route path="/patient" element={<Patientlist />} />

            <Route path="/invoice" element={<Invoicelist />} />
            <Route path="/department" element={<Departmentlist />} />
            <Route path="/rooms" element={<Roomlist />} />
            <Route path="/role" element={<Role_list />} />
            <Route path="/lab" element={<Lablist />} />
            <Route path="/employee" element={<Emplist />} />
            <Route path="/appointment" element={<Appointment/>}/>

            <Route path="/empProfile" element={<Emp_profile />}>
              <Route path="/empProfile" element={<Personal_info />} />
              <Route path="/empProfile/patientinfo" element={<Dr_patient />} />
              <Route
                path="/empProfile/appoinment"
                element={<Dr_appoinment />}
              />
              <Route path="/empProfile/password" element={<Ch_pass />} />
            </Route>
         </Route>

          <Route path="/empDashboard" element={<Dashboard_list />} />
        </Routes>
      </div>

      {/* <Routes>
      <Route path="/" element={<Dashboard_list/>} />
</Routes>*/}
    </>
  );
}

export default App;
