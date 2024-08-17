import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = () => {
        if (email && password && password === confirmPassword) {
            // Simulate signup
            setUser({ email });
            navigate('/dashboard');
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
        </div>
    );
}

export default Signup;
