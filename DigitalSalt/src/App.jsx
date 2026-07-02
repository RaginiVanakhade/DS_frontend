
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import Login from "./auth/Login"
import Register from "./auth/Register"

function App() {
  return (
    <>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={"about"} />
        <Route path="/contact" element={"contact"} />
      </Routes>
    </>
  )
}

export default App
