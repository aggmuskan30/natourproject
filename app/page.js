"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import About from '@/components/home/about';
import Features from '@/components/home/features';
import Tours from '@/components/home/tours';
import Stories from '@/components/home/stories';
import Footer from '@/components/layout/footer';
import AuthModal from '@/components/layout/AuthModal';

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
 
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn) {
      const timer = setTimeout(() => {
        setShowAuthModal(true);
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLoginSuccess = () => {
 
    localStorage.setItem('isLoggedIn', 'true');
    setShowAuthModal(false);
  };

  return (
    <main>
       <AuthModal 
         isOpen={showAuthModal} 
         onClose={() => setShowAuthModal(false)}
         onLoginSuccess={handleLoginSuccess}
       />

       <Header />
       <About />
       <Features />
       <Tours />
       <Stories />
       
       <Footer />
    </main>
  );
}