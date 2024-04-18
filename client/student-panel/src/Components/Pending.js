import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Pending = () => {
  const [assignments, setAssignments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

 
  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const pendingResponse = await axios.get('http://localhost:3001/assignments');
      const submittedResponse = await axios.get('http://localhost:3001/submitted');
      
      const pendingAssignments = pendingResponse.data;
      const submittedIds = submittedResponse.data.map(assignment => assignment.title);

      const filteredAssignments = pendingAssignments.filter(assignment => !submittedIds.includes(assignment.title));

      setAssignments(filteredAssignments);
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
  return (
    <div>
      <h2>Pending Assignments</h2>
      {assignments.map((assignment, index) => (
        <div key={index}>
          <h3>{`Assignment ${index + 1}`}</h3>
          <p>Title: {assignment.title}</p>
          <p>Deadline: {formatDate(assignment.deadline)}</p>
          <p>Created By: {assignment.created_by}</p>
          <p>Description: {assignment.description}</p>
          <button onClick={() => downloadFile(assignment.file, assignment.filename)}>
            Download File
          </button>
          <button onClick={openModal}>Submit</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
          <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        <br /><br />

        <label htmlFor="submissiondate">submissiondate:</label>
        <input type="date" id="submissiondate" name="submissiondate" value={formData.submissiondate} onChange={handleChange} />
        <br /><br />

        <label htmlFor="description">Description:</label><br />
        <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
        <br /><br />

        <label htmlFor="file">File:</label>
        <input type="file" id="file" name="file"   onChange={handleFileChange} />
        <br /><br />

        <label htmlFor="filename">Filename:</label> 
        <input type="text" id="filename" name="filename" value={formData.filename} onChange={handleChange} />
        <br /><br />
        
        <label htmlFor="submitedby">submited By:</label>
        <input type="text" id="submitedby" name="submitedby" value={formData.submitedby} onChange={handleChange} />
        <br /><br />

        <button type="submit">Submit</button>
      </form>
        <button onClick={closeModal}>Close</button>
      </Modal>
        </div>
      ))}
        


    </div>
  );
}

export default Pending;
