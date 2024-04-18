
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');



const storage = multer.memoryStorage({});
 const upload= multer({ storage: storage });

const app = express();
const port = 3001;
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const techerrecord_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "TEACHERRECORD"
});

techerrecord_connection.connect((error) => {
    if (error) {
        console.error("Error while connecting to techerrecord database:", error);
        process.exit(1);
    } else {
        console.log("techerrecord database connected");
    }
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'collegedata'
  });
  
  
  connection.connect((error) => {
    if (error){
      console.error('error while connecting to collegedata database:' , error);
      process.exit(1);
    }
    else{
      console.log(' succeccfully connected to collegedata database');
    }
  });

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quiz'
  });
  
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Connected to MySQL');
  });
  const attendance = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'attendance_db'
  });
  
  
  attendance.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('MySQL Connected...');
  }); 

  const Paper_connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Questionpapers",
  });
  
  Paper_connection.connect((error) => {
    if (error) {
      console.error("Error while connecting to techerrecord database:", error);
      process.exit(1);
    } else {
      console.log("techerrecord database connected");
    }
  });
app.get('/assignments', (req,res) =>{
    const sql = 'SELECT * FROM assignment';
    techerrecord_connection.query(sql, (err, result) =>{
        if(err){
            res.status(500).send({
                error: 'Error fetching assignments'
            });
        }else{
            res.json(result);
        }
    });
});
app.post('/assignment', upload.single('file'), (req, res) => {
    const { deadline, title, createdby, description } = req.body;
    const file = req.file.buffer;
    const filename = req.file.originalname; 

    const sql = 'INSERT INTO assignment (deadline, title, file, filename, created_by, description) VALUES (?, ?, ?, ?, ?, ?)';

    techerrecord_connection.query(sql, [deadline, title, file, filename, createdby, description], (err, result) => {
        if (err) {
            console.error('Error creating assignment:', err);
            return res.status(400).send({
                error: 'Failed to add the data'
            });
        } else {
            console.log('Assignment created successfully');
            res.status(201).send({ message: 'Assignment created successfully' });
        }
    });
});


app.get('/submitted', (req,res) =>{
    const sql = 'SELECT * FROM ass_submit';
    techerrecord_connection.query(sql, (err, result) =>{
        if(err){
            res.status(500).send({
                error: 'Error fetching assignments'
            });
        }else{
            res.json(result);
        }
    });
});

app.post('/submit', upload.single('file'), (req, res)=> {
    const { submissiondate,title,submitedby,description } = req.body;
    const file = req.file.buffer;
    const filename = req.file.originalname;

     const sql = 'INSERT INTO ass_submit (submission_date, title, file, filename, submitted_by, description) VALUES (?, ?, ?, ?, ?, ?)';

    techerrecord_connection.query(sql, [submissiondate, title, file, filename, submitedby, description], (err, result) => {
        if(err) {
            console.error('Error creating assignment:', err);
            return res.status(400).send({
                error: 'Failed to add the data'
            });
        } else {
            console.log('Assignment submitted successfully');
            res.status(201).send({ message: 'Assignment sumiited successfully'});
        }
    });
});

app.post("/checkCollegeCode", (req, res) => {
  const { collegeCode } = req.body;
  if (!collegeCode) {
    return res.status(400).send("College code is required");
  }
  connection.query(
    "SELECT * FROM colleges WHERE college_code = ?",
    [collegeCode],
    (err, results) => {
      if (err) {
        res.status(500).send("Error checking college code");
      } else if (results.length === 0) {
        res.status(400).send("Invalid college code");
      } else {
        res.status(200).send("Valid college code");
      }
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

 
  connection.query(
    "SELECT * FROM studentinfo WHERE username = ? AND password = ?",
    [username, password],
    (err, studentResults) => {
      if (err) {
      
        res.status(500).send("Error logging in");
      } else if (studentResults.length === 0) {

        res.status(400).send("Invalid username or password");
      } else {
        
        res.status(200).send("Login successful");
      }
    }
  );
});


app.post('/api/students', upload.single('photo'), (req, res) => {
  const { stud_name, stud_std, stud_rollno, stud_div, stud_dob, stud_phoneno, username } = req.body;
  const photoData = req.file ? req.file.buffer : null;

  const sql = 'INSERT INTO student (stud_name, stud_std, stud_rollno, stud_div, stud_dob, stud_phoneno, username, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [stud_name, stud_std, stud_rollno, stud_div, stud_dob, stud_phoneno, username, photoData];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into student table:', err);
      res.status(500).json({ error: 'An error occurred while inserting data into the database.' });
    } else {
      res.status(201).json({ message: 'Student data inserted successfully.' });
    }
  });
});






