"use client";
import React, { useState, useEffect } from 'react';

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

  
  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries()); 

    const inputs = e.target.querySelectorAll('input');
    
    const email = inputs[isLogin ? 0 : 1].value;
    const password = inputs[isLogin ? 1 : 2].value;
    const name = isLogin ? "" : inputs[0].value;

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
          alert(responseData.message); 
        }
      } catch (error) {
        console.error("Signup Error:", error);
      }
    } else {
      
      console.log("Logging in...");
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
          
          <form className="form" onSubmit={handleSubmit}>
            {!isLogin && (
               <div className="form__group">
                 <input type="text" className="form__input" placeholder="Full Name" required />
               </div>
            )}

            <div className="form__group">
              <input type="email" className="form__input" placeholder="Email Address" required />
            </div>

            <div className="form__group">
              <input type="password" className="form__input" placeholder="Password" required />
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
          background-color: rgba(0, 0, 0, 0.5); /* Darker for better contrast */
          backdrop-filter: blur(10px); /* Heavy Blur */
          z-index: 9999;
          display: flex; justify-content: center; align-items: center;
          animation: fadeIn 0.4s ease-out;
        }

        .auth-modal {
          background-color: white;
          width: 90%; max-width: 45rem; /* Slightly narrower for that 'card' look */
          padding: 5rem 4rem;
          border-radius: 5px;
          box-shadow: 0 2rem 4rem rgba(0,0,0,0.25);
          position: relative;
          animation: slideUp 0.4s ease-out;
        }

        .auth-modal__close {
          position: absolute; top: 1.5rem; right: 2.5rem;
          font-size: 3.5rem; border: none; background: none; cursor: pointer;
          color: #777; line-height: 1;
        }
        .auth-modal__close:hover { color: #55c57a; }

        .form__group { margin-bottom: 2rem; }

        .form__input {
          width: 100%; display: block; padding: 1.5rem 2rem;
          border-radius: 2px; border: none;
          background-color: #f2f2f2;
          font-family: inherit; font-size: 1.5rem;
          border-bottom: 3px solid transparent;
          transition: all .3s;
        }
        .form__input:focus { outline: none; box-shadow: 0 1rem 2rem rgba(0,0,0,0.1); border-bottom: 3px solid #55c57a; }
        .form__input::-webkit-input-placeholder { color: #999; }

        .auth-modal__toggle-box { margin-top: 2.5rem; text-align: center; font-size: 1.4rem; }
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