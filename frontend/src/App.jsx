import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import TaskContainer from "./components/TaskContainer";
import Register from "./components/Register";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/profile" element={<TaskContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
