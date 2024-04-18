import React, { useState } from 'react';
import axios from 'axios';

function StudentAttendance() {
  const [studentName, setStudentName] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/api/attendance/student/${studentName}`);
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      setMessage('Failed to fetch attendance records');
    }
  };
const formatDate = (dateTimeString)=> {
  const  dateTime = new Date(dateTimeString);
  return dateTime.toLocaleDateString();

}
  return (
    <div>
      <h2>View Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student Name:</label>
          <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
        </div>
        <button type="submit">View Attendance</button>
      </form>
      {attendanceRecords.length > 0 && (
        <div>
          <h3>Attendance Records for {studentName}:</h3>
          <ul>
            {attendanceRecords.map((record, index) => (
              <li key={index}>
              Date: {formatDate(record.date)}, Status: {record.attendance_status}
              </li>
            ))}
          </ul>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default StudentAttendance;
