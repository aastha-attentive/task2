import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeletedTasks from "./Components/DeletedTasks/DeletedTasks";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deletedtasks" element={<DeletedTasks />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
