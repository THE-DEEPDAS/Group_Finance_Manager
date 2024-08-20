import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth({ setUser }) {
    const [isLogin, setIsLogin] = useState(true);
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
            setMessage('Signup successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setMessage('Passwords do not match or fields are empty.');
        }
    };

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
        <div className="auth-form">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
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
            {!isLogin && (
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            )}
            <button onClick={isLogin ? handleLogin : handleSignup}>
                {isLogin ? 'Login' : 'Sign Up'}
            </button>
            {message && <p>{message}</p>}
            <p>
                {isLogin ? (
                    <>
                        Don't have an account? <button onClick={() => setIsLogin(false)}>Sign Up</button>
                    </>
                ) : (
                    <>
                        Already have an account? <button onClick={() => setIsLogin(true)}>Login</button>
                    </>
                )}
            </p>
        </div>
    );
}

export default Auth;
