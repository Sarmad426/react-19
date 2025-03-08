import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { UseTransitionTabs } from "./components/react19-concepts/UseTransitionTabs";
import UseContextExample from "./components/hooks/useContext";
import NotFound from "./components/404/NotFound";
import Navbar from "./components/navbar";
import UseRefExample from "./components/hooks/useRef";
import { UseTransitionLinks } from "./components/react19-concepts/useTransitionLinks";
import { UseTransitionForm } from "./components/react19-concepts/useTransitionForm";
import { UseActionState } from "./components/react19-concepts/useActionState";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hooks/useTransition" element={<UseTransitionLinks />} />
          <Route
            path="/hooks/useTransition/tabs"
            element={<UseTransitionTabs />}
          />
          <Route
            path="/hooks/useTransition/form"
            element={<UseTransitionForm />}
          />
          <Route path="/hooks/useContext" element={<UseContextExample />} />
          <Route path="/hooks/useRef" element={<UseRefExample />} />
          <Route path="/hooks/useActionState" element={<UseActionState />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
