import React, { Component } from 'react';
import { Dashboard, Widget } from './Dashboard';
import animatecss from 'animate.css';
import './App.css';
import News from './Widget/News';
import './Widget/News.css';

class App extends Component {
  render() {
    return (
        <Dashboard row={4} col={4} gutter={10} animationClassIn='animated zoomIn' animationClassOut='animated zoomOut'>
            <Widget>
                <News ApiKey="8e6c7279e768453d9aee0dfbb8f305b8" Interval="15000" Category="technology" Background="#000" CardBorder="3px solid #000"/>
            </Widget>
            <Widget>
                <News ApiKey="8e6c7279e768453d9aee0dfbb8f305b8" Interval="15000" Category="sports" Background="#00cc00" CardBorder="3px solid #00cc00"/>
            </Widget>
            <Widget>
                <News ApiKey="8e6c7279e768453d9aee0dfbb8f305b8" Interval="15000" Category="business" Background="#0000ff" CardBorder="3px solid #0000ff"/>
            </Widget>
        </Dashboard>
    );
  }
}

export default App;