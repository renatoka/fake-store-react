import './App.css'
import Main from "./Main";
import Login from "./Login";
import OrderSummary from "./OrderSummary";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

    return (
        <Router basename={window.location.pathname || ''}>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path='/order-summary' element={<OrderSummary />} />
            </Routes>
        </Router>)
}

export default App;
