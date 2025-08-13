import React, { useState } from 'react';

function Step2Triggers({ 
  customFunction, 
  handleInputChange, 
  handleArrayToggle,
  addTriggerCondition,
  removeTriggerCondition,
  updateTriggerCondition
}) {

  // Comprehensive trigger events organized by category
  const triggerEvents = [
    // ✈️ Flights
    { id: 'flight_booked', name: 'Flight booked', description: 'User completes flight booking', category: '✈️ Flights' },
    { id: 'flight_not_booked_after_search', name: 'Flight not booked (after search)', description: 'Abandoned cart / conversion nudge', category: '✈️ Flights' },
    { id: 'flight_cancelled', name: 'Flight cancelled (user or involuntary)', description: 'Trigger rebooking or support', category: '✈️ Flights' },
    { id: 'flight_delayed', name: 'Flight delayed', description: 'Trigger disruption comms / lounge offer', category: '✈️ Flights' },
    { id: 'schedule_change', name: 'Schedule change (involuntary)', description: 'Trigger re-confirmation or rescheduling', category: '✈️ Flights' },
    { id: 'no_seat_selected', name: 'No seat selected', description: 'Opportunity to upsell premium seat', category: '✈️ Flights' },
    { id: 'no_bag_added', name: 'No bag added', description: 'Trigger bag upsell', category: '✈️ Flights' },
    { id: 'no_lounge_access', name: 'No lounge access', description: 'Trigger lounge offer', category: '✈️ Flights' },
    { id: 'no_fast_track_selected', name: 'No fast track selected', description: 'Trigger security fast track offer', category: '✈️ Flights' },
    { id: 'long_layover_detected', name: 'Long layover detected', description: 'Trigger lounge/dining/upgraded itinerary', category: '✈️ Flights' },
    { id: 'missed_checkin_deadline', name: 'Missed check-in deadline', description: 'Trigger alert / recovery', category: '✈️ Flights' },
    { id: 'multiple_flights_short_window', name: 'Multiple flights booked in short window', description: 'Suggest corporate flow or pass bundle', category: '✈️ Flights' },
    { id: 'destination_specific_rule', name: 'Destination-specific rule matched', description: 'Trigger location-specific offers', category: '✈️ Flights' },
    { id: 'pre_trip_x_days', name: 'Pre-trip (X days before)', description: 'Trigger ancillaries / reminders', category: '✈️ Flights' },
    { id: 'post_trip', name: 'Post-trip', description: 'Trigger review / upsell return trip', category: '✈️ Flights' },

    // 🏨 Hotels
    { id: 'hotel_booked', name: 'Hotel booked', description: 'Completed booking', category: '🏨 Hotels' },
    { id: 'hotel_not_booked_after_flight', name: 'Hotel not booked (after flight)', description: 'Suggest hotel upsell', category: '🏨 Hotels' },
    { id: 'hotel_booking_cancelled', name: 'Booking cancelled', description: 'Trigger alternate offer or recovery flow', category: '🏨 Hotels' },
    { id: 'no_breakfast_selected', name: 'No breakfast selected', description: 'Offer breakfast upsell', category: '🏨 Hotels' },
    { id: 'no_cancellation_coverage', name: 'No cancellation coverage', description: 'Trigger flexible rate upsell', category: '🏨 Hotels' },
    { id: 'low_occupancy_hotel', name: 'Low occupancy (hotel)', description: 'Trigger upgrade or extended stay offer', category: '🏨 Hotels' },
    { id: 'vip_booking_low_star', name: 'VIP customer booking 3★ or below', description: 'Offer luxury upsell', category: '🏨 Hotels' },
    { id: 'long_stay_booked', name: 'Long stay booked', description: 'Suggest room upgrade or apartment alternatives', category: '🏨 Hotels' },
    { id: 'pre_checkin_x_days', name: 'Pre-check-in (X days)', description: 'Trigger amenity upsells', category: '🏨 Hotels' },
    { id: 'post_checkout', name: 'Post-check-out', description: 'Trigger review or return offer', category: '🏨 Hotels' },

    // 🎟 Activities / Tickets / Events
    { id: 'ticket_booked', name: 'Ticket booked', description: 'Event or activity confirmed', category: '🎟 Activities / Tickets / Events' },
    { id: 'no_activity_booked_post_travel', name: 'No activity booked (post hotel/flight)', description: 'Cross-sell local experiences', category: '🎟 Activities / Tickets / Events' },
    { id: 'same_city_multiple_customers', name: 'Same city, multiple customers', description: 'Suggest group or package deal', category: '🎟 Activities / Tickets / Events' },
    { id: 'weather_forecast_detected', name: 'Weather forecast detected', description: 'Suggest indoor vs outdoor activities', category: '🎟 Activities / Tickets / Events' },
    { id: 'post_event', name: 'Post-event', description: 'Trigger loyalty points or feedback prompt', category: '🎟 Activities / Tickets / Events' },

    // 🌍 eSIM & Connectivity
    { id: 'flight_booked_internationally', name: 'Flight booked internationally', description: 'Trigger eSIM offer', category: '🌍 eSIM & Connectivity' },
    { id: 'no_esim_active_48h_before', name: 'No eSIM active 48h before trip', description: 'Reminder + offer', category: '🌍 eSIM & Connectivity' },
    { id: 'esim_expires', name: 'eSIM expires', description: 'Offer extension or upgrade', category: '🌍 eSIM & Connectivity' },
    { id: 'customer_in_roaming_territory', name: 'Customer in roaming territory', description: 'Trigger eSIM push', category: '🌍 eSIM & Connectivity' },
    { id: 'vip_without_esim', name: 'VIP without eSIM', description: 'Concierge reach-out opportunity', category: '🌍 eSIM & Connectivity' },

    // 🚐 Airport Transfers
    { id: 'flight_booked_offer_transfer', name: 'Flight booked', description: 'Offer airport transfer automatically', category: '🚐 Airport Transfers' },
    { id: 'no_transfer_booked', name: 'No transfer booked', description: 'Trigger 3–5 days before trip', category: '🚐 Airport Transfers' },
    { id: 'customer_arrives_destination', name: 'Customer arrives in destination', description: 'Trigger concierge offer', category: '🚐 Airport Transfers' },
    { id: 'large_party_size_detected', name: 'Large party size detected', description: 'Offer van or private transfer', category: '🚐 Airport Transfers' },

    // 🛃 Fast Track Security
    { id: 'flight_booked_busy_airport', name: 'Flight booked with busy airport', description: 'Offer fast track', category: '🛃 Fast Track Security' },
    { id: 'flight_at_peak_time', name: 'Flight at peak time (6–9am)', description: 'Trigger fast track upsell', category: '🛃 Fast Track Security' },
    { id: 'short_layover', name: 'Short layover', description: 'Trigger speed-up suggestion', category: '🛃 Fast Track Security' },
    { id: 'vip_econ_ticket', name: 'VIP persona + econ ticket', description: 'Suggest fast track for comfort', category: '🛃 Fast Track Security' },

    // 🛋 Airport Lounge
    { id: 'long_layover_2h', name: 'Long layover (>2 hours)', description: 'Trigger lounge offer', category: '🛋 Airport Lounge' },
    { id: 'no_lounge_access_detected', name: 'No lounge access detected', description: 'Trigger upsell', category: '🛋 Airport Lounge' },
    { id: 'loyalty_tier_includes_lounge', name: 'Loyalty tier includes lounge', description: 'Reminder to use benefit', category: '🛋 Airport Lounge' },
    { id: 'flight_delay_lounge', name: 'Flight delay', description: 'Offer lounge for comfort', category: '🛋 Airport Lounge' },
    { id: 'concierge_recovery_lounge', name: 'Concierge-triggered recovery', description: 'Free lounge as delight gesture', category: '🛋 Airport Lounge' },

    // 🍽 Airport Dining
    { id: 'lounge_not_booked', name: 'Lounge not booked', description: 'Suggest premium dining instead', category: '🍽 Airport Dining' },
    { id: 'known_airport_fb_partners', name: 'Known airport with F&B partners', description: 'Trigger dining offers', category: '🍽 Airport Dining' },
    { id: 'time_to_departure_2h', name: 'Time to departure < 2 hours', description: 'Last-minute food voucher', category: '🍽 Airport Dining' },
    { id: 'indestination_dining_campaign', name: 'In-destination dining campaign', description: 'Trigger location-based food experiences', category: '🍽 Airport Dining' }
  ];

  const triggerFrequencies = [
    { value: 'one_time_per_user', label: 'One-time per user', description: 'Trigger fires once for each user, ever' },
    { value: 'once_per_trip_session', label: 'Once per trip / session', description: 'Triggers once for a given travel instance (e.g. per flight booked)' },
    { value: 'repeatable', label: 'Repeatable', description: 'Can trigger multiple times per user if conditions match' },
    { value: 'cooldown_based', label: 'Cooldown-based', description: 'Triggers again only after a cooldown window expires' }
  ];

  const productCategories = [
    { id: 'flight', name: 'Flight', description: 'Complete flight booking' },
    { id: 'flight_seat', name: 'Flight Seat', description: 'Premium seat selection' },
    { id: 'flight_baggage', name: 'Flight Baggage', description: 'Checked or carry-on baggage' },
    { id: 'flight_upgrade', name: 'Flight Upgrade', description: 'Cabin class upgrade' },
    { id: 'hotel_upgrade', name: 'Hotel Upgrade', description: 'Room or hotel upgrade' },
    { id: 'ticket', name: 'Ticket', description: 'Activity or event tickets' },
    { id: 'esim', name: 'eSIM', description: 'International data connectivity' },
    { id: 'airport_transfer', name: 'Airport Transfer', description: 'Ground transportation' },
    { id: 'airport_fast_track', name: 'Airport Fast Track', description: 'Security fast track service' },
    { id: 'airport_dining', name: 'Airport Dining', description: 'Airport restaurant vouchers' },
    { id: 'health_wellness', name: 'Health & Wellness', description: 'Travel insurance, health services' }
  ];

  const timingOptions = [
    {
      category: '🕐 Relative to Booking Time',
      options: [
        { id: 'immediately', name: 'Immediately after trigger fires', description: 'Offer presented right away' },
        { id: 'hours_after', name: 'X hours after trigger fires', description: 'Delayed offer with custom hours', hasInput: true, inputType: 'hours' },
        { id: 'days_after', name: 'X days after trigger fires', description: 'Delayed offer with custom days', hasInput: true, inputType: 'days' }
      ]
    },
    {
      category: '📅 Relative to Travel Dates',
      options: [
        { id: 'day_of_departure', name: 'Day of flight departure', description: 'Offer on departure day' },
        { id: 'day_before_departure', name: 'Day before flight departure', description: 'Offer day before departure' },
        { id: 'day_of_checkin', name: 'Day of hotel check-in', description: 'Offer on check-in day' },
        { id: 'day_before_checkin', name: 'Day before hotel check-in', description: 'Offer day before check-in' },
        { id: 'day_of_event', name: 'Day of activity/ticket/event', description: 'Offer on event day' },
        { id: 'day_before_event', name: 'Day before activity/ticket/event', description: 'Offer day before event' },
        { id: 'days_before_trip_start', name: 'X days before trip starts', description: 'Trip = earliest booked product', hasInput: true, inputType: 'days' },
        { id: 'days_before_trip_end', name: 'X days before trip ends', description: 'Trip = latest booked product', hasInput: true, inputType: 'days' }
      ]
    },
    {
      category: '✈️ Relative to Flight Time',
      options: [
        { id: 'hours_before_departure', name: 'X hours before flight departure', description: 'Pre-flight offer', hasInput: true, inputType: 'hours' },
        { id: 'after_landing', name: 'After flight lands', description: 'For return journey perks or re-engagement' }
      ]
    },
    {
      category: '🏨 Relative to Hotel Stay',
      options: [
        { id: 'hours_before_checkin', name: 'X hours before hotel check-in', description: 'Pre-check-in offer', hasInput: true, inputType: 'hours' },
        { id: 'hours_before_checkout', name: 'X hours before hotel check-out', description: 'e.g. upsell transfer home', hasInput: true, inputType: 'hours' }
      ]
    }
  ];

  const eventSources = ['Mobile app', 'Website', 'API', 'Digital Concierge'];

  const addCondition = () => {
    addTriggerCondition();
  };

  const removeCondition = (id) => {
    removeTriggerCondition(id);
  };

  const updateCondition = (id, field, value) => {
    updateTriggerCondition(id, field, value);
  };

  const getTriggerEventById = (id) => {
    return triggerEvents.find(event => event.id === id);
  };

  const getSelectedTriggerDisplay = (triggerId) => {
    const trigger = getTriggerEventById(triggerId);
    if (!trigger) return '';
    return `${trigger.name} - ${trigger.description}`;
  };

  return (
    <div className="builder-step">
      <h4>Trigger Definition</h4>
      
      {/* Trigger Conditions Section */}
      <div className="form-group">
        <label className="required">Trigger Conditions</label>
        <p className="help-text">Define the conditions that will trigger this revenue optimization function</p>
        
        <div className="conditions-builder">
          <div className="condition-section">
            <div className="condition-label">When</div>
            {customFunction.triggerConditions.map((condition, index) => (
              <div key={condition.id} className="condition-row">
                {index > 0 && (
                  <div className="condition-operator">
                    <select
                      value={condition.operator}
                      onChange={(e) => updateCondition(condition.id, 'operator', e.target.value)}
                      className="form-input operator-select"
                    >
                      <option value="And">And</option>
                      <option value="Or">Or</option>
                    </select>
                  </div>
                )}
                
                <div className="condition-selector">
                  <select
                    value={condition.triggerEvent}
                    onChange={(e) => updateCondition(condition.id, 'triggerEvent', e.target.value)}
                    className="form-input trigger-select"
                  >
                    <option value="">Select a trigger event...</option>
                    {triggerEvents.map(event => (
                      <option key={event.id} value={event.id} className="trigger-option">
                        {event.name} - {event.description}
                      </option>
                    ))}
                  </select>
                </div>
                
                {customFunction.triggerConditions.length > 1 && (
                  <button 
                    type="button"
                    className="btn-icon remove-condition"
                    onClick={() => removeCondition(condition.id)}
                    title="Remove condition"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            
            <button 
              type="button"
              className="btn add-condition-btn"
              onClick={addCondition}
            >
              + Add Condition
            </button>
          </div>

          <div className="condition-section">
            <div className="condition-label required">Then Offer</div>
            <div className="checkbox-grid">
              {productCategories.map(category => (
                <label key={category.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={customFunction.offerCategories?.includes(category.id) || false}
                    onChange={() => handleArrayToggle('offerCategories', category.id)}
                  />
                  <span>{category.name} - {category.description}</span>
                </label>
              ))}
            </div>
            <p className="help-text-small">You will be able to specify the offer details in the Offer section (Step 4).</p>
          </div>

          <div className="condition-section">
            <div className="condition-label required">When to Send Offer</div>
            <select
              value={customFunction.timingOption || ''}
              onChange={(e) => handleInputChange('timingOption', e.target.value)}
              className="form-input"
            >
              <option value="">Select when to send the offer...</option>
              {timingOptions.map((category, categoryIndex) => (
                <optgroup key={categoryIndex} label={category.category}>
                  {category.options.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name} - {option.description}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            
            {(() => {
              const selectedOption = timingOptions
                .flatMap(cat => cat.options)
                .find(opt => opt.id === customFunction.timingOption);
              
              if (selectedOption?.hasInput) {
                return (
                  <div className="timing-input">
                    <input
                      type="number"
                      className="form-input no-arrows"
                      placeholder={selectedOption.inputType === 'hours' ? '24' : '7'}
                      value={customFunction.timingValue || ''}
                      onChange={(e) => handleInputChange('timingValue', e.target.value)}
                    />
                    <span className="input-suffix">{selectedOption.inputType}</span>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="required">Trigger Frequency</label>
        <select
          value={customFunction.triggerFrequency}
          onChange={(e) => handleInputChange('triggerFrequency', e.target.value)}
          className="form-input"
        >
          <option value="">Select trigger frequency...</option>
          {triggerFrequencies.map(freq => (
            <option key={freq.value} value={freq.value}>
              {freq.label} - {freq.description}
            </option>
          ))}
        </select>
      </div>

      {customFunction.triggerFrequency === 'cooldown_based' && (
        <div className="form-group">
          <label>Cooldown Period</label>
          <div className="input-with-suffix">
            <input
              type="number"
              className="form-input no-arrows"
              placeholder="7"
              value={customFunction.cooldownPeriod || ''}
              onChange={(e) => handleInputChange('cooldownPeriod', e.target.value)}
            />
            <span className="input-suffix-inline">days</span>
          </div>
        </div>
      )}

      <div className="form-group">
        <label>Event Interfaces</label>
        <div className="checkbox-grid">
          {eventSources.map(source => (
            <label key={source} className="checkbox-label">
              <input
                type="checkbox"
                checked={customFunction.eventSources.includes(source)}
                onChange={() => handleArrayToggle('eventSources', source)}
              />
              <span>{source}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Step2Triggers; 