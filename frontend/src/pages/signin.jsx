import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import signup from './signup'; // Assuming you have a SignupPage component
import { styles } from '../css/styles'; // Importing styles from styles.jsx
export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('authToken', result.token);
        alert('Sign in successful!');
        console.log('API Response:', result);
        
        // Store token or redirect user
        // localStorage.setItem('token', result.token);
        // window.location.href = '/dashboard';
        
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Invalid credentials'}`);
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
return (
    <div style={styles.container}>
        <div style={styles.card}>
            <div style={styles.header}>
                <div style={styles.iconContainer}>
                    <LogIn size={30} color="white" />
                </div>
                <h1 style={styles.title}>Welcome Back</h1>
                <p style={styles.subtitle}>Please sign in to your account</p>
            </div>

            <div style={styles.form}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Email Address</label>
                    <div style={styles.inputContainer}>
                        <Mail size={20} style={styles.icon} />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            style={{
                                ...styles.input,
                                ...styles.inputWithIcon,
                                ...(errors.email ? styles.inputError : {})
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e5e7eb';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                    {errors.email && <p style={styles.error}>{errors.email}</p>}
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Password</label>
                    <div style={styles.inputContainer}>
                        <Lock size={20} style={styles.icon} />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            style={{
                                ...styles.input,
                                ...styles.inputWithIconAndButton,
                                ...(errors.password ? styles.inputError : {})
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e5e7eb';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={styles.eyeButton}
                            onMouseEnter={(e) => e.target.style.color = '#374151'}
                            onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && <p style={styles.error}>{errors.password}</p>}
                </div>

                <div style={styles.rememberSection}>
                    <div style={styles.rememberMe}>
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            style={styles.checkbox}
                        />
                        <label htmlFor="rememberMe" style={styles.checkboxLabel}>
                            Remember me
                        </label>
                    </div>
                    <a 
                        href="#" 
                        style={styles.forgotPassword}
                        onMouseEnter={(e) => e.target.style.color = '#4f46e5'}
                        onMouseLeave={(e) => e.target.style.color = '#667eea'}
                    >
                        Forgot password?
                    </a>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    style={{
                        ...styles.button,
                        ...(isLoading ? styles.buttonDisabled : styles.buttonEnabled)
                    }}
                    onMouseEnter={(e) => {
                        if (!isLoading) {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.5)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isLoading) {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                        }
                    }}
                >
                    {isLoading ? (
                        <>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                border: '2px solid #ffffff',
                                borderTop: '2px solid transparent',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }}></div>
                            Signing in...
                        </>
                    ) : (
                        <>
                            <LogIn size={20} />
                            Sign In
                        </>
                    )}
                </button>
            </div>

            <div style={styles.divider}>
                <div style={styles.dividerLine}></div>
                <span style={styles.dividerText}>or</span>
                <div style={styles.dividerLine}></div>
            </div>

            <div style={styles.footer}>
                <p style={styles.footerText}>
                    Don't have an account?{' '}
                    <a
                        href="/signup"
                        style={styles.footerLink}
                        onMouseEnter={(e) => e.target.style.color = '#4f46e5'}
                        onMouseLeave={(e) => e.target.style.color = '#667eea'}
                    >
                        Sign up
                    </a>
                </p>
            </div>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    </div>
);
}