import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import "./hompage.css";

function HomePage() {
  return (
    <div className="homepage-root">
      <div className="homepage-center">
        <SearchBar></SearchBar>
      </div>
    </div>
  );
}

export default HomePage;
