const express = require("express");
const app = express();
const port = 3004;
const mysql = require("./connection").con;
// configuration
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) => {
  res.status(200).render("home");
});
app.get("/admin",(req, res) => {
  res.status(200).render("admin");
});
app.get("/Adminlogin", (req, res) => {
  res.status(200).render("Adminlogin");
});
app.get("/dr", (req, res) => {
  res.status(200).render("dr");
});
app.get("/idinput", (req, res) => {
  res.status(200).render("idinput");
});
app.get("/interninput", (req, res) => {
  res.status(200).render("interninput");
});
app.get("/internship", (req, res) => {
  res.status(200).render("internship");
});
app.get("/ir", (req, res) => {
  res.status(200).render("ir");
});
app.get("/projectdelete", (req, res) => {
  res.status(200).render("projectdelete");
});
app.get("/projectinput", (req, res) => {
  res.status(200).render("projectinput");
});
app.get("/Projects", (req, res) => {
  res.status(200).render("Projects");
});
app.get("/Research", (req, res) => {
  res.status(200).render("Research");
});
app.get("/researchinput", (req, res) => {
  res.status(200).render("researchinput");
});
app.get("/signIn", (req, res) => {
  res.status(200).render("signIn");
});
app.get("/signup", (req, res) => {
  res.status(200).render("signup");
});
app.get("/studdelete", (req, res) => {
  res.status(200).render("studdelete");
});
app.get("/studinput", (req, res) => {
  res.status(200).render("studinput");
});
app.get("/studupdate", (req, res) => {
  res.status(200).render("studupdate");
});
app.get("/ur", (req, res) => {
  res.status(200).render("ur");
});
app.get("/vr", (req, res) => {
  res.status(200).render("vr");
});
//Registration form
app.get("/signup_details", (req, res) => {
  // fetching data from form
  const { email, regno, pw, p1 } = req.query;
  // Sanitization XSS...
  let qry = "select * from login_details where registration_no=? or email_id=?";
  mysql.query(qry, [regno, email], (err, results) => {
    if (err) throw err;
    else {
      if (results.length > 0) {
        res.render("signup", { checkmesg: true });
      } else {
        // insert query
        let qry2 = "insert into login_details values(?,?,?)";
        console.log("Executing INSERT query...");
        mysql.query(qry2, [regno, pw, email], (err, insertresults) => {
          if (err) {
            console.error("Error during INSERT query:", err);
            res
              .status(500)
              .send("An error occurred while processing your request.");
            return;
          }
          console.log("Query executed successfully.");
          if (insertresults && insertresults.affectedRows > 0) {
            console.log("Data inserted successfully.");
            res.render("signup", { mesg: true });
          }
        });
      }
    }
  });
});
//Admin login
app.get("/adminlog", (req, res) => {
  const { regno, pw } = req.query;
  if (regno === 'admin' && pw === 'admin') {
    res.render('admin');
  } else {
    res.render('Adminlogin', { checkmesg: true });
  }
});
//Option selecting from the list
app.get("/search", (req, res) => {
  const selectedOption = req.query.opt;
  if (selectedOption) {
      // Redirect based on the selected option
      res.redirect(`/${selectedOption}`);
  } else {
      // Handle the case where no option is selected
      res.redirect("/");
  }
});
//view of student_details
app.get("/students_view", (req, res) => {
  let qry = "select * from student";
  mysql.query(qry, (err, results) => {
      if (err) throw err
      else {
          res.render("students_view", { data: results });
      }
  });
});
//view project details
app.get("/projects_view", (req, res) => {
  let qry = "select * from projects";
  mysql.query(qry, (err, results) => {
      if (err) throw err
      else {
          res.render("projects_view", { data: results });
      }
  });
});
//view research details
app.get("/research_view", (req, res) => {
  let qry = "select * from researchpapereach";
  mysql.query(qry, (err, results) => {
      if (err) throw err
      else {
          res.render("research_view", { data: results });
      }
  });
});
//view of internship details
app.get("/internships_view", (req, res) => {
  let qry = "select * from internship";
  mysql.query(qry, (err, results) => {
      if (err) throw err
      else {
          res.render("internships_view", { data: results });
      }
  });
});
//student details input
app.get("/stud_input",(req,res)=>{
  // fetching data from form
  const { sid,sname,cgpa,branch,division,internship,projectid,domain,clubname,researchpaper,registrationid } = req.query;
  // Sanitization XSS...
  let qry = "select * from student where registration_no=? or s_id=?";
  mysql.query(qry, [registrationid,sid], (err, results) => {
    if (err) throw err;
    else {
      if (results.length > 0) {
        res.render("studinput", { checkmesg: true });
      } else {
        // insert query
        let qry2 = "insert into student values(?,?,?,?,?,?,?,?,?,?,?)";
        console.log("Executing INSERT query...");
        mysql.query(qry2, [sid,sname,cgpa,branch,division,internship,projectid,domain,clubname,registrationid,researchpaper], (err, insertresults) => {
          if (err) {
            console.error("Error during INSERT query:", err);
            res
              .status(500)
              .send("An error occurred while processing your request.");
            return;
          }
          console.log("Query executed successfully.");
          if (insertresults && insertresults.affectedRows > 0) {
            console.log("Data inserted successfully.");
            res.render("studinput", { mesg: true });
          }
        });
      }
    }
  });
})
//input research details
app.get("/research_input",(req,res)=>{
  // fetching data from form
  const { publicationname,publicationtitle,domain,sid,teamMembers} = req.query;
  // Sanitization XSS...
  let qry = "select * from researchpapereach where publication_name=?";
  mysql.query(qry, [publicationname], (err, results) => {
    if (err) throw err;
    else {
      if (results.length > 0) {
        res.render("researchinput", { checkmesg: true });
      } else {
        // insert query
        let qry2 = "insert into researchpapereach values(?,?,?,?,?)";
        console.log("Executing INSERT query...");
        mysql.query(qry2, [publicationname,publicationtitle,domain,sid,teamMembers], (err, insertresults) => {
          if (err) {
            console.error("Error during INSERT query:", err);
            res
              .status(500)
              .send("An error occurred while processing your request.");
            return;
          }
          console.log("Query executed successfully.");
          if (insertresults && insertresults.affectedRows > 0) {
            console.log("Data inserted successfully.");
            res.render("researchinput", { mesg: true });
          }
        });
      }
    }
  });
})
//input internship details
app.get("/intern_input",(req,res)=>{
  // fetching data from form
  const { compname,iyear,imonth,stipend} = req.query;
  // Sanitization XSS...
  let qry = "select * from internship where companyname=? or stipend=?";
  mysql.query(qry, [compname,stipend], (err, results) => {
    if (err) throw err;
    else {
      if (results.length > 0) {
        res.render("interninput", { checkmesg: true });
      } else {
        // insert query
        let qry2 = "insert into internship values(?,?,?,?)";
        console.log("Executing INSERT query...");
        mysql.query(qry2, [compname,stipend,iyear,imonth], (err, insertresults) => {
          if (err) {
            console.error("Error during INSERT query:", err);
            res
              .status(500)
              .send("An error occurred while processing your request.");
            return;
          }
          console.log("Query executed successfully.");
          if (insertresults && insertresults.affectedRows > 0) {
            console.log("Data inserted successfully.");
            res.render("interninput", { mesg: true });
          }
        });
      }
    }
  });
})
//input project details
app.get("/project_input",(req,res)=>{
  // fetching data from form
  const { projectid,title,mentor,description,sid,domain} = req.query;
  // Sanitization XSS...
  let qry = "select * from projects where project_id=?";
  mysql.query(qry, [projectid], (err, results) => {
    if (err) throw err;
    else {
      if (results.length > 0) {
        res.render("projectinput", { checkmesg: true });
      } else {
        // insert query
        let qry2 = "insert into projects values(?,?,?,?,?,?)";
        console.log("Executing INSERT query...");
        mysql.query(qry2, [projectid,title,mentor,description,sid,domain], (err, insertresults) => {
          if (err) {
            console.error("Error during INSERT query:", err);
            res
              .status(500)
              .send("An error occurred while processing your request.");
            return;
          }
          console.log("Query executed successfully.");
          if (insertresults && insertresults.affectedRows > 0) {
            console.log("Data inserted successfully.");
            res.render("projectinput", { mesg: true });
          }
        });
      }
    }
  });
})
//searching the student id for insert
app.get("/id_input",(req,res)=>{
  const { sid } = req.query;

    let qry = "select * from student where s_id=?";
    mysql.query(qry, [sid], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("studupdate", {mesg1: true,mesg2:true, data: results })
            } else {
                res.render("idinput", { mesg: true})
            }
        }
    });
})
//updating the student details
app.get("/stud_update", (req, res) => {
  // fetch data

  const { sid,sname,cgpa,branch,division,internship,projectid,domain,clubname,researchpaper,registrationid } = req.query;
  let qry = "update student set sname=?, cgpa=?, branch=?, division=?, internship=?, project_id=?, domain=?, clubname=?, registration_no=?, researchpaper=? where s_id=?";

  mysql.query(qry, [sname,cgpa,branch,division,internship,projectid,domain,clubname,registrationid,researchpaper,sid], (err, results) => {
      if (err) throw err
      else {
          if (results.affectedRows > 0) {
              res.render("studupdate", { mesg1:true, mesg2:false,umesg: true })
          }
      }
  })
});
//delete student
app.get("/stud_delete", (req, res) => {
  // fetch data from the form
  const {registration_id} = req.query;
  let qry = "delete from student where registration_no=?";
  mysql.query(qry, [registration_id], (err, results) => {
      if (err) throw err
      else {
          if (results.affectedRows > 0) {
              res.render("studdelete", { mesg1: true, mesg2: false })
          } else {
              res.render("studdelete", { mesg1: false, mesg2: true })
          }
      }
  });
});
//delete project details
app.get("/project_delete", (req, res) => {
  // fetch data from the form
  const {project_id} = req.query;
  let qry = "delete from projects where project_id=?";
  mysql.query(qry, [project_id], (err, results) => {
      if (err) throw err
      else {
          if (results.affectedRows > 0) {
              res.render("projectdelete", { mesg1: true, mesg2: false })
          } else {

              res.render("projectdelete", { mesg1: false, mesg2: true })
          }
      }
  });
});
//view researches of particular domain
app.get("/re_search", (req, res) => {
  const { domain } = req.query;
  let qry = "SELECT * FROM researchpapereach WHERE domain=?";
  console.log("Executing query!");
  mysql.query(qry, [domain], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      throw err;
    } else {
      console.log("Query results:", results); // Log the query results
      if (results.length > 0) {
        res.render("research_view", { data: results });
      } else {
        res.render("Research", { mesg1: true });
      }
    }
  });
});
//view projects of particular domain
app.get("/pro_jects", (req, res) => {
  const { domain } = req.query;
  let qry = "SELECT * FROM projects WHERE domain=?";
  console.log("Executing query!");
  mysql.query(qry, [domain], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      throw err;
    } else {
      console.log("Query results:", results); // Log the query results
      if (results.length > 0) {
        res.render("projects_view", { data: results });
      } else {
        res.render("Projects", { mesg1: true });
      }
    }
  });
});
//view internship for particular conditions
app.get("/intship", (req, res) => {
  const { compname, iyear, imonth } = req.query;
  const selectedOption = parseInt(req.query.opt); // Convert to a number

  let qry; // Define qry here

  if (selectedOption === 1) {
    qry = "SELECT * FROM internship WHERE companyname=? and i_year=? and i_month=? and stipend=0";
  } else if (selectedOption === 2) {
    qry = "SELECT * FROM internship WHERE companyname=? and i_year=? and i_month=? and stipend<10000";
  } else if (selectedOption === 3) {
    qry = "SELECT * FROM internship WHERE companyname=? and i_year=? and i_month=? and stipend>=10000 and stipend<25000";
  } else if (selectedOption === 4) {
    qry = "SELECT * FROM internship WHERE companyname=? and i_year=? and i_month=? and stipend>=25000 and stipend<50000";
  } else if (selectedOption === 5) {
    qry = "SELECT * FROM internship WHERE companyname=? and i_year=? and i_month=? and stipend>=50000 and stipend<75000";
  } else if (selectedOption === 6) {
    qry = "SELECT * FROM internship WHERE companyname=? and i_year=? and i_month=? and stipend>=75000 and stipend<100000";
  } else if (selectedOption === 7) {
    qry = "SELECT * FROM internship WHERE companyname=? and i_year=? and i_month=? and stipend>100000";
  }

  mysql.query(qry, [compname, iyear, imonth], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      throw err;
    } else {
      console.log("Query results:", results); // Log the query results
      if (results.length > 0) {
        res.render("internships_view", { data: results });
      } else {
        res.render("internship", { mesg1: true });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`The app started successfully on port ${port}`);
});
