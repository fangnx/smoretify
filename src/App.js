import React from 'react';
import logo from './logo.svg';
import './App.css';
import CurrentSong from './components/CurrentSong';

function App() {
  return (
    <div className="App">
      {/* <a href="http://localhost:8888">Login to Spotify</a> */}
      <CurrentSong />
    </div>
  );
}

export default App;
