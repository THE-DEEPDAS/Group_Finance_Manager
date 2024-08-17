// src/components/SettleUp.js
function SettleUp({ expenses, members }) {
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const amountPerPerson = totalAmount / members.length;

    return (
        <div>
            <h3>Settle Up</h3>
            <ul>
                {members.map((member, index) => (
                    <li key={index}>
                        {member} owes ${amountPerPerson.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SettleUp;
