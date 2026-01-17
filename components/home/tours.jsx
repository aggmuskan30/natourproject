"use client";
import React, { useState } from 'react';
import BookingModal from '@/components/layout/BookingModal';

const Tours = () => {
  const [selectedTour, setSelectedTour] = useState(null);

  const tours = [
    {
      id: 1,
      tripName: "SHIV KI NAGRI: Varanasi",
      price: "6000 INR",
      days: 4,
      dateRange: "4 Day Spiritual Tour",
      hotelRecommendation: { name: "Brijrama Palace (Ghat View)" },
      image: "/img/varanasi.jpg", 
      color1: "#ff9500de", 
      color2: "#ff9430f8",
      details: ["4 Day tour", "Ganga Arti Experience", "Kashi Vishwanath Temple", "Dasaswamedh Ghat", "Sarnath Visit"]
    },
    {
      id: 2,
      tripName: "Incredible South India",
      price: "10000 INR",
      days: 10,
      dateRange: "10 Day Nature Tour",
      hotelRecommendation: { name: "Kumarakom Lake Resort" },
      image: "/img/munnar.jpg", 
      color1: "#7ed56f", 
      color2: "#28b485",
      details: ["10 Day tour", "Visit Kochi & Munnar", "Backwaters of Alleppey", "Overnight Houseboat Stay", "Tea Garden Walk"]
    },
    {
      id: 3,
      tripName: "LADAKH: THE BIKE TRIP",
      price: "15000 INR",
      days: 7,
      dateRange: "7 Day Biking Adventure",
      hotelRecommendation: { name: "Pangong Eco Camps" },
      image: "/img/ladakh.jpg", 
      color1: "#2998ff", 
      color2: "#5643fa",
      details: ["7 Day tour", "Up to 15 people", "Nubra Valley Ride", "Turtuk Waterfall", "Thiksey Monastery"]
    }
  ];

  return (
    // FIX 1: Changed "section-tours" to "section-tour" to match your CSS
    <section className="section-tour" id="section-tour">
      
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary">
          Most Popular Tours
        </h2>
      </div>

      <div className="row">
        {tours.map((tour) => (
          <div className="col-1-of-3" key={tour.id}>
            <div className="card">
              
              {/* FRONT SIDE */}
              <div className="card__side card__side--front">
                <div 
                  className="card__picture"
                  style={{
                    backgroundImage: `linear-gradient(to right bottom, ${tour.color1}, ${tour.color2}), url(${tour.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '23rem',
                    backgroundBlendMode: 'screen',
                    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
                    borderTopLeftRadius: '3px',
                    borderTopRightRadius: '3px'
                  }}
                >
                  &nbsp;
                </div>
                
                <h4 className="card__heading">
                  <span 
                    className="card__heading-span"
                    style={{
                      backgroundImage: `linear-gradient(to right bottom, ${tour.color1}85, ${tour.color2}85)`,
                      padding: '1rem 1.5rem',
                      boxDecorationBreak: 'clone'
                    }}
                  >
                    {tour.tripName}
                  </span>
                </h4>
                
                <div className="card__details">
                  <ul>
                    {tour.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* BACK SIDE */}
              <div 
                 className="card__side card__side--back"
                 style={{
                    backgroundImage: `linear-gradient(to right bottom, ${tour.color1}, ${tour.color2})` 
                 }}
              >
                <div className="card__cta">
                  <div className="card__price-box">
                    <p className="card__price-only">Only</p>
                    <p className="card__price-value">{tour.price}</p>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedTour(tour)} 
                    className="btn btn--white"
                  >
                    Book NOW
                  </button>
                  
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      <BookingModal 
        isOpen={!!selectedTour} 
        onClose={() => setSelectedTour(null)} 
        trip={selectedTour} 
      />
      
      {/* FIX 2: Reverted to "u-margin-top-big" to fix button spacing */}
      <div className="u-center-text u-margin-top-big">
        <a href="#" className="btn btn--green">DISCOVER ALL TOURS</a>
      </div>
    </section>
  );
};

export default Tours;