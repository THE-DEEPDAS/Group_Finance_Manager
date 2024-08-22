import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
  // Import global styles

function Login({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && email === storedUser.email && password === storedUser.password) {
            setUser({ email });
            navigate('/dashboard');
        } else {
            setMessage('Invalid email or password. Please sign up.');
        }
    };

    return (
        <div className="form-container">
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
            {message && <p>{message}</p>}
            <p>Don't have an account? <button onClick={() => navigate('/signup')}>Sign Up</button></p>
        </div>
    );
}

export default Login;
