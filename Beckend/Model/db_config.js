const mysql = require('mysql');

// const pg =

let connection =mysql.createConnection({
     user:process.env.DB_USER,
     host:process.env.DB_HOST,
     password:process.env.DB_PASSWORD,
     database:process.env.DB_DATABASE,
     port:process.env.DB_PORT
     
})

connection.connect((err)=>{
     if(err){
          console.log(err)
     }else{
          console.log('Database connected successfully')
     }
})

module.exports = connection;