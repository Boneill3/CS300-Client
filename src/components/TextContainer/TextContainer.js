import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import offlineIcon from '../../icons/offlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ onlineStudents, offlineStudents }) => (
  <div className="textContainer">
    <div>
      <h1>Students:</h1>
      <div className="activeContainer">
        <h2>
          {onlineStudents ? onlineStudents.map(({ name }) => (
            <div key={name} className="activeItem">
              {name}
              <img alt="Online Icon" src={onlineIcon} />
            </div>
          )) : null}
          {offlineStudents ? offlineStudents.map(({ name }) => (
            <div key={name} className="activeItem">
              {name}
              <img alt="Offline Icon" src={offlineIcon} />
            </div>
          )): null}
        </h2>
      </div>
    </div>
  </div>
);

export default TextContainer;