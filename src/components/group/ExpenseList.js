import { useState } from 'react';

function ExpenseList({ expenses, setExpenses }) {
    const [editableIndex, setEditableIndex] = useState(null);
    const [editedExpense, setEditedExpense] = useState({ description: '', amount: '' });

    const handleEdit = (index) => {
        setEditableIndex(index);
        setEditedExpense(expenses[index]);
    };

    const handleSave = () => {
        const updatedExpenses = [...expenses];
        updatedExpenses[editableIndex] = editedExpense;
        setExpenses(updatedExpenses);
        localStorage.setItem('groups', JSON.stringify(updatedExpenses)); // Ensure you update local storage with new expenses
        setEditableIndex(null);
        setEditedExpense({ description: '', amount: '' });
    };

    return (
        <div style={{ padding: '20px' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {expenses.map((expense, index) => (
                    <li key={index} style={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}>
                        {editableIndex === index ? (
                            <div>
                                <input
                                    type="text"
                                    value={editedExpense.description}
                                    onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })}
                                    style={{ margin: '10px 0', padding: '10px', width: '100%' }}
                                />
                                <input
                                    type="number"
                                    value={editedExpense.amount}
                                    onChange={(e) => setEditedExpense({ ...editedExpense, amount: e.target.value })}
                                    style={{ margin: '10px 0', padding: '10px', width: '100%' }}
                                />
                                <button style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={handleSave}>
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>{expense.description}: ₹{expense.amount}</span>
                                <button style={{ padding: '5px 10px', backgroundColor: '#008CBA', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={() => handleEdit(index)}>
                                    Edit
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExpenseList;
