import React from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

function Dr_appoinment() {
  return (
    <>
    <Card>
          <Card.Body>

     <Table striped bordered hover style={{width:"48rem"}}>
     <thead style={{justifyContent:"left"}}>
       <tr>
         <th>#</th>
         <th>Date</th>
         <th>Name</th>
         <th>Status</th>
         <th>Time</th>
         <th>Action</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td>1</td>
         <td>19-03-2023</td>
         <td>Mark</td>
         <td>Pending</td>
         <td>10:00 AM</td>
         
       </tr>
       <tr>
       <td>2</td>
       <td>23-03-2023</td>
       <td>Jhon</td>
       <td>Active</td>
       <td>12:30 AM</td>
       </tr>
       <tr>
       <td>3</td>
       <td>19-04-2023</td>
       <td>Rohi</td>
       <td>Pending</td>
       <td>01:00 PM</td>
       </tr>
     </tbody>
   </Table>
   </Card.Body>
   </Card>
   </>
  )
}

export default Dr_appoinment;
