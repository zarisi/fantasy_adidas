import React from 'react';
import { Teams } from "./components/teams/teams";
import './App.css';
import {PlayerSearch} from "./components/player-search/player-search";
import {YourTeam} from "./components/your-team/your-team";

function App() {

  return (
    <div className="App">

      <div className='panel'>
        <span className='panel__title'>Your Players</span>
        <YourTeam/>
      </div>
      <div className='panel'>
          <span className='panel__title'>Country</span>
        <Teams/>
          <span className='panel__title'>Players</span>
        <PlayerSearch/>
      </div>
    </div>
  );
}

export default App;
