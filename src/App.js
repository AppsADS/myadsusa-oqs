import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StageList from './components/StageList.js'; // Assuming you have StageList component
import DealDetail from './components/DealDetail.js'; // Assuming this component shows a deal's detail
import DealPage from './components/DealPage.js';
import './components/styles/style.css'; // Adjust the path if necessary
import './components/styles/DealPage.css';
import './components/styles/DealDetail.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Route for the stage list where the deals are shown */}
                    <Route path="/" element={<StageList />} />

                    {/* Route for the deal detail page */}
                    <Route path="/deal/:id" element={<DealDetail />} />

                    <Route path="/deal/:id" component={DealPage} />

                    <Route path="/deal/:id" component={DealDetail} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
