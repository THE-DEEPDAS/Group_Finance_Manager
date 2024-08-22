import { useState, useEffect } from 'react';
import './GroupDetails.css';
import { useParams } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

function GroupDetails({ groups, setGroups }) {
    const { groupId } = useParams();
    const id = parseInt(groupId, 10);
    const [group, setGroup] = useState(null);
    const [newExpense, setNewExpense] = useState({ description: '', amount: 0, payer: '', splitType: 'equal', splitDetails: {} });
    const [membersToAdd, setMembersToAdd] = useState('');
    const [expenseToEdit, setExpenseToEdit] = useState(null);

    // Load groups from local storage and initialize state
    useEffect(() => {
        const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
        setGroups(storedGroups);
        setGroup(storedGroups[id] || null);
    }, [id, setGroups]);

    // Update local storage when group changes
    useEffect(() => {
        if (group) {
            const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
            storedGroups[id] = group;
            localStorage.setItem('groups', JSON.stringify(storedGroups));
        }
    }, [group, id]);

    if (!group) {
        return <div>Group not found!</div>;
    }

    const handleAddExpense = () => {
        if (newExpense.splitType === 'unequal') {
            const totalSplit = Object.values(newExpense.splitDetails).reduce((total, amount) => total + amount, 0);
            if (totalSplit !== newExpense.amount) {
                alert('Total of unequal splits must equal the expense amount.');
                return;
            }
        }

        const updatedGroup = { ...group };
        const expense = {
            id: Date.now(),
            ...newExpense,
            paid: false
        };
        updatedGroup.expenses.push(expense);
        setGroup(updatedGroup);
        setNewExpense({ description: '', amount: 0, payer: '', splitType: 'equal', splitDetails: {} });
    };

    const handleAddMember = () => {
        if (membersToAdd.trim() === '') return;
        const updatedGroup = { ...group };
        if (!updatedGroup.members.includes(membersToAdd)) {
            updatedGroup.members.push(membersToAdd);
            setGroup(updatedGroup);
        }
        setMembersToAdd('');
    };

    const handleEditExpense = (expense) => {
        setExpenseToEdit(expense);
    };

    const handleSaveExpense = (updatedExpense) => {
        const updatedGroup = { ...group };
        updatedGroup.expenses = updatedGroup.expenses.map(exp =>
            exp.id === updatedExpense.id ? updatedExpense : exp
        );
        setGroup(updatedGroup);
        setExpenseToEdit(null);
    };

    const handleDeleteExpense = (expenseId) => {
        const updatedGroup = { ...group };
        updatedGroup.expenses = updatedGroup.expenses.filter(exp => exp.id !== expenseId);
        setGroup(updatedGroup);
        setExpenseToEdit(null);
    };

    const handleMarkAsPaid = (expenseId) => {
        const updatedGroup = { ...group };
        updatedGroup.expenses = updatedGroup.expenses.map(exp =>
            exp.id === expenseId ? { ...exp, paid: true } : exp
        );
        setGroup(updatedGroup);
    };

    const totalExpenses = group.expenses.reduce((total, expense) => total + expense.amount, 0);
    const individualSpending = group.members.reduce((acc, member) => {
        acc[member] = group.expenses.reduce((total, expense) => {
            if (!expense.paid) {
                if (expense.splitType === 'equal') {
                    return total + (expense.amount / group.members.length);
                } else if (expense.splitDetails[member]) {
                    return total + expense.splitDetails[member];
                }
            }
            return total;
        }, 0);
        return acc;
    }, {});

    const dataForIndividualSpending = {
        labels: Object.keys(individualSpending),
        datasets: [{
            label: 'Individual Spending',
            data: Object.values(individualSpending),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const dataForGroupSpending = {
        labels: group.expenses.map(exp => exp.description),
        datasets: [{
            label: 'Group Spending',
            data: group.expenses.map(exp => exp.amount),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    };

    return (
        <div>
            <h1>{group.name}</h1>
            <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
            <h3>Individual Spending</h3>
            <Bar data={dataForIndividualSpending} />
            <h3>Group Spending</h3>
            <Pie data={dataForGroupSpending} />
            <h3>Add Expense</h3>
            <input
                type="text"
                placeholder="Description"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            />
            <input
                type="number"
                placeholder="Amount"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })}
            />
            <input
                type="text"
                placeholder="Payer"
                value={newExpense.payer}
                onChange={(e) => setNewExpense({ ...newExpense, payer: e.target.value })}
            />
            <select
                value={newExpense.splitType}
                onChange={(e) => setNewExpense({ ...newExpense, splitType: e.target.value })}
            >
                <option value="equal">Equal</option>
                <option value="unequal">Unequal</option>
            </select>
            {newExpense.splitType === 'unequal' && (
                <div>
                    {group.members.map((member, index) => (
                        <input
                            key={index}
                            type="number"
                            placeholder={`${member}'s Share`}
                            value={newExpense.splitDetails[member] || ''}
                            onChange={(e) => setNewExpense({
                                ...newExpense,
                                splitDetails: { ...newExpense.splitDetails, [member]: parseFloat(e.target.value) }
                            })}
                        />
                    ))}
                </div>
            )}
            <button onClick={handleAddExpense}>Add Expense</button>
            <h3>Add Member</h3>
            <input
                type="text"
                placeholder="New Member"
                value={membersToAdd}
                onChange={(e) => setMembersToAdd(e.target.value)}
            />
            <button onClick={handleAddMember}>Add Member</button>
            {expenseToEdit && (
                <div>
                    <h3>Edit Expense</h3>
                    <input
                        type="text"
                        value={expenseToEdit.description}
                        onChange={(e) => setExpenseToEdit({ ...expenseToEdit, description: e.target.value })}
                    />
                    <input
                        type="number"
                        value={expenseToEdit.amount}
                        onChange={(e) => setExpenseToEdit({ ...expenseToEdit, amount: parseFloat(e.target.value) })}
                    />
                    <button onClick={() => handleSaveExpense(expenseToEdit)}>Save</button>
                    <button onClick={() => handleDeleteExpense(expenseToEdit.id)}>Delete</button>
                </div>
            )}
            <h3>Expenses List</h3>
            <ul>
                {group.expenses.map((expense) => (
                    <li key={expense.id}>
                        {expense.description} - ${expense.amount.toFixed(2)}
                        <button onClick={() => handleEditExpense(expense)}>Edit</button>
                        {!expense.paid && <button onClick={() => handleMarkAsPaid(expense.id)}>Mark as Paid</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GroupDetails;
