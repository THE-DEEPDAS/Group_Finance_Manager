import { Link } from 'react-router-dom';

function Dashboard({ groups }) {
    return (
        <div>
            <h2>Dashboard</h2>
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
                                        {expense.description}: ${expense.amount}
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
