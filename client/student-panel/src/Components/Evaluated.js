import React from 'react';
import './Evaluated.css';

function Evaluated () {
  return (
    <div className="contener">
        <div className="contener1">
            <div className="text1">
                <h1 className="name">Hello, Sai Chaudhari</h1>
                <h2 className="date">12 March 2024</h2>
            </div>
        </div>

        <div className="Line">
            <div className="line"></div>
        </div>

        <div className="Econtener2">
            <div className="box">
                <div className="percent">
                    <svg>
                        <circle cx="70" cy="70" r="70"></circle>
                    </svg>
                <div className="number">
                    <h2>100%</h2>
                </div>
                </div>
            </div>
            <div className="righttext">
                <div className="blue">
                    <div className="bluecolor"></div>
                    <h1 className="Completed">Completed</h1>
                </div>
                <div className="pink">
                    <div className="pinkcolor"></div>
                    <h1 className="Completed">Incompleted</h1>
                </div>
            </div>
        </div>

        <div className="Line">
            <div className="line"></div>
        </div>

        <div className="home">
            <div className="homework">
                <h1>Home work</h1>
            </div>
            <div className="boxes">
                <div className="box1">
                    <h1>English</h1>
                    <h2>Essay about Cherry</h2>
                    <div className="buton">
                        <div className="view">
                            <span>VIEW</span>
                        </div>
                        <h1>50 Submitted</h1>
                    </div>
                </div>
                <div className="box1">
                    <h1>English</h1>
                    <h2>Essay about Cherry</h2>
                    <div className="buton">
                        <div className="view">
                            <span>VIEW</span>
                        </div>
                        <h1>50 Submitted</h1>
                    </div>
                </div>
            </div>
        </div>

        <div className="Line">
        <div className="line"></div>
        </div>

    </div>      
  );
}

export default Evaluated;
