const mysql =require('mysql');
const express =require('express');
let cors =require('cors');
let dotenv = require('dotenv')
dotenv.config()

let app =express();
let port =5000;

app.use(express.json());
app.use(cors());


let connection =mysql.createConnection({
     user:"root",
     host:"localhost",
     password:"",
     database:"company",
     port:3306
})

connection.connect((err)=>{
     if(err){
          console.log(err) 
     }else{
          console.log('Database connected successfully')
     }
})


//------------Joi validation-----------
var Joi = require('joi')

const validationMiddleware = (req,res,next) =>{
const schema = Joi.object().keys({
name:Joi.string().required(),
email:Joi.string().required(),
phone:Joi.number().required(),
gender:Joi.string().required(),
city:Joi.string().required(),
Salary:Joi.number().required(),

})
const response = schema.validate(req.body);
if(error){
     res.status(200).json({error:error})
}else{

     next();
}

}

app.get("/hptl/empdetail",(req,res)=>{
     const sql="select * from empdata";
     connection.query(sql,(err,result)=>{
if(err){
     res.send(err)
}else{
     res.send(result)
}
     })
})


app.get("/hptl/empdetail",(req,res)=>{
     const sql="select * from empdata";
     connection.query(sql,(err,result)=>{
if(err){
     res.send(err)
}else{
     res.send(result)
}
     })
})


app.post("/hptl/empdetail",validationMiddleware,(req,res)=>{
     const data =req.body
     const sql="INSERT INTO empdata SET ?";
     connection.query(sql,[data],(err,result)=>{
if(err){
     res.send({status:"400",response:err})
}else{
     res.send({status:"200",response:result})
}
     })
})

app.put("/hptl/empdetail/:id",(req,res)=>{
     const data =req.body;
     let empid =req.params.id;
     const sql="UPDATE empdata SET ? WHERE id=?";
     connection.query(sql,[data,empid],(err,result)=>{
if(err){
     res.send({status:"400",response:err})
}else{
     res.send({status:"201",response:result})
}
     })
})



app.delete("/api/empdata/:id",(req,res)=>{
     const data =req.params.id
     const sql="delete from empdata where id=?";
     connection.query(sql,data,(err,result)=>{
if(err){
     res.send({status:"400",response:err})
}else{
     res.send({status:"200",response:result})
}
     })
})

app.listen(5050,()=>{
     console.log(`server started 5050`)
})