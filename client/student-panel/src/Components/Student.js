import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Student() {
  const [questions, setQuestions] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/questions');
      setQuestions(response.data);
      const initialAnswers = {};
      response.data.forEach(question => {
        initialAnswers[question.q_id] = ''; 
      });
      setAnswers(initialAnswers);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
  };

  const handleInputChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleAnswerChange = (e, questionId) => {
    const { value } = e.target;
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmitAnswers = async () => {
    try {
      const response = await axios.post('http://localhost:3001/answers', { student_id: studentId, answers });
      setResult(response.data.correct_count);
    } catch (error) {
      console.error('Failed to submit answers:', error);
    }
  };

  return (
    <div>
      <h1>Student Interface</h1>
      <input type="text" value={studentId} onChange={handleInputChange} placeholder="Enter Student ID" />
      <ul>
        {questions.map((question) => (
          <li key={question.q_id}>
            <p>{question.question}</p>
            <label>
              <input 
                type="radio" 
                name={`question_${question.q_id}`} 
                value="A" 
                checked={answers[question.q_id] === 'A'} 
                onChange={(e) => handleAnswerChange(e, question.q_id)} 
              />
              {question.option1}
            </label> 
            <label>
              <input 
                type="radio" 
                name={`question_${question.q_id}`} 
                value="B" 
                checked={answers[question.q_id] === 'B'} 
                onChange={(e) => handleAnswerChange(e, question.q_id)} 
              />
              {question.option2}
            </label>
            <label>
              <input 
                type="radio" 
                name={`question_${question.q_id}`} 
                value="C" 
                checked={answers[question.q_id] === 'C'} 
                onChange={(e) => handleAnswerChange(e, question.q_id)} 
              />
               {question.option3}
            </label>
            <label>
              <input 
                type="radio" 
                name={`question_${question.q_id}`} 
                value="D" 
                checked={answers[question.q_id] === 'D'} 
                onChange={(e) => handleAnswerChange(e, question.q_id)} 
              />
              {question.option4}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmitAnswers}>Submit Answers</button>
      {result !== null && <p>result: {result}</p>}
    </div>
  );
}

export default Student;
