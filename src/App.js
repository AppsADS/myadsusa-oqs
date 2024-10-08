import React, {useEffect, useState} from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import StageList from './components/StageList.js'; // Assuming you have StageList component
import DealDetail from './components/DealDetail.js'; // Assuming this component shows a deal's detail
import DealPage from './components/DealPage.js';
import './components/styles/style.css'; // Adjust the path if necessary
import './components/styles/DealPage.css';
import './components/styles/DealDetail.css';
import axios from "axios";

function App() {
    const [data, setData] = useState(null);
    const apiUrl = "https://myadsusa-oqs.herokuapp.com/api/stages";

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("There was an error making the request!", error);
            });
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Route for the stage list where the deals are shown */}
                    <Route path="/" element={<StageList />} />

                    {/* Route for the deal detail page */}
                    <Route path="/deal/:id" element={<DealDetail />} />

                    {/* You can remove these redundant routes */}
                    {/* <Route path="/deal/:id" component={DealPage} /> */}
                    {/* <Route path="/deal/:id" component={DealDetail} /> */}

                </Routes>
            </div>
        </Router>
    );
}

export default App;
