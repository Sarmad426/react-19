import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import UseTransition from "./components/react19-concepts/UseTransition";
import UseContextHook from "./components/hooks/useContext";
import NotFound from "./components/404/NotFound";
import Navbar from "./components/navbar";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn-react-19" element={<About />} />
          <Route path="/hooks/useTransition" element={<UseTransition />} />
          <Route path="/hooks/useContext" element={<UseContextHook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
