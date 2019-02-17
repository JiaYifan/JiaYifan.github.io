import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';

class App extends Component {
  componentWillMount(){
      console.log('componentWillMount')
  }
  render() {
    console.log('render')
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
  componentDidMount(){
    console.log('componentDidMount')
  }
  componentWillUpdate(){
      console.log('componentWillUpdate')
  }
  componentDidUpdate(){
      console.log('componentDidUpdate')
  }
  componentWillUnmount(){
      console.log('componentWillUnmount')
  }
}

export default App;
