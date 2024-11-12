// app/login/page.js
'use client';

import { useState } from 'react';
import styles from './login.module.css';
import Image from 'next/image';
// import jwtDecode from 'jwt-decode';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';

// import { redirect } from 'next/navigation'

export default function LoginPage() {
  // const navigate = useNavigate();
  const { push } = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const BaseUrl = "http://localhost:5000"
 
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    const loginData = { username, password, };

    try {
      console.log("just hit")
      const response = await fetch(`${BaseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(loginData),
      });
      // console.log(response)
      if (response.ok) {
        const { token, role } = await response.json(); // Assuming the token is returned from the API
        // console.log("fine")
        console.log(token, role)
        // Decode the token to extract role and expiration
        // const decoded = jwtDecode(token);
        // const { role, exp } = decoded;

        // Store token in localStorage with expiration (1 hour)
        const expirationTime = new Date().getTime() + 60 * 60 * 1000; // Convert UNIX timestamp to milliseconds
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiration', expirationTime);

        // Redirect based on user role
        if (role === 'admin') {
          push('/dashboard');
        } else if (role === 'user') {
          push('/user/dashboard');
        } else {
          push('Invalid role');
        }
      } else {
        const errorData = await response.json();
        // setError(errorData.message || 'Something went wrong');
      }
    } catch (err) {
      // setError('Network error, please try again.');
      console.log('Network error, please try again.',err)
    }
  };

  return (
    <div className={styles.container}>
      
      <h1 className={styles.heading}>Sign in</h1>

      <div className={styles.wrapper}>
        {/* Left side with form */}
        <div className={styles.formWrapper}>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            {/* <label htmlFor="email">Email</label> */}
            <input
              type="email"
              id="email"
              value={username}
              placeholder="Email or Username"
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            {/* <label htmlFor="password">Password</label> */}
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div className={styles.options}>
            <div>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe"> Remember me</label>
            </div>
            <a href="#" className={styles.forgotPassword}>
              Forgot password?
            </a>
          </div>

          <button type="submit" className={styles.loginButton}>
            Log in
          </button>
        </form>
        </div>

        {/* Right side with social buttons */}
        <div className={styles.socialWrapper}>
          <div className={styles.socialButtons}>
            <button className={styles.googleButton}>
              <Image
                src="/images/google.png"
                alt="Google Logo"
                width={25}
                height={25}
                className={styles.logo}
              />
              Continue with Google
            </button>

            <button className={styles.appleButton}>
              <Image
                src="/images/apple.png"
                alt="Apple Logo"
                width={25}
                height={25}
                className={styles.logo}
              />
              Continue with Apple
            </button>

            <button className={styles.facebookButton}>
              <Image
                src="/images/fb.png"
                alt="Facebook Logo"
                width={25}
                height={25}
                className={styles.logo}
              />
              Continue with Facebook
            </button>
          </div>

        </div>

        <span className={styles.orText}>or</span>
      </div>

    </div>
  );
}
