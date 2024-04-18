
import React, {useState} from 'react';
import './Homework.css';

import Pending  from './Pending';
import Submitted from './Submitted';
import Evaluated from './Evaluated';

const Homework = () => {
    const [activeTab, setActiveTab] = useState('Pending');
    const handleTabChange = (tabName) => {
      setActiveTab(tabName);
    }
  return (
    <div className="container">
    <div  className="container1">
        <div className="textimg">
            <h1 className="text">Your Homework<br></br>is here!</h1>
            <div className="img"></div>
        </div>
    </div>
    <div className="but1">
        <div className="buttons1">
            <div>
            <span className={activeTab === 'Pending' ? 'active pending' : 'hoverButton'} onClick={() => handleTabChange('Pending')}>Pending</span>
            </div>
            <div>
            <span className={activeTab === 'Submitted' ? 'active submitted' : 'hoverButton'} onClick={() => handleTabChange('Submitted')}>Submitted</span>
            </div>
            <div>
            <span className={activeTab === 'Evaluated' ? 'active evaluated' : 'hoverButton'} onClick={() => handleTabChange('Evaluated')}>Evaluated</span>
            </div>
        </div>
    </div>
    {activeTab === 'Pending' && <Pending />}
    {activeTab === 'Submitted' && <Submitted />}
    {activeTab === 'Evaluated' && <Evaluated />}
    </div>    
  )
}

export default Homework
