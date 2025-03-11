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
import { Practice } from "./components/practice/practice";
import { UseOptimisticHook } from "./components/react19-concepts/useOptimistic";
import { UseFormStatusHook } from "./components/react19-concepts/useFormStatus";
import { UseAPI } from "./components/react19-concepts/use";
import SearchProject from "./components/search-input-project/project-main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/hooks/useTransition"
              element={<UseTransitionLinks />}
            />
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
            <Route
              path="/hooks/useOptimistic"
              element={<UseOptimisticHook />}
            />
            <Route
              path="/hooks/useOptimistic"
              element={<UseOptimisticHook />}
            />
            <Route
              path="/hooks/useFormStatus"
              element={<UseFormStatusHook />}
            />
            <Route path="/API/use" element={<UseAPI />} />
            <Route path="/practice" element={<Practice />} />
            <Route
              path="/projects/search-input-project"
              element={<SearchProject />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