app.get("/student-info", (req, res) => {
  const sql = "SELECT * FROM student";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching student information");
    } else {
      const studentsWithPhoto = results.map((student) => {
        if (student.photo) {
          const base64Image = Buffer.from(student.photo).toString("base64");
          return { ...student, photo: base64Image };
        } else {
          return student;
        }
      });
      res.status(200).json(studentsWithPhoto);
    }
  });
}); 


app.patch('/student-info/:id', upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const updatedStudent = req.body;

  if (req.file) {
    updatedStudent.photo = req.file.buffer; 
  }

  const sql = 'UPDATE student SET ? WHERE stud_id = ?';
  connection.query(sql, [updatedStudent, id], (err, result) => {
    if (err) {
      console.error('Error updating student information:', err);
      res.status(500).send('Error updating student information');
    } else {
      res.status(200).send('Student information updated successfully');
    }
  });
});

app.get('/questions', (req, res) => {
    const sql = 'SELECT * FROM questions';
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Failed to fetch questions' });
      } else {
        res.status(200).json(result);
      }
    });
  });
  
  
  app.post('/answers', async (req, res) => {
    const { student_id, answers } = req.body;
    let correctCount = 0;
  
    try {
      for (const [questionId, studentAnswer] of Object.entries(answers)) {
        
        const [question] = await new Promise((resolve, reject) => {
          db.query('SELECT Answer FROM questions WHERE q_id = ?', [questionId], (err, result) => {
            if (err) reject(err);
            resolve(result);
          });
        });
  
      
        if (question && question.Answer === studentAnswer) {
          correctCount++;
        }
  
        
        await new Promise((resolve, reject) => {
          db.query('INSERT INTO stud_questions (student_id, q_id, student_answer) VALUES (?, ?, ?)', [student_id, questionId, studentAnswer], (err, result) => {
            if (err) reject(err);
            resolve();
          });
        });
      }
  
   
      res.status(200).json({ correct_count: correctCount });
    } catch (error) {
      console.error('Failed to store answers or calculate result:', error);
      res.status(500).json({ message: 'Failed to store answers or calculate result' });
    }
  });
  
  
  
  app.post('/evaluate', (req, res) => {
    const { student_id } = req.body;
    const sql = 'SELECT q.q_id, q.Answer, sq.student_answer FROM questions q JOIN stud_questions sq ON q.id = sq.q_id WHERE sq.student_id = ?';
    db.query(sql, [student_id], (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Failed to evaluate answers' });
      } else {
        let correctCount = 0;
        result.forEach((row) => {
          if (row.correctAnswer === row.student_answer) {
            correctCount++;
          }
        });
        res.status(200).json({ correct_count: correctCount });
      }
    });
  });

  app.get('/api/students', (req, res) => {
    const sql = 'SELECT student_name FROM Student_name';
    attendance.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  
  

  

  app.get('/api/attendance/student/:studentName', (req, res) => {
    const studentName = req.params.studentName;
    const sql = 'SELECT date, attendance_status FROM attendance_records WHERE student_name = ?';
    attendance.query(sql, [studentName], (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get("/paper", (req, res) => {
    const sql = "SELECT * FROM UPLOADPAPER";
    Paper_connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).send({
          error: "Error fetching paper",
        });
      } else {
        res.json(result);
      }
    });
  });

  app.get("/videos", (req, res) => {
    const sql = "SELECT * FROM upload";
    techerrecord_connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).send({
          error: "Error fetching videos",
        });
      } else {
        res.json(result);
      }
    });
  });



app.listen(port, () => {
    console.log(`Server is connected on port ${port}`);
});
