import './App.css'
import Main from "./Main";
import Checkout from "./Checkout";
import OrderSummary from "./OrderSummary";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

    return (
        <Router basename={window.location.pathname || ''}>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path='/order-summary' element={<OrderSummary />} />
            </Routes>
        </Router>)
}

export default App;
