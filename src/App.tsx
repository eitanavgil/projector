import React from "react";
import "./App.css";
import Projector from "../src/components/Projector";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Projector></Projector>
      </header>
    </div>
  );
};

export default App;
