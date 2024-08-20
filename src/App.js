import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './pages/Dashboard';
import AddGroup from './components/group/AddGroup';
import AddExpense from './components/group/AddExpense';
import GroupDetails from './pages/GroupDetails';
import SplitBill from './pages/SplitBill';
import NotFound from './pages/NotFound';

function App() {
    const [user, setUser] = useState(null);
    const [groups, setGroups] = useState([]);

    return (
        <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={user ? <Dashboard groups={groups} setUser={setUser} /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/signup" 
                    element={<Signup setUser={setUser} />} 
                />
                <Route 
                    path="/login" 
                    element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} 
                />
                <Route 
                    path="/dashboard" 
                    element={user ? <Dashboard groups={groups} setUser={setUser} /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/add-group" 
                    element={user ? <AddGroup groups={groups} setGroups={setGroups} /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/add-expense/:groupId" 
                    element={user ? <AddExpense groups={groups} setGroups={setGroups} /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/group/:groupId" 
                    element={user ? <GroupDetails groups={groups} setGroups={setGroups} /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/split-bill/:groupId" 
                    element={user ? <SplitBill groups={groups} /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="*" 
                    element={<NotFound />} 
                />
            </Routes>
        </Router>
    );
}

export default App;
