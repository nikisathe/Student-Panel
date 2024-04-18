import React, { useState, useEffect } from "react";
import "./Submitted.css";
import axios from "axios";

function Submitted() {
  const [formData, setFormData] = useState({
    title: '',
    submissiondate: '',
    description: '',
    file: '',
    submitedby: '',
    filename: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
      filename: e.target.files[0].name 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('submissiondate', formData.submissiondate);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('file', formData.file);
    formDataToSend.append('submitedby', formData.submitedby);
    formDataToSend.append('filename', formData.filename);
    try {
  
       await axios.post('http://localhost:3001/submit', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Assignment submitted successfully');
     
      setFormData({
        title: '',
        submissiondate: '',
        description: '',
        file: '',
        submitedby: '',
        filename:'',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/submitted');
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString('en-US', { timeZone: 'UTC' });
  };

  const downloadFile = (fileData, filename) => {
    const blob = new Blob([new Uint8Array(fileData.data)], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };


  return (
    <div>
      <h2>Submitted Assignment</h2>
      

      <div className="assignment-list">
        {assignments.map((assignment, index) => (
          <div key={index} className="assignment-item">
            <h3>{`  Assignment ${index + 1}`}</h3>
            <p>Title: {assignment.title}</p>
            <p>Submission Date: {formatDate(assignment.submission_date)}</p>
            <p>Submitted By: {assignment.submitted_by}</p>
            <button onClick={() => downloadFile(assignment.file, assignment.filename)}>
            Download File
          </button>
            <p>Description: {assignment.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Submitted;
