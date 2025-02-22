import Header from "@components/Header/Header"
import Sidebar from "@components/Sidebar/Sidebar"
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "@components/Main/Dashboard";
import Profile from "@components/Main/Profile";
import Trade from "@components/Main/Trade";

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <div className="dashboard">
          <Sidebar></Sidebar>
          <main className="dashboard__main">
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/trade" element={<Trade />}></Route>
            </Routes>
            {/* <div className="dashboard__content"></div>
            <div className="dashboard__content"></div> */}
          </main>
        </div>
      </Router>    
    </>
  )
}

export default App