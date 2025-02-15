import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import UseTransition from "./components/react19-concepts/UseTransition";
import UseContextHook from "./components/hooks/useContext";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn-react-19" element={<About />} />
        <Route
          path="/learn-react-19/useTransition"
          element={<UseTransition />}
        />
        <Route path="/react/hooks/useContext" element={<UseContextHook />} />
      </Routes>
    </Router>
  );
};

export default App;
