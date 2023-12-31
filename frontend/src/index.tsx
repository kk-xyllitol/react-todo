import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './css/index.css';
import Routeing from './Routing';
import Headers from './App/Header';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Headers />
    <Routeing />
  </BrowserRouter>
);

reportWebVitals();
