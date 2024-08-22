import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'

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
       <div class="login-container">
             <div className="auth-form"> 
            <h2>Login</h2>
            <input class= "input-filled-form"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input class= "input-filled-form"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} class="login-buttons">Login</button>
            {message && <p>{message}</p>}
            <p id='dont-account'>Don't have an account? <button onClick={() => navigate('/signup')} class="login-buttons">Sign Up</button></p>
        </div>
       </div>
    );
}

export default Login;
