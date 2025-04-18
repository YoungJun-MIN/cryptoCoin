import Header from "@components/Header/Header"
import Sidebar from "@components/Sidebar/Sidebar"
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "@components/Main/Dashboard";
import { initializeCoinData } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux"
import Crypto from "@api/crypto";
import testData from "@api/testData";
import { useError } from "@/context/ErrorContext";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";
import useDeviceType from "@hooks/useDeviceType";

function App() {
  const [loading, setLoading] = useState(true);
  const { updateError } = useError();
  const dashboardRef = useRef();
  const dispatch = useDispatch();
  const deviceType = useDeviceType();
  useEffect(() => {
    const loadCoinData = async() => {
      const crypto = new Crypto(updateError);
      const data = await crypto.fetchInitialData();
      dispatch(initializeCoinData(data));
      setLoading(false);
    }
    loadCoinData();
  }, [])
  if(loading) return <LoadingSpinner />
  return (
    <>
      <Router>
        <Header></Header>
        <div className="dashboard" ref={dashboardRef}>
          {(deviceType === `desktop`) && <Sidebar></Sidebar>}
          <main className="dashboard__main">
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
            </Routes>
          </main>
        </div>
      </Router>    
    </>
  )
}

export default App