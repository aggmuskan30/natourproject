"use client";
import React, { useState } from 'react';
import BookingModal from '@/components/layout/BookingModal';
const calculateDateRange = (startDate, days) => {
  if (!startDate || !days) return "";
  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + parseInt(days));
  
  const options = { month: 'short', day: 'numeric' };
  return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
};

const About = () => {
  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState(null);
  const [isBookingOpen, setBookingOpen] = useState(false);

  const [formData, setFormData] = useState({
    destination: '',
    days: 3,
    startDate: '', 
    currency: 'INR',      
    budgetAmount: '',     
    interests: ''
  });

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const dateRangeString = calculateDateRange(formData.startDate, formData.days);
    const finalBudget = `${formData.budgetAmount} ${formData.currency}`;
    
    const payload = {
      destination: formData.destination,
      days: formData.days,
      interests: formData.interests,
      budget: finalBudget 
    };

    try {
      const res = await fetch('/api/ai-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      setTrip({ 
        ...data.trip, 
        dateRange: dateRangeString, 
        days: formData.days 
      }); 

    } catch (err) {
      alert("AI is sleepy right now. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-about" id="section-about">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary">
          {trip ? "Your Custom Itinerary" : "CUSTOMISE YOUR DREAM TRIP"}
        </h2>
      </div>

      <div className="row">
        <div className="col-1-of-2">
          {!trip ? (
            <>
              <h3 className="heading-tertiary u-margin-bottom-small">
                Where is your next adventure?
              </h3>
              <form onSubmit={handleGenerate} className="form-ai">
                <div className="form__group">
                  <input 
                    type="text" 
                    className="form__input" 
                    placeholder="Destination (e.g. Goa, Paris)" 
                    required 
                    onChange={e => setFormData({...formData, destination: e.target.value})}
                  />
                </div>
                
                <div className="form__group" style={{ display: 'flex', gap: '1rem' }}>
                   <input 
                     type="number" 
                     min="1" max="14" 
                     className="form__input" 
                     placeholder="Days" 
                     style={{ width: '30%' }}
                     required
                     onChange={e => setFormData({...formData, days: e.target.value})}
                   />
                   <input 
                     type="date" 
                     className="form__input" 
                     style={{ flex: 1, fontFamily: 'inherit', color: '#777' }}
                     required
                     onChange={e => setFormData({...formData, startDate: e.target.value})}
                   />
                </div>

                <div className="form__group" style={{ display: 'flex', gap: '1rem' }}>
                   <select 
                     className="form__input" 
                     style={{ width: '30%', padding: '1rem' }} 
                     onChange={e => setFormData({...formData, currency: e.target.value})}
                   >
                     <option value="INR">₹ INR</option>
                     <option value="USD">$ USD</option>
                     <option value="EUR">€ EUR</option>
                   </select>

                   <input 
                     type="number" 
                     className="form__input" 
                     placeholder="Total Budget" 
                     required
                     style={{ flex: 1 }}
                     onChange={e => setFormData({...formData, budgetAmount: e.target.value})}
                   />
                </div>

                <div className="form__group">
                    <input 
                        type="text" 
                        className="form__input" 
                        placeholder="Interests (e.g. Food, Hiking)" 
                        onChange={e => setFormData({...formData, interests: e.target.value})}
                    />
                </div>

                <button className="btn-text" disabled={loading}>
                  {loading ? "GENERATING..." : "Plan My Trip \u2192"}
                </button>
              </form>
            </>
          ) : (
            <div className="trip-result" style={{ maxHeight: '60rem', overflowY: 'scroll', padding: '2rem' }}>
              <h3 className="heading-tertiary" style={{marginBottom: '1rem'}}>{trip.tripName}</h3>

              <div className="u-margin-bottom-small" style={{fontSize: '1.4rem'}}>
                 <p><strong>🗓️ Date:</strong> {trip.dateRange}</p>
                 <p><strong>💰 Budget:</strong> {trip.price}</p>
                 <p><strong>🏨 Stay:</strong> {trip.hotelRecommendation?.name}</p>
              </div>

              <div className="trip-timeline">
                {trip.dailyPlan?.map((day) => (
                  <div key={day.day} style={{ marginBottom: '2.5rem', borderLeft: '3px solid #55c57a', paddingLeft: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.6rem', color: '#55c57a', textTransform: 'uppercase' }}>
                      Day {day.day}: {day.theme}
                    </h4>
                    <ul style={{ listStyle: 'none', fontSize: '1.4rem', marginTop: '0.5rem' }}>
                      <li style={{marginBottom: '0.5rem'}}>☀️ <strong>Morning:</strong> {day.morning}</li>
                      <li style={{marginBottom: '0.5rem'}}>🌤️ <strong>Afternoon:</strong> {day.afternoon}</li>
                      <li style={{marginBottom: '0.5rem'}}>🌙 <strong>Evening:</strong> {day.evening}</li>
                    </ul>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '2rem' }}>
                <button className="btn-text" onClick={() => setTrip(null)}>&larr; Plan Another</button>
                <button 
                   className="btn btn--green" 
                   style={{ marginLeft: '2rem' }}
                   onClick={() => setBookingOpen(true)}
                >
                   Book This Trip
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="col-1-of-2">
          <div className="composition">
            <img src="/img/rajsthan.jpg" alt="Photo 1" className="composition__photo composition__photo--p1" />
            <img src="/img/mp.jpg" alt="Photo 2" className="composition__photo composition__photo--p2" />
            <img src="/img/room.jpg" alt="Photo 3" className="composition__photo composition__photo--p3" />
          </div>
        </div>
      </div>

      <BookingModal 
         isOpen={isBookingOpen} 
         onClose={() => setBookingOpen(false)}
         trip={trip}
       />
    </section>
  );
};

export default About;