import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './global.css'; // Import global styles

function AddGroup() {
    const [groupName, setGroupName] = useState('');
    const [members, setMembers] = useState(['']);
    const navigate = useNavigate();

    const handleAddMember = () => setMembers([...members, '']);
    const handleMemberChange = (index, value) => {
        const updatedMembers = [...members];
        updatedMembers[index] = value;
        setMembers(updatedMembers);
    };

    const handleCreateGroup = () => {
        if (groupName && members.length > 0) {
            const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
            const newGroups = [...storedGroups, { name: groupName, members, expenses: [] }];
            localStorage.setItem('groups', JSON.stringify(newGroups));
            console.log('Saved Groups:', newGroups); // Debugging log
            navigate('/dashboard');
        }
    };
    
    return (
        <div className="form-container">
            <h2>Create New Group</h2>
            <input
                type="text"
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
            />
            {members.map((member, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder={`Member ${index + 1}`}
                    value={member}
                    onChange={(e) => handleMemberChange(index, e.target.value)}
                />
            ))}
            <button onClick={handleAddMember}>Add Member</button>
            <button onClick={handleCreateGroup}>Create Group</button>
        </div>
    );
}

export default AddGroup;
