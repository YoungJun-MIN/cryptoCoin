import Header from "@components/Header/Header"
import Sidebar from "@components/Sidebar/Sidebar"
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "@components/Main/Dashboard";
import Profile from "@components/Main/Profile";
import Trade from "@components/Main/Trade";
import { initializeCoinData } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import Crypto from "@api/crypto";
import testData from "@api/testData";
import { useError } from "@/context/ErrorContext";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";

LoadingSpinner
function App() {
  const [loading, setLoading] = useState(true);
  const { errorMessage, updateError } = useError();
  const dispatch = useDispatch();
  console.log(`@@@@@@App리렌더`);
  useEffect(() => {
    const loadCoinData = async() => {
      const crypto = new Crypto(updateError);
      const data = await crypto.fetchInitialData();
      console.log(data);
      dispatch(initializeCoinData(data));
      setLoading(false);
    }
    // loadCoinData();
    console.log(testData);
    dispatch(initializeCoinData({...testData, 'age': 10}));
    setLoading(false);
  }, [])
  if(loading) return <LoadingSpinner />
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
          </main>
        </div>
      </Router>    
    </>
  )
}

export default App