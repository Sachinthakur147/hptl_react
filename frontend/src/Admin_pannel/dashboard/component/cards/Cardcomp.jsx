import React,{useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import { Container } from '@mui/material';
import { FaBed } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import DataTable, { createTheme } from "react-data-table-component";
import { MdGroups2 } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import ReactApexChart from 'react-apexcharts';
import {Row,Col,Dropdown} from 'react-bootstrap';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
// import Chart from 'react-google-charts';
import { PiNewspaperClippingDuotone } from "react-icons/pi";
import { TbCurrencyDollar } from "react-icons/tb";
import axios from "axios";
import { BsPersonCircle } from "react-icons/bs";
import moment from 'moment';

export default function Cardcomp() {
 
  const [earningMonth,setEarningMonth] = useState([]);
  const [earningValues,setEarningValues] = useState([]);

  useEffect(()=>{
const earMonths = [];
const earValues = [];

const totalEarning =async ()=>{
const dataReq = await fetch('http://localhost:8080/hptl/grapg')

const datares = await dataReq.json();


// console.log(datares)

for(let i =0;i<datares.length;i++){
  earMonths.push(datares[i].month);
  earValues.push(datares[i].Inr);
}
setEarningMonth(earMonths);
setEarningValues(earValues)

}

totalEarning();
  },[])

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  

  const fetchUsers = async (start = 0, end = 10) => {
    const response = await axios.get("http://localhost:8080/hptl/patient/date");
    setData(response.data.slice(start, end));
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

   const state = {
    series: [{
      name: 'Servings',
      data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31]
    }],
    options: {
      annotations: {
        points: [{
          x: 'Bananas',
          seriesIndex: 0,
          label: {
            borderColor: '#775DD0',
            offsetY: 0,
            style: {
              color: '#fff',
              background: '#775DD0',
            },
            text: 'Bananas are good',
          }
        }]
      },
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: '50%',
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2
      },
      
      grid: {
        row: {
          colors: ['#fff', '#f2f2f2']
        }
      },
      xaxis: {
        labels: {
          rotate: -45
        },
        categories: ['', '', '', '', '', '', '', '', ''
        ],
        tickPlacement: 'on'
      },
     
      // yaxis: {
      //   title: {
      //     text: 'Servings',
      //   },
      // },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100]
        },
      }
    }
  };

  const options = {
    chart: {
      height: 350,
      type: 'line',
    },
    forecastDataPoints: {
      count: 7
    },
    stroke: {
      width: 5,
      curve: 'smooth'
    },
    xaxis: {
      type: 'month',
      categories: earningMonth,
      tickAmount: 10,
      // labels: {
      //   formatter: function(value, timestamp, opts) {
      //     return opts.dateFormatter(new Date(timestamp), 'dd MMM')
      //   }
      // }
    },
    title: {
      text: 'Earning Reports',
      align: 'left',
      style: {
        fontSize: "16px",
        color: '#666'
      }
    },
    
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#FDD835'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      },
    },
    yaxis: {
      min: 10,
      max: 90
    }
  };
