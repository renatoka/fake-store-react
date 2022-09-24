import './App.css'
import {  useState} from "react";
import Main from "./Main";
import Checkout from "./Checkout";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
            </Routes>
        </Router>)
}

export default App;
