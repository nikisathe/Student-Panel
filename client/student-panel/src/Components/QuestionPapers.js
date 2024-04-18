import React, { useState, useEffect } from "react";
import axios from "axios";

const QuestionPapers = () => {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/paper');
      setPapers(response.data);
    } catch (error) {
      console.error('Error fetching papers:', error);
    }
  };

  const downloadFile = async ( file,filename) => {
    // try {
    //   const response = await axios.get(`http://localhost:3001/paper`, {
    //     responseType: 'blob'
    //   });
  
      const blob = new Blob([new Uint8Array(file.data)], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); 
    // } catch (error) {
    //   console.error('Error downloading file:', error);
    // }
  };
  
  return (
    <div>
      <h2>Question Papers</h2>
      <div className='paper-list'>
        {papers.map((paper, index) => (
          <div key={index} className="paper-item">
            <button onClick={() => downloadFile( paper.file ,paper.filename)}>
              {paper.filename}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPapers;
