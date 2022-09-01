import { Routes, Route } from "react-router-dom"
import { useNavigate } from "react-router-dom";

import LoginForm from "./LoginForm"
import MainPage from "./MainPage"
import Navbar from './Navbar';

function App(props) {
    const navigate = useNavigate();

    const path = window.location.pathname;

    return (
        <div>
            <Navbar showButtons={path == '/login' ? false : true} />
            <div className="app">        
            <Routes>
                <Route path="/login" element={<LoginForm navigate={navigate}  /> } />
                <Route path="/certificates" element={<MainPage /> }  />
            </Routes>
            </div>
        </div>
    )
}

export default App