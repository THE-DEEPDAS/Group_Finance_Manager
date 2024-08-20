import { Link, useNavigate } from 'react-router-dom';

function Dashboard({ groups, setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user state
        setUser(null);
        // Redirect to login page
        navigate('/');
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <Link to="/add-group">Create New Group</Link>
            <h3>Groups</h3>
            {groups.length === 0 ? (
                <p>No groups available. Create a new group!</p>
            ) : (
                <ul>
                    {groups.map((group, index) => (
                        <li key={index}>
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
