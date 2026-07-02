
import './App.css'
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
        <Routes>
        <Route path="/" element={"home"} />
        <Route path="/about" element={"about"} />
        <Route path="/contact" element={"contact"} />
      </Routes>
    </>
  )
}

export default App
