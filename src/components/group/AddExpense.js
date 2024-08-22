import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddExpense({ groups, setGroups }) {
    const { groupId } = useParams();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
        setGroups(storedGroups);
    }, [setGroups]);

    const handleAddExpense = () => {
        const updatedGroups = groups.map((group, index) => {
            if (index === parseInt(groupId)) {
                return {
                    ...group,
                    expenses: [...group.expenses, { description, amount: parseFloat(amount) }],
                };
            }
            return group;
        });
        setGroups(updatedGroups);
        localStorage.setItem('groups', JSON.stringify(updatedGroups));
        navigate(`/group/${groupId}`);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Add Expense</h2>
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%' }}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%' }}
            />
            <button style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={handleAddExpense}>
                Add Expense
            </button>
        </div>
    );
}

export default AddExpense;
