import React from 'react';
import { render } from 'react-dom'
import './index.css';
import ClassPage from './components/classPage';
import HomePage from './components/HomePage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

const root = document.getElementById("root");

//BrowserRouter lets you create URL Paths 
//Basename '/' means that the default path (homepage) is '/'
//With a <Route/> component we specify which route 
//will draw what component
//The /course/:course path is handled similar to 
//the Node server endpoints where it will catch all
//paths like '/course/ANYTHING'

render(
  <BrowserRouter basename='/'>
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Course/:subjectCode/:courseNumber" element={<ClassPage />} />
    </Routes>
  </BrowserRouter>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
