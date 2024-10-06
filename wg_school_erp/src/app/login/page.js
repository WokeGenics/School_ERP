// app/login/page.js
'use client';

import { useState } from 'react';
import styles from './login.module.css';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className={styles.container}>
      
      <h1 className={styles.heading}>Sign in</h1>

      <div className={styles.wrapper}>
        {/* Left side with form */}
        <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            {/* <label htmlFor="email">Email</label> */}
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Email or Username"
              onChange={(e) => setEmail(e.target.value)}
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
