const mysql=require("mysql")
const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"sri",
    port:0
});
con.connect((err)=>{
    if(err) throw err;
    console.log("Connection is created..!!")
})
module.exports.con=con;
