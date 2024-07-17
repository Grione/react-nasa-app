import { Outlet } from "react-router-dom";
import Header from "../components/header/Header"

const Root = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Root;