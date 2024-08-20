import { useState } from 'react';

function ExpenseList({ expenses }) {
    const [editableIndex, setEditableIndex] = useState(null);
    const [editedExpense, setEditedExpense] = useState({ description: '', amount: '' });

    const handleEdit = (index) => {
        setEditableIndex(index);
        setEditedExpense(expenses[index]);
    };

    const handleSave = (index) => {
        expenses[index] = editedExpense;
        setEditableIndex(null);
        setEditedExpense({ description: '', amount: '' });
    };

    return (
        <div>
            <ul>
                {expenses.map((expense, index) => (
                    <li key={index}>
                        {editableIndex === index ? (
                            <div>
                                <input
                                    type="text"
                                    value={editedExpense.description}
                                    onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={editedExpense.amount}
                                    onChange={(e) => setEditedExpense({ ...editedExpense, amount: e.target.value })}
                                />
                                <button onClick={() => handleSave(index)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                {expense.description}: ${expense.amount}
                                <button onClick={() => handleEdit(index)}>Edit</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExpenseList;
