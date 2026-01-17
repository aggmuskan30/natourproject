"use client";
import React, { useState, useEffect } from 'react';
import { signIn } from "next-auth/react";

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    
    await signIn("google", { callbackUrl: "/" }); 
    onLoginSuccess();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name"); 

    if (!isLogin) {
 
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        const responseData = await res.json();
        
        if (res.ok) {
          alert("Account created! You are now logged in.");
          onLoginSuccess(); 
        } else {
          alert(responseData.message || "Something went wrong."); 
        }
      } catch (error) {
        console.error("Signup Error:", error);
        alert("Error connecting to server.");
      }
    } else {

      console.log("Logging in manually...");
      onLoginSuccess();
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="auth-modal__close" onClick={onClose}>&times;</button>

        <div className="auth-modal__content">
          <h2 className="heading-secondary u-margin-bottom-small" style={{ textAlign: 'center' }}>
            {isLogin ? 'WELCOME BACK!' : 'START YOUR JOURNEY'}
          </h2>

          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <button 
              type="button" 
              onClick={handleGoogleLogin}
              className="btn-google"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
                width: '100%', padding: '1rem', border: '1px solid #ddd',
                backgroundColor: 'white', borderRadius: '5px', cursor: 'pointer',
                fontSize: '1.4rem', fontWeight: 'bold', color: '#555', transition: 'all 0.3s',
                boxShadow: '0 1rem 2rem rgba(0,0,0,0.05)'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f7f7f7'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: '2rem' }} />
              Continue with Google
            </button>
            
            <div style={{ 
              display: 'flex', alignItems: 'center', margin: '1.5rem 0', color: '#999', fontSize: '1.2rem' 
            }}>
              <span style={{ flex: 1, height: '1px', background: '#eee' }}></span>
              <span style={{ padding: '0 1rem' }}>OR</span>
              <span style={{ flex: 1, height: '1px', background: '#eee' }}></span>
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            {!isLogin && (
               <div className="form__group">
                 <input 
                   type="text" 
                   name="name" 
                   className="form__input" 
                   placeholder="Full Name" 
                   required 
                 />
               </div>
            )}

            <div className="form__group">
              <input 
                type="email" 
                name="email" 
                className="form__input" 
                placeholder="Email Address" 
                required 
              />
            </div>

            <div className="form__group">
              <input 
                type="password" 
                name="password" 
                className="form__input" 
                placeholder="Password" 
                required 
              />
            </div>

            <div className="form__group u-margin-top-medium" style={{ textAlign: 'center' }}>
              <button className="btn btn--green">
                {isLogin ? 'LOGIN' : 'SIGN UP'}
              </button>
            </div>
          </form>

          <div className="auth-modal__toggle-box">
            <p className="paragraph">
              {isLogin ? "New to Natours? " : "Already have an account? "}
              <span 
                className="auth-modal__toggle-link"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Create Account' : 'Login now'}
              </span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex; justify-content: center; align-items: center;
          animation: fadeIn 0.4s ease-out;
        }

        .auth-modal {
          background-color: white;
          width: 90%; max-width: 45rem;
          padding: 4rem;
          border-radius: 5px;
          box-shadow: 0 2rem 4rem rgba(0,0,0,0.25);
          position: relative;
          animation: slideUp 0.4s ease-out;
        }

        .auth-modal__close {
          position: absolute; top: 1.5rem; right: 2rem;
          font-size: 3rem; border: none; background: none; cursor: pointer;
          color: #777; line-height: 1; transition: color 0.2s;
        }
        .auth-modal__close:hover { color: #55c57a; }

        .form__group { margin-bottom: 1.5rem; }

        .form__input {
          width: 100%; display: block; padding: 1.2rem 1.5rem;
          border-radius: 3px; border: none;
          background-color: #f2f2f2;
          font-family: inherit; font-size: 1.4rem;
          border-bottom: 3px solid transparent;
          transition: all .3s;
        }
        .form__input:focus { 
          outline: none; 
          box-shadow: 0 1rem 2rem rgba(0,0,0,0.1); 
          border-bottom: 3px solid #55c57a; 
        }
        .form__input::-webkit-input-placeholder { color: #999; }

        .auth-modal__toggle-box { margin-top: 2rem; text-align: center; font-size: 1.3rem; }
        .auth-modal__toggle-link {
          color: #55c57a; font-weight: bold; cursor: pointer; text-decoration: underline; margin-left: 5px;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(5rem); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default AuthModal;