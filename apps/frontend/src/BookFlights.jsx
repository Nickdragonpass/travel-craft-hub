import React, { useState } from 'react';
import './App.css';

function BookFlights() {
  const [searchForm, setSearchForm] = useState({
    from: 'LAX',
    to: 'JFK',
    departDate: '2024-02-15',
    returnDate: '2024-02-22',
    passengers: 1,
    class: 'economy'
  });

  const [flights, setFlights] = useState([
    {
      id: 1,
      airline: 'United Airlines',
      flight: 'UA 123',
      departure: '08:30',
      arrival: '16:45',
      duration: '5h 15m',
      stops: 'Non-stop',
      price: 485,
      originalPrice: 650,
      pointsEarned: 2425,
      benefits: {
        seatSelection: { included: true, value: 35, description: 'Free seat selection' },
        baggage: { included: true, value: 60, description: 'Free checked bag (50lbs)' },
        lounge: { included: true, value: 45, description: 'United Club access' },
        cancellation: { included: true, value: 0, description: 'Free cancellation up to 24h' },
        pointsMultiplier: 5
      }
    },
    {
      id: 2,
      airline: 'Delta Air Lines',
      flight: 'DL 456',
      departure: '10:15',
      arrival: '18:30',
      duration: '5h 15m',
      stops: 'Non-stop',
      price: 520,
      originalPrice: 580,
      pointsEarned: 1560,
      benefits: {
        seatSelection: { included: false, value: 35, description: 'Seat selection fee applies' },
        baggage: { included: true, value: 60, description: 'Free checked bag (50lbs)' },
        lounge: { included: false, value: 45, description: 'SkyClub access not included' },
        cancellation: { included: true, value: 0, description: 'Free cancellation up to 24h' },
        pointsMultiplier: 3
      }
    },
    {
      id: 3,
      airline: 'American Airlines',
      flight: 'AA 789',
      departure: '14:20',
      arrival: '22:35',
      duration: '5h 15m',
      stops: 'Non-stop',
      price: 445,
      originalPrice: 525,
      pointsEarned: 1335,
      benefits: {
        seatSelection: { included: false, value: 35, description: 'Seat selection fee applies' },
        baggage: { included: false, value: 60, description: 'Baggage fees apply' },
        lounge: { included: false, value: 45, description: 'Admirals Club access not included' },
        cancellation: { included: false, value: 25, description: 'Cancellation fees apply' },
        pointsMultiplier: 3
      }
    }
  ]);

  // Mock user reward program - shows DragonPass Premium status
  const userRewardProgram = {
    name: 'DragonPass Premium',
    tier: 'Gold',
    pointsBalance: 34500,
    benefits: {
      pointsMultiplier: 5,
      loungeAccess: true,
      freeBaggage: true,
      seatSelection: true,
      priorityBoarding: true
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateSavings = (benefits) => {
    let totalSavings = 0;
    Object.values(benefits).forEach(benefit => {
      if (typeof benefit === 'object' && benefit.included && benefit.value > 0) {
        totalSavings += benefit.value;
      }
    });
    return totalSavings;
  };

  const renderBenefitIcon = (benefit, isIncluded) => {
    if (isIncluded) {
      return <span className="benefit-icon included">✓</span>;
    }
    return <span className="benefit-icon not-included">✗</span>;
  };

  return (
    <div className="book-flights-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Book Flights</h1>
          <p className="page-subtitle">Search and book flights with exclusive DragonPass benefits</p>
          
          {/* User Reward Program Status */}
          <div className="reward-program-status">
            <div className="status-card">
              <div className="status-header">
                <span className="program-icon">👑</span>
                <div className="program-info">
                  <span className="program-name">{userRewardProgram.name}</span>
                  <span className="program-tier">{userRewardProgram.tier} Tier</span>
                </div>
              </div>
              <div className="points-balance">
                <span className="points-value">{userRewardProgram.pointsBalance.toLocaleString()}</span>
                <span className="points-label">points available</span>
              </div>
            </div>
            <div className="member-benefits">
              <div className="benefit-chip active">5x Points</div>
              <div className="benefit-chip active">Free Lounge</div>
              <div className="benefit-chip active">Free Bags</div>
              <div className="benefit-chip active">Seat Selection</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="search-container">
        <div className="search-form">
          <div className="form-row">
            <div className="form-group">
              <label>From</label>
              <select 
                name="from" 
                value={searchForm.from} 
                onChange={handleInputChange}
                className="search-select"
              >
                <option value="LAX">Los Angeles (LAX)</option>
                <option value="JFK">New York (JFK)</option>
                <option value="LHR">London (LHR)</option>
                <option value="NRT">Tokyo (NRT)</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>To</label>
              <select 
                name="to" 
                value={searchForm.to} 
                onChange={handleInputChange}
                className="search-select"
              >
                <option value="JFK">New York (JFK)</option>
                <option value="LAX">Los Angeles (LAX)</option>
                <option value="LHR">London (LHR)</option>
                <option value="NRT">Tokyo (NRT)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Departure</label>
              <input 
                type="date" 
                name="departDate" 
                value={searchForm.departDate}
                onChange={handleInputChange}
                className="search-input"
              />
            </div>

            <div className="form-group">
              <label>Return</label>
              <input 
                type="date" 
                name="returnDate" 
                value={searchForm.returnDate}
                onChange={handleInputChange}
                className="search-input"
              />
            </div>

            <div className="form-group">
              <label>Passengers</label>
              <select 
                name="passengers" 
                value={searchForm.passengers} 
                onChange={handleInputChange}
                className="search-select"
              >
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4 Passengers</option>
              </select>
            </div>

            <div className="form-group">
              <label>Class</label>
              <select 
                name="class" 
                value={searchForm.class} 
                onChange={handleInputChange}
                className="search-select"
              >
                <option value="economy">Economy</option>
                <option value="premium">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First</option>
              </select>
            </div>
          </div>

          <button className="search-btn">
            <span className="search-icon">🔍</span>
            Search Flights
          </button>
        </div>
      </div>

      {/* Flight Results */}
      <div className="flights-container">
        <div className="results-header">
          <h2>Available Flights</h2>
          <p className="results-subtitle">
            {flights.length} flights found from {searchForm.from} to {searchForm.to}
          </p>
        </div>

        <div className="flights-list">
          {flights.map(flight => (
            <div key={flight.id} className="flight-card">
              <div className="flight-header">
                <div className="airline-info">
                  <span className="airline-logo">✈️</span>
                  <div className="airline-details">
                    <span className="airline-name">{flight.airline}</span>
                    <span className="flight-number">{flight.flight}</span>
                  </div>
                </div>
                
                <div className="flight-times">
                  <div className="time-info">
                    <span className="time">{flight.departure}</span>
                    <span className="airport">{searchForm.from}</span>
                  </div>
                  <div className="flight-path">
                    <span className="duration">{flight.duration}</span>
                    <div className="flight-line">
                      <div className="line"></div>
                      <span className="plane-icon">✈</span>
                    </div>
                    <span className="stops">{flight.stops}</span>
                  </div>
                  <div className="time-info">
                    <span className="time">{flight.arrival}</span>
                    <span className="airport">{searchForm.to}</span>
                  </div>
                </div>

                <div className="price-info">
                  <div className="price-details">
                    <span className="current-price">${flight.price}</span>
                    <span className="original-price">${flight.originalPrice}</span>
                    <span className="savings">Save ${flight.originalPrice - flight.price}</span>
                  </div>
                  <div className="points-earned">
                    <span className="points-icon">⭐</span>
                    <span className="points-text">Earn {flight.pointsEarned.toLocaleString()} points</span>
                  </div>
                </div>
              </div>

              <div className="flight-benefits">
                <div className="benefits-row">
                  <div className="quick-benefits">
                    <span className="benefits-label">Your DragonPass Benefits:</span>
                    <div className="benefit-tags">
                      {flight.benefits.seatSelection.included && (
                        <span className="benefit-tag included">
                          <span className="tag-icon">💺</span>
                          Free Seats
                        </span>
                      )}
                      {flight.benefits.baggage.included && (
                        <span className="benefit-tag included">
                          <span className="tag-icon">🧳</span>
                          Free Bags
                        </span>
                      )}
                      {flight.benefits.lounge.included && (
                        <span className="benefit-tag included">
                          <span className="tag-icon">🏛️</span>
                          Lounge Access
                        </span>
                      )}
                      {flight.benefits.cancellation.included && (
                        <span className="benefit-tag included">
                          <span className="tag-icon">🔄</span>
                          Free Cancellation
                        </span>
                      )}
                      <span className="benefit-tag points">
                        <span className="tag-icon">⭐</span>
                        {flight.benefits.pointsMultiplier}x Points
                      </span>
                    </div>
                  </div>
                  
                  {calculateSavings(flight.benefits) > 0 && (
                    <div className="savings-badge">
                      <span className="savings-label">You Save</span>
                      <span className="savings-amount">${calculateSavings(flight.benefits)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flight-actions">
                <button className="select-flight-btn">
                  Select Flight
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookFlights; 