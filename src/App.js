import React, { Component } from 'react';
import './App.css';
import InputsListener from 'InputsListener';
import TetrominosProvider from 'TetrominosProvider';
import Game from 'Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TetrominosProvider>
            <InputsListener>
              <Game />
            </InputsListener>
          </TetrominosProvider>
        </header>
      </div>
    );
  }
}

export default App;
