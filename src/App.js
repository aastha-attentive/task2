
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeletedTasks from './components/DeletedTasks';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes> 
          <Route exact path="/" element={<Home  />}/>
          <Route path="/deletedtasks" element={<DeletedTasks/>}/>   
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
