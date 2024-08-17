import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (email && password) {
            // Simulate login
            setUser({ email });
            navigate('/dashboard');
        }
    };

    return (
        <div className="auth-form">
            <h2>Login</h2>
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
            <button onClick={handleLogin}>Login</button>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    );
}

export default Login;
