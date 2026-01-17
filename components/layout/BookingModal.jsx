"use client";
import React, { useState } from 'react';

const BookingModal = ({ isOpen, onClose, trip }) => {
  if (!isOpen || !trip) return null;

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      if (!window.Razorpay) {
        alert("Payment system loading... try again in 3s.");
        setLoading(false);
        return;
      }
      const numericAmount = parseInt(trip.price.replace(/[^0-9]/g, '')) || 10000;
    
      const res = await fetch("/api/payment/create_order", {
        method: "POST",
        body: JSON.stringify({ amount: numericAmount, currency: "INR" }),
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`); 
      }
      
      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Natours Travel",
        description: trip.tripName,
        order_id: data.order.id,
        handler: function (response) {
          alert("Success! Payment ID: " + response.razorpay_payment_id);
          onClose();
        },
        theme: { color: "#55c57a" }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      
    } catch (err) {
      console.error(err);
      alert("Payment Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, 
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        backgroundColor: 'white', width: '90%', maxWidth: '950px', height: '55rem',
        borderRadius: '5px', overflow: 'hidden', boxShadow: '0 2.5rem 5rem rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'row', position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '1.5rem', right: '2.5rem', 
          fontSize: '3rem', border: 'none', background: 'none', 
          cursor: 'pointer', lineHeight: 0.8, zIndex: 10, color: '#555'
        }}>&times;</button>

        <div style={{ width: '40%', position: 'relative' }}>
           <img src="/img/nat-8.jpg" alt="Tour" style={{ width: '100%', height: '50%', objectFit: 'cover', display: 'block' }} />
           <img src="/img/nat-9.jpg" alt="Tour" style={{ width: '100%', height: '50%', objectFit: 'cover', display: 'block' }} />
       
        
        </div>

        <div style={{ width: '60%', padding: '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          <h2 className="heading-secondary" style={{ marginBottom: '2rem' }}>
            Confirm Your Trip
          </h2>
          
          <h3 className="heading-tertiary" style={{ marginBottom: '3rem', fontSize: '2rem' }}>
            {trip.tripName}
          </h3>

          <div style={{ fontSize: '1.5rem', color: '#777', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
               <span><strong>Dates:</strong></span>
               <span>{trip.dateRange || "Flexible"}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
               <span><strong>Hotel:</strong></span>
               <span>{trip.hotelRecommendation?.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <span><strong>Total:</strong></span>
               <span style={{ fontSize: '2.4rem', color: '#55c57a', fontWeight: '700' }}>{trip.price}</span>
            </div>
          </div>

          <button 
            onClick={handlePayment} 
            className="btn-text" 
            disabled={loading}
            style={{ alignSelf: 'flex-start' }}
          >
            {loading ? "Processing..." : "Checkout"}
          </button>
          
          <p style={{ fontSize: '1.1rem', marginTop: '1.5rem', color: '#999' }}>
            *Powered by Razorpay. Secure SSL Encryption.
          </p>
        </div>

      </div>
    </div>
  );
};

export default BookingModal;