import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavPages from "../navPages/NavPages";
import Main from "../main/Main";

import "./app.css";
const App = () => {

    return ( <BrowserRouter>
                <div className="app">
                <div className="nav_content">
                <NavPages />    
                </div>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/unsplash" element={<Main selectedPage="Unsplash" />} />
                    <Route path="/weather" element={<Main selectedPage="Weather" />} />
                </Routes>
                </div>
             </BrowserRouter>)
}
export default App;
