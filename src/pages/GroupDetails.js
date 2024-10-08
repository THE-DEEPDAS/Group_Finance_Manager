import { useState } from 'react';
import './GroupDetails.css';
import { useParams } from 'react-router-dom';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

function GroupDetails({ groups, setGroups }) {
    const { groupId } = useParams();
    const id = parseInt(groupId, 10);
    const group = groups[id]; 

    const [newExpense, setNewExpense] = useState({ description: '', amount: 0, payer: '', splitType: 'equal', splitDetails: {} });
    const [membersToAdd, setMembersToAdd] = useState('');
    const [expenseToEdit, setExpenseToEdit] = useState(null);

    if (!group) {
        return <div>Group not found!</div>;
    }

    const handleAddExpense = (type) => {
        const updatedGroups = [...groups];
        const expense = {
            id: Date.now(),
            ...newExpense,
            type: type,
            amount: type === 'spend' ? -Math.abs(newExpense.amount) : Math.abs(newExpense.amount)
        };
        updatedGroups[id].expenses.push(expense);
        setGroups(updatedGroups);
        setNewExpense({ description: '', amount: 0, type: '' });
    };

    const handleAddMember = () => {
        const updatedGroups = [...groups];
        updatedGroups[id].members.push(membersToAdd);
        setGroups(updatedGroups);
        setMembersToAdd('');
    };

    const handleEditExpense = (expense) => {
        setExpenseToEdit(expense);
    };

    const handleSaveExpense = (updatedExpense) => {
        const updatedGroups = [...groups];
        updatedGroups[id].expenses = updatedGroups[id].expenses.map(exp =>
            exp.id === updatedExpense.id ? updatedExpense : exp
        );
        setGroups(updatedGroups);
        setExpenseToEdit(null);
    };

    const handleDeleteExpense = (expenseId) => {
        const updatedGroups = [...groups];
        updatedGroups[id].expenses = updatedGroups[id].expenses.filter(exp => exp.id !== expenseId);
        setGroups(updatedGroups);
        setExpenseToEdit(null);
    };

    const handleMarkAsPaid = (expenseId) => {
        const updatedGroups = [...groups];
        updatedGroups[id].expenses = updatedGroups[id].expenses.map(exp =>
            exp.id === expenseId ? { ...exp, paid: true } : exp
        );
        setGroups(updatedGroups);
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
        labels: group.expenses.map(exp => exp.description || new Date(exp.id).toLocaleDateString()),
        datasets: [{
            label: 'Transaction Amounts',
            data: group.expenses.map(exp => exp.amount),
            backgroundColor: exp => exp.type === 'gain' ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)',
            borderColor: exp => exp.type === 'gain' ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    const dataForSpendingTrends = {
        labels: group.expenses.map(exp => new Date(exp.id).toLocaleDateString()),
        datasets: [{
            label: 'Spending Over Time',
            data: group.expenses.map(exp => exp.amount),
            fill: false,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)'
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: 'black'
                }
            },
            title: {
                display: true,
                text: 'Transaction Amounts',
                color: 'black'
            }
        },
        scales: {
            x: {
                ticks: { color: 'black' },
                grid: { color: 'rgba(0, 0, 0, 0.1)' }
            },
            y: {
                ticks: { color: 'black' },
                grid: { color: 'rgba(0, 0, 0, 0.1)' }
            }
        }
    };

    return (
        <div className='gd-container'>
            <h2 className='gd-heading'>{group.name}</h2>
            <h3 className='gd-subheading'>Members</h3>
            <ul className='gd-list'>
                {group.members.map((member, index) => (
                    <li key={index} className='gd-list-item'>{member}</li>
                ))}
            </ul>
            <input
                className='gd-input'
                type="text"
                placeholder="Add new member"
                value={membersToAdd}
                onChange={(e) => setMembersToAdd(e.target.value)}
            />
            <button className="gd-button" onClick={handleAddMember}>Add Member</button>
            <h3 className='gd-subheading'>Add New Expense</h3>
            <input
                className='gd-input'
                type="text"
                placeholder="Description"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            />
            <input
                className='gd-input'
                type="number"
                placeholder="Amount (₹)"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })}
            />
            <select
                className='gd-select'
                value={newExpense.payer}
                onChange={(e) => setNewExpense({ ...newExpense, payer: e.target.value })}
            >
                <option value="">Select Payer</option>
                {group.members.map(member => (
                    <option key={member} value={member}>{member}</option>
                ))}
            </select>
            <select
                className='gd-select'
                value={newExpense.splitType}
                onChange={(e) => setNewExpense({ ...newExpense, splitType: e.target.value })}
            >
                <option value="equal">Split Equally</option>
                <option value="unequal">Split Unequally</option>
            </select>
            {newExpense.splitType === 'unequal' && (
                <div>
                    {group.members.map(member => (
                        <div key={member}>
                            <label>{member}</label>
                            <input
                                className='gd-input'
                                type="number"
                                placeholder="Amount (₹)"
                                value={newExpense.splitDetails[member] || ''}
                                onChange={(e) => setNewExpense({
                                    ...newExpense,
                                    splitDetails: {
                                        ...newExpense.splitDetails,
                                        [member]: parseFloat(e.target.value) || 0
                                    }
                                })}
                            />
                        </div>
                    ))}
                </div>
            )}
            <button className="gd-button" onClick={handleAddExpense}>Add Expense</button>
            <h3 className='gd-subheading'>Expenses</h3>
            <ul className='gd-list'>
                {group.expenses.map((expense) => (
                    <li key={expense.id} className='gd-list-item'>
                        {expense.description}: ₹{expense.amount} (Paid by: {expense.payer})
                        {!expense.paid && (
                            <>
                                <button className="gd-button" onClick={() => handleEditExpense(expense)}>Edit</button>
                                <button className="gd-button" onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                                <button className="gd-button" onClick={() => handleMarkAsPaid(expense.id)}>Mark as Paid</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            {expenseToEdit && (
                <EditExpenseForm
                    expense={expenseToEdit}
                    onSave={handleSaveExpense}
                    onCancel={() => setExpenseToEdit(null)}
                />
            )}
            <h3 className='gd-subheading'>Charts</h3>
            <div className='gd-chart-container'>
                <h4 className='gd-chart-title'>Individual Spending</h4>
                <Bar data={dataForIndividualSpending} options={chartOptions} />
            </div>
            <div className='gd-chart-container'>
                <h4 className='gd-chart-title'>Group Spending Distribution</h4>
                <Pie data={dataForGroupSpending} options={chartOptions} />
            </div>
            <div className='gd-chart-container'>
                <h4 className='gd-chart-title'>Spending Trends</h4>
                <Line data={dataForSpendingTrends} options={chartOptions} />
            </div>
        </div>
    );
}

function EditExpenseForm({ expense, onSave, onCancel }) {
    const [description, setDescription] = useState(expense.description);
    const [amount, setAmount] = useState(expense.amount);

    const handleSave = () => {
        onSave({ ...expense, description, amount });
    };

    return (
        <div className="edit-expense-form">
            <h3>Edit Expense</h3>
            <input
                className='gd-input'
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                className='gd-input'
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button className="gd-button" onClick={handleSave}>Save</button>
            <button className="gd-button" onClick={onCancel}>Cancel</button>
        </div>
    );
}

export default GroupDetails;