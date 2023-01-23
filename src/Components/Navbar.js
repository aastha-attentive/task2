
import {useNavigate} from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
    
      <ul className='header'>
        <li onClick={()=> navigate("/")}>Home</li>
        <li className="delete" onClick={()=> navigate("/deletedtasks")}>Deleted Tasks</li>
        
      </ul>
    </>
    
  )
}

export default Navbar