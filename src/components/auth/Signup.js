import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

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
        <div class="login-container">
            <div className="auth-form">
            <h2>Sign Up</h2>
            <input
                class= "input-filled-form"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                class= "input-filled-form"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                class= "input-filled-form"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSignup}  class="login-buttons">Sign Up</button>
            {message && <p id='dont-account'>{message}</p>}
            <p id='dont-account'>Already have an account? <button   class="login-buttons" onClick={() => navigate('/login')}>Login</button></p>
        </div>
        </div>
    );
}

export default Signup;
