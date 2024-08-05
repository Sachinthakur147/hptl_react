import axios from 'axios'
import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';
// import Admin from '../admin/Admin';
// import Employee from '../employee/Employee';
import Dashboard from '../Admin_pannel/dashboard/Dashboardlist';
import Dashboard_list from '../emp_pannel/emplo/dashboard/Dashboard_list';

const Dashboard_login = () => {
  const [role,setRole] = useState('');
  const navigate = useNavigate();

  
  useEffect(()=>{
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:8080/hptl/login/user')
    .then((res)=>{
      console.log(res)
      if(res.data.valid){
        setRole(res.data.role);
      }else{
        navigate('/login')
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  return (
    <div>
     <h3>Role base Authorization</h3>
     {role === "Admin" && <Dashboard/>}
     {role != "Admin" && <Dashboard_list/>}
    </div>
  )
}

export default Dashboard_login
