// src/pages/SplitBill.js
import { useState } from 'react';

function SplitBill() {
    const [expenses, setExpenses] = useState([]);
    const [splits, setSplits] = useState([]);

    const handleCalculateSplits = () => {
        // Example calculation, replace with actual logic
        const totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        const numberOfMembers = 2; // Replace with actual number of members
        const amountPerPerson = totalAmount / numberOfMembers;
        setSplits([{ member: 'John', amountOwed: amountPerPerson }, { member: 'Jane', amountOwed: amountPerPerson }]);
    };

    return (
        <div>
            <h2>Split Bill</h2>
            <button onClick={handleCalculateSplits}>Calculate Splits</button>
            <ul>
                {splits.map((split, index) => (
                    <li key={index}>{split.member} owes ${split.amountOwed.toFixed(2)}</li>
                ))}
            </ul>
        </div>
    );
}

export default SplitBill;
