import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoLecture.css';

function VideoLecture() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/videos')
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of Videos</h1>
      <ul className='video-list'>
        {videos.map(video => (
          <li key={video.id} >
            <a   href={video.file_url} target="_blank" rel="noopener noreferrer" className='link-button'>{video.file_name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VideoLecture;
