import React from 'react';
import { render } from 'react-dom'
import './index.css';
import ClassPage from './components/classPage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

const root = document.getElementById("root");

render(
  <BrowserRouter basename='/'>
     <Routes>
      <Route path="/" element={<ClassPage />} />
    </Routes>
  </BrowserRouter>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
