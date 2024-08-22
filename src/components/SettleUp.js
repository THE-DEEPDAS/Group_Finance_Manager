import React from 'react';

function SettleUp({ expenses, members }) {
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const amountPerPerson = totalAmount / members.length;

    const containerStyle = {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const headerStyle = {
        color: '#343a40',
        textAlign: 'center',
        marginBottom: '20px',
    };

    const listStyle = {
        listStyleType: 'none',
        padding: 0,
    };

    const listItemStyle = {
        backgroundColor: '#ffffff',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        padding: '10px',
        marginBottom: '10px',
        textAlign: 'center',
    };

    return (
        <div style={containerStyle}>
            <h3 style={headerStyle}>Settle Up</h3>
            <ul style={listStyle}>
                {members.map((member, index) => (
                    <li key={index} style={listItemStyle}>
                        {member} owes ${amountPerPerson.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SettleUp;
