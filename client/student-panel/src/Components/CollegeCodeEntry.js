import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CollegeCodeEntry = () => {
  const [collegeCode, setCollegeCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('College Code:', collegeCode); 
    try {
      const response = await fetch('http://localhost:3001/checkCollegeCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ collegeCode }),
      });
      const data = await response.text();
      if (response.ok) {
        navigate('/login');
      } else {
        alert(data); 
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Enter College Code</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter College Code"
          value={collegeCode}
          onChange={(e) => setCollegeCode(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CollegeCodeEntry;
