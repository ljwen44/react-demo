import React, { Component } from 'react';
import './App.css';
import Header from '../Header'
import OrderList from '../OrderList'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <OrderList />
      </div>
    )
  }
}

export default App;
