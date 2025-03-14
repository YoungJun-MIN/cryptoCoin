import styles from "@components/Sidebar/Sidebar.module.css"
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
export default function Sidebar() {
  return(
    <>
      <nav className={`${styles.dashboard__nav} dashboard__nav`}>
        <ul className={`${styles.ul} dashboard__nav-list`}>
          <li className="dashboard__nav-item">
            <Link className={`${styles.dashboard__navLink} a-reset dashboard__nav-link`} to="/">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}