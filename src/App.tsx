import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeletedTasks from "./Components/DeletedTasks/DeletedTasks";
import { StyleProvider } from 'elysium-ui';

function App() {
  return (
    <>
    <StyleProvider>
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deletedtasks" element={<DeletedTasks />} />
        </Routes>
      </BrowserRouter>
    </StyleProvider>
    </>
  );
}

export default App;
