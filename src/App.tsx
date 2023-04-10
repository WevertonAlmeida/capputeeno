import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Content from './pages/Content';
import "@fontsource/saira-stencil-one";
import "@fontsource/saira";

function App() {
  return (
    <div className="App">   
      <Content />
    </div>
  );
}

export default App;
