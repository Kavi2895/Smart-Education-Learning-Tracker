const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"kavi2895*",
database:"education_tracker"
})

db.connect(err=>{
if(err){
console.log("Database connection failed")
}else{
console.log("MySQL Connected")
}
})

/* ADD RECORD API */

app.post("/addRecord",(req,res)=>{

const {name,subject,hours,marks}=req.body

const sql="INSERT INTO records(name,subject,hours,marks) VALUES(?,?,?,?)"

db.query(sql,[name,subject,hours,marks],(err,result)=>{

if(err){
console.log(err)
res.send("Error inserting data")
}else{
res.send("Record added successfully")
}

})

})

/* GET RECORDS API */

app.get("/getRecords",(req,res)=>{

const sql="SELECT * FROM records"

db.query(sql,(err,result)=>{

if(err){
console.log(err)
res.send("Error fetching data")
}else{
res.json(result)
}

})

})

app.listen(5000,()=>{
console.log("Server running on port 5000")
})