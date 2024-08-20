import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = () => {
        if (email && password && password === confirmPassword) {
            // Simulate signup by saving to localStorage
            localStorage.setItem('user', JSON.stringify({ email, password }));
            setUser({ email });
            setMessage('Signup successful!');
            // Optionally, you can redirect after a short delay
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setMessage('Passwords do not match or fields are empty.');
        }
    };

    return (
        <div className="auth-form">
            <h2>Sign Up</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Sign Up</button>
            {message && <p>{message}</p>}
            <p>Already have an account? <button onClick={() => navigate('/login')}>Login</button></p>
        </div>
    );
}

export default Signup;
