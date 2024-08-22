import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './addgroup.css'

function AddExpense({ groups, setGroups }) {
    const { groupId } = useParams();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

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
        navigate(`/group/${groupId}`);
    };

    return (
        <div>
            <h2>Add Expense</h2>
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleAddExpense}>Add Expense</button>
        </div>
    );
}

export default AddExpense;
