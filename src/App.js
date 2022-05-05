import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Lobby from "./components/Lobby";
import LoginForm from "./components/LoginForm";
import UserContext from "./UserContext";

function App() {
  const [userData, setuserData] = useState("");

  return (
    <UserContext.Provider value={userData}>
      <Router>
        <div className="App">
          <Routes>
              <Route path="/" exact element={<LoginForm updatauserData={setuserData}/>} />
              <Route path="/lobby" exact element={<Lobby />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
