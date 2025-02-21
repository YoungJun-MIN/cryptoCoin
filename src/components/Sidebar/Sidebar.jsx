import styles from "@components/Sidebar/Sidebar.module.css"
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
export default function Sidebar() {
  return(
    <>
      <nav className="dashboard__nav">
        <ul className={`${styles.ul} dashboard__nav-list`}>
          <li className="dashboard__nav-item">
            <Link className="dashboard__nav-link" to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/profile">profile</Link>
          </li>
          <li>
            <Link to="/trade">Trade</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}