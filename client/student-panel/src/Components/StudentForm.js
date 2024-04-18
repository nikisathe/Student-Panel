import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [Submitting , setSubmitting] = useState('');
  const [Success, setSuccess]= useState('');
  
  const [formData, setFormData] = useState({
    stud_name: '',
    stud_std: '',
    stud_rollno: '',
    stud_div: '',
    stud_dob: '',
    stud_phoneno: '',
    username: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    setSubmitting(true);
  
    const { stud_name, stud_std, stud_rollno, stud_div, stud_dob, stud_phoneno, username, photo } = formData;
  
    const studentData = new FormData();
    studentData.append('stud_name', stud_name);
    studentData.append('stud_std', stud_std);
    studentData.append('stud_rollno', stud_rollno);
    studentData.append('stud_div', stud_div);
    studentData.append('stud_dob', stud_dob);
    studentData.append('stud_phoneno', stud_phoneno);
    studentData.append('username', username);
    studentData.append('photo', photo);
  
    try {
      const res = await axios.post('http://localhost:3001/api/students', studentData);
      console.log("Response from server:", res.data);
      setSuccess(true);
      
      setFormData({
        stud_name: '',
        stud_std: '',
        stud_rollno: '',
        stud_div: '',
        stud_dob: '',
        stud_phoneno: '',
        username: '',
        photo: null,
      });
    } catch (error) {
      console.error('Error inserting student data:', error);
      console.log('Error response:', error.response);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="stud_name" placeholder="Name" value={formData.stud_name} onChange={handleChange} />
      <input type="text" name="stud_std" placeholder="Standard" value={formData.stud_std} onChange={handleChange} />
      <input type="text" name="stud_rollno" placeholder="Roll Number" value={formData.stud_rollno} onChange={handleChange} />
      <input type="text" name="stud_div" placeholder="Division" value={formData.stud_div} onChange={handleChange} />
      <input type="date" name="stud_dob" placeholder="Date of Birth" value={formData.stud_dob} onChange={handleChange} />
      <input type="text" name="stud_phoneno" placeholder="Phone Number" value={formData.stud_phoneno} onChange={handleChange} />
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
      <input type="file" name="photo" onChange={handleFileChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
