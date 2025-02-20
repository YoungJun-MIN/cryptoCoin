import Header from "@components/Header/Header"
import Sidebar from "@components/Sidebar/Sidebar"
function App() {
  return (
    <>
      <Header></Header>
      <div className="dashboard">
        <Sidebar></Sidebar>
        <main className="dashboard__main">
          <div className="dashboard__content"></div>
          <div className="dashboard__content"></div>
        </main>
      </div>
    </>
  )
}

export default App