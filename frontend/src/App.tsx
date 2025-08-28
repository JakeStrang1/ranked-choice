import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home'
import HealthCheck from './HealthCheck'

function App() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to={'/home'} replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/health" element={<HealthCheck />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
