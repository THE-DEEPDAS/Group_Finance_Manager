import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css';

function Dashboard({ user, setUser, groups, setGroups }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        setGroups([]);
        localStorage.removeItem('groups');
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <div className='dashboard-content'>
                <div id='dashboard-heading'> <h2>Dashboard</h2></div>
                
                <Link to="/add-group" id='create-newgrp'>Create New Group</Link>
                <h3 style={{color:"white",marginBottom:"1px"}}> Your Groups</h3>
                {groups.length === 0 ? (
                    <p style={{textAlign:'center',color:'white'}}>No groups available. Create a new group!</p>
                ) : (
                    <ul>
                        {groups.map((group, index) => (
                            <li key={index}>
                                <Link to={`/group/${index}`} id='grp-name'>
                                    {group.name}
                                </Link>
                                <ul>
                                    {group.expenses && group.expenses.map((expense, expIndex) => (
                                        <li key={expIndex}>
                                            {expense.description}: ₹{expense.amount.toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
                <button onClick={handleLogout} className='logout-button'>Logout</button>
            </div>
        </div>
    );
}

export default Dashboard;
