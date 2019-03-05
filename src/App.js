import React, { Component } from 'react';
import './App.css';
import InputsListener from 'InputsListener';
import Game from 'Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Tetris React</p>
          <InputsListener>
            <Game />
          </InputsListener>
        </header>
      </div>
    );
  }
}

export default App;
