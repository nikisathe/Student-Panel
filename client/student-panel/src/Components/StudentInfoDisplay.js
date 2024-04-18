import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentInfo = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/student-info');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching student information:', error);
       
      }
    };

    fetchStudents();
  }, []);

 
  const handleUpdate = async (id, updatedStudent) => {
    try {
      const formData = new FormData();
      formData.append('stud_std', updatedStudent.stud_std);
      formData.append('stud_rollno', updatedStudent.stud_rollno);
      formData.append('stud_div', updatedStudent.stud_div);
      formData.append('stud_dob', updatedStudent.stud_dob);
      formData.append('stud_phoneno', updatedStudent.stud_phoneno);
      formData.append('username', updatedStudent.username);
      formData.append('photo', updatedStudent.photo);
  
      const response = await axios.patch(`http://localhost:3001/student-info/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
   
    } catch (error) {
      console.error('Error updating student information:', error);
    }
  };
  
  return (
    <div>
      <h2>Student Information</h2>
      {students.map((student) => (
        <div key={student.id} style={{ marginBottom: '20px' }}>
          <h3>{student.stud_name}</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            const updatedStudent = {
              stud_std: e.target.elements.stud_std.value,
              stud_rollno: e.target.elements.stud_rollno.value,
              stud_div: e.target.elements.stud_div.value,
              stud_dob: e.target.elements.stud_dob.value,
              stud_phoneno: e.target.elements.stud_phoneno.value,
              username: e.target.elements.username.value,
              photo: e.target.elements.photo.files[0] 
            };
            handleUpdate(student.stud_id, updatedStudent);
          }}>
            <label>
              Standard:
              <input type="text" name="stud_std" defaultValue={student.stud_std} />
            </label>
            <br />
            <label>
              Roll Number:
              <input type="text" name="stud_rollno" defaultValue={student.stud_rollno} />
            </label>
            <br />
            <label>
              Division:
              <input type="text" name="stud_div" defaultValue={student.stud_div} />
            </label>
            <br />
            <label>
              Date of Birth:
              <input type="text" name="stud_dob" defaultValue={student.stud_dob} />
            </label>
            <br />
            <label>
              Phone Number:
              <input type="text" name="stud_phoneno" defaultValue={student.stud_phoneno} />
            </label>
            <br />
            <label>
              Username:
              <input type="text" name="username" defaultValue={student.username} />
            </label>
            <br />
            <label>
              Photo:
              <input type="file" name="photo" accept="image/*" />
            </label>
            <br />
            <button type="submit">Update</button>
            {student.photo && <img src={`data:image/*;base64,${student.photo}`} alt="Student" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />}
          </form>
        </div>
      ))}
    </div>
  );
};

export default StudentInfo;
