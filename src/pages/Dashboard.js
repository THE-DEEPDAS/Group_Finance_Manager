import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './global.css'; // Import global styles

function Dashboard({ setUser }) {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        try {
            const storedGroups = localStorage.getItem('groups');
            if (storedGroups) {
                const parsedGroups = JSON.parse(storedGroups);
                if (Array.isArray(parsedGroups)) {
                    setGroups(parsedGroups);
                } else {
                    setGroups([]); // Set empty array if data is not in expected format
                }
            } else {
                setGroups([]); // Set empty array if no data found
            }
        } catch (error) {
            console.error('Error parsing groups from localStorage:', error);
            setGroups([]); // Set empty array in case of error
        }
    }, []);
    
    

    const handleLogout = () => {
        // Clear user state
        setUser(null);
        // Redirect to login page
        navigate('/');
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <Link to="/add-group">Create New Group</Link>
            <h3>Groups</h3>
            {groups.length === 0 ? (
                <p>No groups available. Create a new group!</p>
            ) : (
                <ul>
                    {groups.map((group, index) => (
                        <li key={index} className="group-card">
                            <Link to={`/group/${index}`}>
                                {group.name}
                            </Link>
                            <ul>
                                {group.expenses.map((expense, expIndex) => (
                                    <li key={expIndex}>
                                        {expense.description}: ₹{expense.amount.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dashboard;
