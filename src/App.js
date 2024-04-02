import React, { useState, useCallback, useEffect } from 'react';
import './App.css';

// Drum pad data containing key, audio URL, and display text
const drumPadsData = [
  { key: 'Q', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', display: 'Heater 1' },
  { key: 'W', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', display: 'Heater 2' },
  { key: 'E', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', display: 'Heater 3' },
  { key: 'A', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', display: 'Heater 4' },
  { key: 'S', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', display: 'Heater 6' },
  { key: 'D', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', display: 'Dsc Oh' },
  { key: 'Z', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', display: 'Kick n Hat' },
  { key: 'X', audio: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', display: 'RP4 Kick' },
  { key: 'C', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', display: 'Cev H2' }
];

const DrumPad = ({ padData, onClick }) => {
  const { key, audio, display } = padData;

  const handlePadClick = useCallback(() => {
    const audioElement = document.getElementById(key);
    audioElement.currentTime = 0;
    audioElement.play();
    onClick(display);
  }, [key, display, onClick]);

  // Add event listener to trigger audio when key is pressed
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toUpperCase() === key) {
        handlePadClick();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [key, handlePadClick]);

  return (
    <div className="drum-pad" onClick={handlePadClick}>
      {key}
      <audio className="clip" id={key} src={audio}></audio>
    </div>
  );
};

const DrumMachine = () => {
  const [display, setDisplay] = useState('');

  const handleDisplay = (text) => {
    setDisplay(text);
  };

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div className="drum-pads">
        {drumPadsData.map((padData, index) => (
          <DrumPad key={padData.key} padData={padData} onClick={handleDisplay} id={`drum-pad-${index}`} />
        ))}
      </div>
    </div>
  );
};


export default DrumMachine;