const [ChartData,setChartData] = useState(50)
  const series = [{
    name: 'Total Earning',
    data: earningValues
  }];


  const columns = [
    // {
    //   name: "Id",
    //   selector: (row) => row.roll_id,
    // },
    {
      name: "Profile",
      selector: (row) => row.pro_img,
      cell: (row) => {
        return (
          <img
            src={
              row.image
                ? row.image
                : <BsPersonCircle />
            }
            alt=<BsPersonCircle />
            className="m-1"
            style={{ width: "30px", height: "30px", borderRadius: "10px" }}
          />
        );
      },
      // width: "8%",
      center: "center",
    
    },
    {
      name: "Name",
      selector: (row) => row.p_name,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
    },
    {
      name: "sumptoums",
      selector: (row) => row.sumptoums,
    },
    {
      name: "date",
      type:"date",
      selector: (row) => row.date,
      format:(row) => moment(row.date).format('YYYY-MM-DD')
    },
   
   
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "10px", // override the row height
        fontSize: "12px",
      },
    },

    headCells: {
      style: {
        background: "#f8f9fa",
        paddingLeft: "1%",
        paddingRight: "1%",
        fontSize: "15px",
        fontWeight:"bold",
        fontFamily:"italic",
        color:"gray"
      },
    },
    cells: {
      style: {
        paddingLeft: "2%",
      },
    },
    text: {
      style: {
        fontSize: "10px",
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
        fontSize: "10px",
      },
      background: {
        default: "#cacccf",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
        fontSize: "10px",
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
    <>
    <div className='f-wrap'>
    <Row>
    <Container className='d-flex gap-5' style={{flexWrap:"wrap"}}>
    <Card className='card1' style={{ width: '15rem',textAlign:"left",backgroundColor:"white",color:"gray",justifyContent:"space-around",display:"flex"}}>
    <Card.Body>
    <div >
    <Row className='d-flex mb-2' style={{flexWrap:"wrap",justifyContent:"space-around"}}>
    <Col className='w-20 sm-2'><div style={{background:"#f8f9fa",display:"flex",justifyContent:"center",padding:"4%",borderRadius:"5px"}}><FaUserDoctor size={20} color='skyblue'/></div></Col>
    <Col className='w-80 sm-7' style={{fontFamily:"emoji",fontWeight:"900"}}><Card.Text>
     Doctors
   </Card.Text>
   </Col>
   <Col className='sm-2'></Col>
    </Row>
    <div>
    
    <div id="chart" style={{background:"#f8f9fa",paddingTop:"5%"}}>
        <ReactApexChart options={state.options} series={state.series} type="bar" height={100} />
      </div>
    </div>
    
      </div>
    </Card.Body>
  </Card>
  <Card className='card2' style={{ width: '15rem',textAlign:"left",color:"gray",justifyContent:"space-around" }}>
  <Card.Body>
  <div >
    <Row className='d-flex mb-2' style={{flexWrap:"wrap",justifyContent:"space-around"}}>
    <Col className='w-20 sm-2'><div style={{background:"#f8f9fa",display:"flex",justifyContent:"center",padding:"4%",borderRadius:"5px"}}><BsCalendarDate  size={20} color='orange'/></div></Col>
    <Col className='w-80 sm-7' style={{fontFamily:"emoji",fontWeight:"900"}}><Card.Text>
     Appointment
   </Card.Text>
   </Col>
   <Col className='sm-2'></Col>
    </Row>
    <div>
    
    <div id="chart" style={{background:"#f8f9fa",paddingTop:"5%"}}>
        <ReactApexChart options={state.options} series={state.series} type="bar" height={100} />
      </div>
    </div>
    
      </div>
  </Card.Body>
</Card>
<Card className='card3' style={{ width: '15rem',textAlign:"left",color:"gray",justifyContent:"space-around" }}>
    <Card.Body>
    <div >
    <Row className='d-flex mb-2' style={{flexWrap:"wrap",justifyContent:"space-around"}}>
    <Col className='w-20 sm-3'><div style={{background:"#f8f9fa",display:"flex",justifyContent:"center",padding:"4%",borderRadius:"5px"}}><PiNewspaperClippingDuotone size={25} color='green'/></div></Col>
    <Col className='w-80 sm-7' style={{fontFamily:"emoji",fontWeight:"900"}}><Card.Text>
     Prescription
   </Card.Text>
   </Col>
   <Col className='sm-2'></Col>
    </Row>
    <div>
    
    <div id="chart" style={{background:"#f8f9fa",paddingTop:"5%"}}>
        <ReactApexChart options={state.options} series={state.series} type="bar" height={100} />
      </div>
    </div>
    
      </div>
    </Card.Body>
  </Card>
  <Card className='card4' style={{ width: '15rem' ,textAlign:"left",color:"gray",justifyContent:"space-around"}}>
  <Card.Body>
  <div >
  <Row className='d-flex mb-2' style={{flexWrap:"wrap",justifyContent:"space-around"}}>
  <Col className='w-20 sm-2'><div style={{background:"#f8f9fa",display:"flex",justifyContent:"center",padding:"4%",borderRadius:"5px"}}><TbCurrencyDollar  size={25} color='red'/></div></Col>
  <Col className='w-80 sm-7' style={{fontFamily:"emoji",fontWeight:"900"}}>
   Earnings

 </Col>
 <Col className='sm-2'></Col>
  </Row>
  <div>
  
  <div id="chart" style={{background:"#f8f9fa",paddingTop:"5%"}}>
      <ReactApexChart options={state.options} series={state.series} type="bar" height={100} />
    </div>
  </div>
  
    </div>
  </Card.Body>
</Card>
  </Container>
  </Row>
  
  <Row className='mt-5'>
  

  <Col className='sm-9'>
  <Card className='card1' style={{ width:'55rem',textAlign:"left",backgroundColor:"white"}}>
  <Card.Body>
  <div id="chart">
  <ReactApexChart options={options} series={series} type="line" height={350} />
      </div>
      </Card.Body>
</Card>
    </Col>

  <Col className='sm-3'>
  <Card className='card1' style={{ width: '20rem',textAlign:"left",backgroundColor:"white",color:"gray",justifyContent:"space-around",display:"flex"}}>
  <Card.Body>
  <Card.Text style={{fontWeight:"900",fontFamily:"emoji"}}>Recent Patient</Card.Text>
  <div style={{height:"20rem"}}>
  <DataTable
    tableStyle={{ minWidth: "60rem" ,height:"20rem"}}
    columns={columns}
    data={data}
    timeout
    // pagination
    scrollX
    scrollY
    overflowY
      overflowX
    customStyles={customStyles}
    fixedHeader
  ></DataTable>
</div>
  </Card.Body>
</Card>
</Col>
 
  </Row>
  </div>
  
  
 
    </>
  )
}

