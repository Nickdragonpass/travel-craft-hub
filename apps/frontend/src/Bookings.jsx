import React, { useState } from 'react';
import './App.css';

function Bookings() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [collapsedTrips, setCollapsedTrips] = useState({});

  const toggleSection = (sectionId) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const toggleTrip = (tripId) => {
    setCollapsedTrips(prev => ({
      ...prev,
      [tripId]: !prev[tripId]
    }));
  };

  // Full mock bookings data with trip grouping
  const mockBookings = [
    // Trip 1: Sarah Johnson's London Trip (Flight + Hotel + Airport Services)
    {
      id: 'BK-FL-001',
      tripId: 'TRIP-001',
      customerName: 'Sarah Johnson',
      rewardProgram: 'Gold Member',
      bookingType: 'Flight',
      flightType: 'Round Trip',
      airline: 'British Airways',
      departureDate: '2024-03-15',
      returnDate: '2024-03-22',
      origin: 'JFK',
      destination: 'LHR',
      passengers: 1,
      bookingReference: 'ABC123456',
      totalPrice: '£2,190.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-02-15',
      customer: {
        email: 'sarah.johnson@email.com',
        phone: '+44 7700 900123',
        loyaltyTier: 'Gold Member',
        loyaltyNumber: 'BA123456789'
      },
      payment: { method: 'Credit Card', last4: '1234', amount: '£2,190.00', pointsUsed: '0' }
    },
    {
      id: 'BK-HT-001',
      tripId: 'TRIP-001',
      customerName: 'Sarah Johnson',
      rewardProgram: 'Gold Member',
      bookingType: 'Hotel',
      addOnBenefits: [
        { title: 'Complimentary breakfast', description: 'Daily breakfast included for the stay' },
        { title: 'Room upgrade', description: 'Subject to availability at check-in' }
      ],
      hotelName: 'The Plaza Hotel',
      checkIn: '2024-03-15',
      checkOut: '2024-03-22',
      nights: 7,
      roomType: 'Deluxe Room',
      guests: 1,
      bookingReference: 'PLZ-2024-001',
      totalPrice: '£2,800.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-02-15',
      customer: {
        email: 'sarah.johnson@email.com',
        phone: '+44 7700 900123',
        loyaltyTier: 'Gold Member',
        loyaltyNumber: 'BA123456789'
      },
      payment: { method: 'Credit Card', last4: '1234', amount: '£2,800.00', pointsUsed: '0' }
    },
    {
      id: 'BK-AT-001',
      tripId: 'TRIP-001',
      customerName: 'Sarah Johnson',
      rewardProgram: 'Gold Member',
      bookingType: 'Airport Transfer',
      addOnBenefits: [
        { title: 'Complimentary bottled water', description: 'Provided in vehicle' }
      ],
      transferType: 'Private Car',
      pickupLocation: 'London City Centre',
      dropoffLocation: 'Heathrow Terminal 5',
      transferDate: '2024-03-15',
      transferTime: '06:00',
      vehicleType: 'Luxury Sedan',
      bookingReference: 'LHR-AT-001',
      totalPrice: '£85.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-02-15',
      customer: {
        email: 'sarah.johnson@email.com',
        phone: '+44 7700 900123',
        loyaltyTier: 'Gold Member',
        loyaltyNumber: 'BA123456789'
      },
      payment: { method: 'Entitlement', entitlementsUsed: '1', servicePrice: '£85.00' }
    },
    {
      id: 'BK-AL-001',
      tripId: 'TRIP-001',
      customerName: 'Sarah Johnson',
      rewardProgram: 'Gold Member',
      bookingType: 'Airport Lounge',
      addOnBenefits: [
        { title: 'Extra guest access', description: '1 additional guest included' }
      ],
      loungeName: 'No.1 Traveller Lounge',
      airport: 'Heathrow Terminal 5',
      accessDate: '2024-03-15',
      duration: '3 hours',
      guests: 1,
      bookingReference: 'LHR-LG-001',
      totalPrice: '£45.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-02-15',
      customer: {
        email: 'sarah.johnson@email.com',
        phone: '+44 7700 900123',
        loyaltyTier: 'Gold Member',
        loyaltyNumber: 'BA123456789'
      },
      payment: { method: 'Entitlement', entitlementsUsed: '1', servicePrice: '£45.00' }
    },
    {
      id: 'BK-ES-001',
      tripId: 'TRIP-001',
      customerName: 'Sarah Johnson',
      rewardProgram: 'Gold Member',
      bookingType: 'eSIM',
      destination: 'United States',
      dataAllowance: '10GB',
      validity: '14 days',
      networkProvider: 'AT&T',
      bookingReference: 'ESIM-US-001',
      totalPrice: '£25.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-02-15',
      customer: {
        email: 'sarah.johnson@email.com',
        phone: '+44 7700 900123',
        loyaltyTier: 'Gold Member',
        loyaltyNumber: 'BA123456789'
      },
      payment: { method: 'Credit Card', last4: '1234', amount: '£25.00', pointsUsed: '0' }
    },

    // Trip 2: Sarah Johnson's Dubai Trip (Flight + Hotel + Fast Track)
    {
      id: 'BK-FL-002',
      tripId: 'TRIP-002',
      customerName: 'Sarah Johnson',
      rewardProgram: 'Silver Member',
      bookingType: 'Flight',
      flightType: 'Round Trip',
      airline: 'Emirates',
      departureDate: '2024-03-20',
      returnDate: '2024-03-27',
      origin: 'LHR',
      destination: 'DXB',
      passengers: 2,
      bookingReference: 'EK789012',
      totalPrice: '£1,850.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-02-10',
      customer: {
        email: 'sarah.johnson@email.com',
        phone: '+44 7700 900456',
        loyaltyTier: 'Silver Member',
        loyaltyNumber: 'BA987654321'
      },
      payment: { method: 'Credit Card', last4: '5678', amount: '£1,850.00', pointsUsed: '0' }
    },
    {
      id: 'BK-HT-002',
      tripId: 'TRIP-002',
      customerName: 'Sarah Johnson',
      rewardProgram: 'Silver Member',
      bookingType: 'Hotel',
      hotelName: 'Burj Al Arab',
      checkIn: '2024-03-21',
      checkOut: '2024-03-27',
      nights: 6,
      roomType: 'Deluxe Suite',
      guests: 2,
      bookingReference: 'BURJ-2024-002',
      totalPrice: '£4,200.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-02-10',
      customer: {
        email: 'sarah.johnson@email.com',
        phone: '+44 7700 900456',
        loyaltyTier: 'Silver Member',
        loyaltyNumber: 'BA987654321'
      },
      payment: { method: 'Credit Card', last4: '5678', amount: '£4,200.00', pointsUsed: '0' }
    },
    {
      id: 'BK-FT-001',
      tripId: 'TRIP-002',
      customerName: 'Sarah Johnson',
      rewardProgram: 'Silver Member',
      bookingType: 'Fast Track',
      airport: 'Heathrow Terminal 3',
      serviceDate: '2024-03-20',
      serviceType: 'Security Fast Track',
      bookingReference: 'LHR-FT-001',
      totalPrice: '£25.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-02-10',
      customer: {
        email: 'sarah.johnson@email.com',
        phone: '+44 7700 900456',
        loyaltyTier: 'Silver Member',
        loyaltyNumber: 'BA987654321'
      },
      payment: { method: 'Discount', customerPaid: '£10.00', discountAmount: '£15.00', last4: '5678' }
    },

    // Trip 3: Michael Brown's London Business Trip (Flight + Hotel + Event)
    {
      id: 'BK-FL-003',
      tripId: 'TRIP-003',
      customerName: 'Michael Brown',
      rewardProgram: 'Platinum Member',
      bookingType: 'Flight',
      flightType: 'Round Trip',
      airline: 'Virgin Atlantic',
      departureDate: '2024-04-10',
      returnDate: '2024-04-15',
      origin: 'JFK',
      destination: 'LHR',
      passengers: 1,
      bookingReference: 'VS456789',
      totalPrice: '£1,650.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-03-01',
      customer: {
        email: 'michael.brown@email.com',
        phone: '+44 7700 900789',
        loyaltyTier: 'Platinum Member',
        loyaltyNumber: 'BA456789123'
      },
      payment: { method: 'Credit Card', last4: '9012', amount: '£1,650.00', pointsUsed: '0' }
    },
    {
      id: 'BK-HT-003',
      tripId: 'TRIP-003',
      customerName: 'Michael Brown',
      rewardProgram: 'Platinum Member',
      bookingType: 'Hotel',
      hotelName: 'The Ritz London',
      checkIn: '2024-04-11',
      checkOut: '2024-04-15',
      nights: 4,
      roomType: 'Executive Suite',
      guests: 1,
      bookingReference: 'RITZ-2024-003',
      totalPrice: '£3,200.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-03-01',
      customer: {
        email: 'michael.brown@email.com',
        phone: '+44 7700 900789',
        loyaltyTier: 'Platinum Member',
        loyaltyNumber: 'BA456789123'
      },
      payment: { method: 'Credit Card', last4: '9012', amount: '£3,200.00', pointsUsed: '0' }
    },
    {
      id: 'BK-TK-001',
      tripId: 'TRIP-003',
      customerName: 'Michael Brown',
      rewardProgram: 'Platinum Member',
      bookingType: 'Event Ticket',
      addOnBenefits: [
        { title: 'Priority entry', description: 'Fast-track entry lane at venue' },
        { title: 'Complimentary drink', description: '1 drink voucher per ticket' }
      ],
      eventName: 'Premier League Match: Arsenal vs Chelsea',
      eventDate: '2024-04-13',
      venue: 'Emirates Stadium',
      tickets: 1,
      seatCategory: 'Premium',
      bookingReference: 'ARS-CHE-001',
      totalPrice: '£150.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-03-01',
      customer: {
        email: 'michael.brown@email.com',
        phone: '+44 7700 900789',
        loyaltyTier: 'Platinum Member',
        loyaltyNumber: 'BA456789123'
      },
      payment: { method: 'Credit Card', last4: '9012', amount: '£150.00', pointsUsed: '0' }
    },

    // Single booking trips (individual trips)
    {
      id: 'BK-ES-002',
      tripId: 'TRIP-ES-002',
      customerName: 'Emma Wilson',
      rewardProgram: 'Gold Member',
      bookingType: 'eSIM',
      destination: 'Japan',
      dataAllowance: '15GB',
      validity: '21 days',
      networkProvider: 'NTT Docomo',
      bookingReference: 'ESIM-JP-002',
      totalPrice: '£35.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-02-20',
      customer: {
        email: 'emma.wilson@email.com',
        phone: '+44 7700 901234',
        loyaltyTier: 'Gold Member',
        loyaltyNumber: 'BA789123456'
      },
      payment: { method: 'Credit Card', last4: '3456', amount: '£35.00', pointsUsed: '0' }
    },
    {
      id: 'BK-HW-001',
      tripId: 'TRIP-HW-001',
      customerName: 'David Lee',
      rewardProgram: 'Silver Member',
      bookingType: 'Health & Wellness',
      serviceName: 'Spa Treatment Package',
      serviceDate: '2024-04-05',
      location: 'The Dorchester Spa',
      duration: '3 hours',
      bookingReference: 'DOR-SPA-001',
      totalPrice: '£280.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-03-05',
      customer: {
        email: 'david.lee@email.com',
        phone: '+44 7700 901567',
        loyaltyTier: 'Silver Member',
        loyaltyNumber: 'BA321654987'
      },
      payment: { method: 'Credit Card', last4: '7890', amount: '£280.00', pointsUsed: '0' }
    },

    // Single booking trips (individual trips)
    {
      id: 'BK-FL-004',
      tripId: 'TRIP-004',
      customerName: 'Lisa Chen',
      rewardProgram: 'Platinum Member',
      bookingType: 'Flight',
      flightType: 'One Way',
      airline: 'Qatar Airways',
      departureDate: '2024-05-15',
      returnDate: null,
      origin: 'LHR',
      destination: 'DOH',
      passengers: 1,
      bookingReference: 'QR-LHR-DOH-001',
      totalPrice: '£1,200.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-04-01',
      customer: {
        email: 'lisa.chen@email.com',
        phone: '+44 7700 901890',
        loyaltyTier: 'Platinum Member',
        loyaltyNumber: 'BA147258369'
      },
      payment: { method: 'Credit Card', last4: '1111', amount: '£1,200.00', pointsUsed: '0' }
    },
    {
      id: 'BK-HT-004',
      tripId: 'TRIP-005',
      customerName: 'Robert Taylor',
      rewardProgram: 'Gold Member',
      bookingType: 'Hotel',
      hotelName: 'The Savoy',
      checkIn: '2024-06-10',
      checkOut: '2024-06-12',
      nights: 2,
      roomType: 'River View Room',
      guests: 1,
      bookingReference: 'SVY-2024-004',
      totalPrice: '£1,800.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-04-15',
      customer: {
        email: 'robert.taylor@email.com',
        phone: '+44 7700 902123',
        loyaltyTier: 'Gold Member',
        loyaltyNumber: 'BA963852741'
      },
      payment: { method: 'Credit Card', last4: '2222', amount: '£1,800.00', pointsUsed: '0' }
    },
    {
      id: 'BK-TK-002',
      tripId: 'TRIP-006',
      customerName: 'Sophie Martinez',
      rewardProgram: 'Silver Member',
      bookingType: 'Event Ticket',
      eventName: 'Wimbledon Tennis Championships',
      eventDate: '2024-07-08',
      venue: 'All England Lawn Tennis Club',
      tickets: 2,
      seatCategory: 'Centre Court',
      bookingReference: 'WIM-2024-001',
      totalPrice: '£600.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-04-20',
      customer: {
        email: 'sophie.martinez@email.com',
        phone: '+44 7700 902456',
        loyaltyTier: 'Silver Member',
        loyaltyNumber: 'BA852963741'
      },
      payment: { method: 'Credit Card', last4: '3333', amount: '£600.00', pointsUsed: '0' }
    },

    // More single booking trips
    {
      id: 'BK-FT-002',
      tripId: 'TRIP-FT-002',
      customerName: 'Alex Rodriguez',
      rewardProgram: 'Bronze Member',
      bookingType: 'Fast Track',
      airport: 'Gatwick North',
      serviceDate: '2024-05-20',
      serviceType: 'Immigration Fast Track',
      bookingReference: 'LGW-FT-002',
      totalPrice: '£30.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-04-25',
      customer: {
        email: 'alex.rodriguez@email.com',
        phone: '+44 7700 902789',
        loyaltyTier: 'Bronze Member',
        loyaltyNumber: 'BA741852963'
      },
      payment: { method: 'Credit Card', last4: '4444', amount: '£30.00', pointsUsed: '0' }
    },
    {
      id: 'BK-AL-002',
      tripId: 'TRIP-AL-002',
      customerName: 'Jennifer Davis',
      rewardProgram: 'Gold Member',
      bookingType: 'Airport Lounge',
      loungeName: 'Aspire Lounge',
      airport: 'Stansted',
      accessDate: '2024-06-05',
      duration: '4 hours',
      guests: 1,
      bookingReference: 'STN-LG-002',
      totalPrice: '£40.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-05-01',
      customer: {
        email: 'jennifer.davis@email.com',
        phone: '+44 7700 903012',
        loyaltyTier: 'Gold Member',
        loyaltyNumber: 'BA369258147'
      },
      payment: { method: 'Credit Card', last4: '5555', amount: '£40.00', pointsUsed: '0' }
    },

    // Problematic bookings to demonstrate flag UI
    {
      id: 'BK-FL-005',
      tripId: 'TRIP-007',
      customerName: 'Thomas Anderson',
      rewardProgram: 'Platinum Member',
      bookingType: 'Flight',
      flightType: 'Round Trip',
      airline: 'American Airlines',
      departureDate: '2024-06-15',
      returnDate: '2024-06-22',
      origin: 'LHR',
      destination: 'LAX',
      passengers: 2,
      bookingReference: 'AA-LAX-001',
      totalPrice: '£2,500.00',
      pointsUsed: '0',
      status: 'Completed',
      bookingDate: '2024-05-01',
      customer: {
        email: 'thomas.anderson@email.com',
        phone: '+44 7700 903345',
        loyaltyTier: 'Platinum Member',
        loyaltyNumber: 'BA147369258'
      },
      payment: { method: 'Credit Card', last4: '6666', amount: '£2,500.00', pointsUsed: '0' }
    },
    {
      id: 'BK-HT-005',
      tripId: 'TRIP-007',
      customerName: 'Thomas Anderson',
      rewardProgram: 'Platinum Member',
      bookingType: 'Hotel',
      hotelName: 'The Beverly Hills Hotel',
      checkIn: '2024-06-15',
      checkOut: '2024-06-22',
      nights: 7,
      roomType: 'Bungalow Suite',
      guests: 2,
      bookingReference: 'BHH-2024-001',
      totalPrice: '£4,200.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-05-01',
      customer: {
        email: 'thomas.anderson@email.com',
        phone: '+44 7700 903345',
        loyaltyTier: 'Platinum Member',
        loyaltyNumber: 'BA147369258'
      },
      payment: { method: 'Credit Card', last4: '6666', amount: '£4,200.00', pointsUsed: '0' }
    },
    {
      id: 'BK-TK-003',
      tripId: 'TRIP-TK-003',
      customerName: 'Maria Garcia',
      rewardProgram: 'Silver Member',
      bookingType: 'Event Ticket',
      eventName: 'Taylor Swift Concert',
      eventDate: '2024-08-10',
      venue: 'Wembley Stadium',
      tickets: 1,
      seatCategory: 'VIP',
      bookingReference: 'TS-WEM-001',
      totalPrice: '£350.00',
      pointsUsed: '0',
      status: 'Completed',
      bookingDate: '2024-05-10',
      customer: {
        email: 'maria.garcia@email.com',
        phone: '+44 7700 903678',
        loyaltyTier: 'Silver Member',
        loyaltyNumber: 'BA258147369'
      },
      payment: { method: 'Credit Card', last4: '7777', amount: '£350.00', pointsUsed: '0' }
    },
    {
      id: 'BK-ES-003',
      tripId: 'TRIP-ES-003',
      customerName: 'James Wilson',
      rewardProgram: 'Gold Member',
      bookingType: 'eSIM',
      destination: 'Italy',
      dataAllowance: '25GB',
      validity: '30 days',
      networkProvider: 'TIM',
      bookingReference: 'ESIM-IT-001',
      totalPrice: '£45.00',
      pointsUsed: '0',
      status: 'Confirmed',
      bookingDate: '2024-05-15',
      customer: {
        email: 'james.wilson@email.com',
        phone: '+44 7700 904011',
        loyaltyTier: 'Gold Member',
        loyaltyNumber: 'BA369258147'
      },
      payment: { method: 'Credit Card', last4: '8888', amount: '£45.00', pointsUsed: '0' }
    }
  ];

  // Group bookings by trip
  const groupBookingsByTrip = (bookings) => {
    const tripGroups = {};
    
    bookings.forEach(booking => {
      // Generate a trip ID for every booking
      const tripId = booking.tripId || `TRIP-${booking.id}`;
      
      if (!tripGroups[tripId]) {
        tripGroups[tripId] = {
          tripId: tripId,
          bookings: [],
          totalBookings: 0,
          totalValue: 0,
          customerName: booking.customerName,
          tripStatus: 'Confirmed',
          isSingleBooking: false,
          tripType: 'trip'
        };
      }
      
      tripGroups[tripId].bookings.push(booking);
      tripGroups[tripId].totalBookings += 1;
      tripGroups[tripId].totalValue += parseFloat(booking.totalPrice.replace('£', '').replace(',', ''));
    });
    
    // Mark single booking trips and update trip status
    Object.values(tripGroups).forEach(group => {
      if (group.totalBookings === 1) {
        group.isSingleBooking = true;
      }
      // If all bookings in trip are completed, trip is completed
      const allCompleted = group.bookings.every(b => b.status === 'Completed');
      if (allCompleted && group.bookings.length > 0) {
        group.tripStatus = 'Completed';
      }
    });
    
    return Object.values(tripGroups);
  };

  // Group all bookings by trip first to determine trip types
  const allTripGroups = groupBookingsByTrip(mockBookings);

  // Filter bookings based on all criteria
  const filteredBookings = mockBookings.filter(booking => {
    // Booking type filter
    if (filterType !== 'all' && booking.bookingType.toLowerCase() !== filterType.toLowerCase()) {
      return false;
    }

    // Status filter
    if (filterStatus !== 'all' && booking.status.toLowerCase() !== filterStatus.toLowerCase()) {
      return false;
    }

    // Date range filter
    if (filterDateFrom && new Date(booking.bookingDate) < new Date(filterDateFrom)) {
      return false;
    }
    if (filterDateTo && new Date(booking.bookingDate) > new Date(filterDateTo)) {
      return false;
    }

    // Search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const tripId = booking.tripId || `TRIP-${booking.id}`;
      return (
        booking.customerName.toLowerCase().includes(searchLower) ||
        booking.bookingReference.toLowerCase().includes(searchLower) ||
        booking.id.toLowerCase().includes(searchLower) ||
        tripId.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  // Group filtered bookings by trip
  const tripGroups = groupBookingsByTrip(filteredBookings);

  const openBookingModal = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBooking(null);
  };

  const clearFilters = () => {
    setFilterType('all');
    setFilterStatus('all');
    setFilterDateFrom('');
    setFilterDateTo('');
    setSearchTerm('');
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'confirmed': return 'status-confirmed';
      case 'pending action': return 'status-pending';
      case 'failed': return 'status-failed';
      case 'completed': return 'status-completed';
      default: return 'status-confirmed';
    }
  };

  const getBookingTypeIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'flight': return '✈️';
      case 'hotel': return '🏨';
      case 'event ticket': return '🎫';
      case 'esim': return '📱';
      case 'health & wellness': return '🧘';
      case 'fast track': return '⚡';
      case 'airport lounge': return '🛋️';
      case 'airport dining': return '🍽️';
      case 'airport transfer': return '🚗';
      default: return '📋';
    }
  };

  const renderAddOnBenefitsInItinerary = () => {
    const benefits = selectedBooking?.addOnBenefits || [];
    if (!benefits || benefits.length === 0) return null;

    return (
      <div className="passenger-info">
        <h4>Add-on Benefits</h4>
        <div className="passenger-list">
          {benefits.map((benefit, index) => (
            <div key={index} className="passenger-item">
              <span className="passenger-name">{benefit.title || benefit}</span>
              <span className="passenger-type">{benefit.description || 'Included'}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const activeFiltersCount = [
    filterType !== 'all',
    filterStatus !== 'all',
    filterDateFrom || filterDateTo,
    searchTerm
  ].filter(Boolean).length;

  return (
    <div className="bookings-container">
      {/* Modern Filters Header */}
      <div className="bookings-filters-header">
        <div className="filters-left">
          <button 
            className={`filters-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="filter-icon">🔍</span>
            <span className="filter-text">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="filter-badge">{activeFiltersCount}</span>
            )}
          </button>
        </div>

        <div className="filters-right">
          {activeFiltersCount > 0 && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Expandable Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Order Type</label>
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="modern-select"
              >
                <option value="all">All Types</option>
                <option value="flight">✈️ Flights</option>
                <option value="hotel">🏨 Hotels</option>
                <option value="event ticket">🎫 Event Tickets</option>
                <option value="esim">📱 eSIM</option>
                <option value="health & wellness">🧘 Health & Wellness</option>
                <option value="fast track">⚡ Fast Track</option>
                <option value="airport lounge">🛋️ Airport Lounge</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="modern-select"
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Order Date Range</label>
              <div className="date-range">
                <input
                  type="date"
                  value={filterDateFrom}
                  onChange={(e) => setFilterDateFrom(e.target.value)}
                  className="modern-date-input"
                  placeholder="From"
                />
                <span className="date-separator">to</span>
                <input
                  type="date"
                  value={filterDateTo}
                  onChange={(e) => setFilterDateTo(e.target.value)}
                  className="modern-date-input"
                  placeholder="To"
                />
              </div>
            </div>

          </div>
        </div>
      )}



      {/* Orders Table */}
      <div className="bookings-table-container">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Type</th>
              <th>Service Date</th>
              <th>Benefit Type</th>
              <th>Total Price</th>
              <th>Customer Purchase</th>
              <th>Funded Cost</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {tripGroups.map(tripGroup => (
               <React.Fragment key={tripGroup.tripId}>
                 {/* Trip Header Row */}
                 {(
                   <tr className="trip-header-row">
                     <td colSpan="10" className="trip-header">
                       <div className="trip-header-content">
                         <div className="trip-info">
                           <button 
                             className="trip-toggle-btn"
                             onClick={() => toggleTrip(tripGroup.tripId)}
                             title={collapsedTrips[tripGroup.tripId] ? "Expand trip" : "Collapse trip"}
                           >
                             <span className={`trip-toggle-icon ${collapsedTrips[tripGroup.tripId] ? 'collapsed' : ''}`}>
                               ▼
                             </span>
                           </button>
                           <span className="trip-icon">🌍</span>
                           <span className="trip-id">{tripGroup.tripId}</span>
                           <span className="trip-customer">{tripGroup.customerName}</span>
                           <span className="trip-summary">
                             {tripGroup.totalBookings} booking{tripGroup.totalBookings > 1 ? 's' : ''} • 
                             Total: £{tripGroup.totalValue.toLocaleString()}
                           </span>
                         </div>
                         <div className="trip-status">
                           <span className={`trip-status-badge ${getStatusColor(tripGroup.tripStatus)}`}>
                             {tripGroup.tripStatus}
                           </span>
                         </div>
                       </div>
                     </td>
                   </tr>
                 )}
                 
                 {/* Collapsed Trip Summary Row */}
                 {collapsedTrips[tripGroup.tripId] && (
                   <tr className="trip-collapsed-row">
                     <td className="trip-id-cell">
                       <span className="trip-indicator">🔗</span>
                     </td>
                     <td className="booking-id">
                       <span className="id-text">{tripGroup.tripId}</span>
                       <span className="ref-text">Trip Summary</span>
                     </td>
                     <td className="customer-name">
                       {tripGroup.customerName}
                     </td>
                     <td className="booking-type">
                       <span className="type-icon">🌍</span>
                       <span className="type-text">Trip ({tripGroup.totalBookings} bookings)</span>
                     </td>
                     <td className="booking-date">
                       {tripGroup.bookings[0]?.departureDate || tripGroup.bookings[0]?.checkIn || tripGroup.bookings[0]?.eventDate || 'Multiple'}
                     </td>
                     <td className="benefit-type">
                       {tripGroup.bookings.map(booking => {
                         if (booking.payment.method === 'Entitlement') {
                           return 'Entitlement';
                         } else if (booking.payment.method === 'Points') {
                           return 'Points';
                         } else if (booking.payment.method === 'Points + Cash' && booking.pointsUsed !== '0') {
                           return 'Points';
                         } else if (booking.payment.method === 'Discount') {
                           return 'Discount';
                         }
                         return null;
                       }).filter((value, index, self) => self.indexOf(value) === index).filter(Boolean).join(', ') || '-'}
                     </td>
                     <td className="total-price">
                       £{tripGroup.totalValue.toLocaleString()}
                     </td>
                     <td className="cash-paid">
                       £{tripGroup.bookings.reduce((sum, booking) => {
                         const cash = booking.payment.method === 'Credit Card' ? parseFloat(booking.totalPrice.replace('£', '').replace(',', '')) :
                                    booking.payment.method === 'Points + Cash' ? parseFloat(booking.payment.cash.replace('£', '').replace(',', '')) :
                                    booking.payment.method === 'Discount' ? parseFloat(booking.payment.customerPaid.replace('£', '').replace(',', '')) :
                                    0;
                         return sum + cash;
                       }, 0).toLocaleString()}
                     </td>
                     <td className="funded-cost">
                       £{tripGroup.bookings.reduce((sum, booking) => {
                         const funded = booking.payment.method === 'Entitlement' ? parseFloat(booking.totalPrice.replace('£', '').replace(',', '')) :
                                      booking.payment.method === 'Discount' ? parseFloat(booking.payment.discountAmount.replace('£', '').replace(',', '')) :
                                      0;
                         return sum + funded;
                       }, 0).toLocaleString()}
                     </td>
                     <td className="booking-status">
                       <span className={`status-badge ${getStatusColor(tripGroup.tripStatus)}`}>
                         {tripGroup.tripStatus}
                       </span>
                     </td>
                     <td className="booking-actions">
                       <button
                         className="view-details-btn"
                         onClick={() => toggleTrip(tripGroup.tripId)}
                       >
                         Expand Trip
                       </button>
                     </td>
                   </tr>
                 )}
                 
                 {/* Booking Rows */}
                 {!collapsedTrips[tripGroup.tripId] && 
                   tripGroup.bookings.map((booking, index) => (
                   <tr key={booking.id} className="booking-row trip-booking">
                     <td className="trip-id-cell">
                       <span className="trip-indicator">🔗</span>
                     </td>
                <td className="booking-id">
                  <span className="id-text">{booking.id}</span>
                  <span className="ref-text">{booking.bookingReference}</span>
                </td>
                <td className="customer-name">
                  {booking.customerName}
                </td>
                <td className="booking-type">
                  <span className="type-icon">{getBookingTypeIcon(booking.bookingType)}</span>
                  <span className="type-text">{booking.bookingType}</span>
                </td>
                <td className="booking-date">
                  {booking.bookingType === 'Flight' && booking.departureDate}
                  {booking.bookingType === 'Hotel' && booking.checkIn}
                  {booking.bookingType === 'Event Ticket' && booking.eventDate}
                  {booking.bookingType === 'eSIM' && 'Active'}
                  {booking.bookingType === 'Health & Wellness' && booking.serviceDate}
                  {booking.bookingType === 'Fast Track' && booking.serviceDate}
                  {booking.bookingType === 'Airport Lounge' && booking.accessDate}
                </td>
                <td className="benefit-type">
                  {booking.payment.method === 'Entitlement' ? 'Entitlement' :
                   booking.payment.method === 'Points' ? 'Points' :
                   booking.payment.method === 'Points + Cash' && booking.pointsUsed !== '0' ? 'Points' :
                   booking.payment.method === 'Discount' ? 'Discount' :
                   '-'}
                </td>
                <td className="total-price">
                  {booking.totalPrice}
                </td>
                <td className="cash-paid">
                  {booking.payment.method === 'Credit Card' ? booking.totalPrice :
                   booking.payment.method === 'Points + Cash' ? booking.payment.cash :
                   booking.payment.method === 'Discount' ? booking.payment.customerPaid :
                   '-'}
                </td>
                <td className="funded-cost">
                  {booking.payment.method === 'Entitlement' ? booking.totalPrice :
                   booking.payment.method === 'Points' ? '-' :
                   booking.payment.method === 'Points + Cash' && booking.pointsUsed !== '0' ? '-' :
                   booking.payment.method === 'Discount' ? booking.payment.discountAmount :
                   '-'}
                </td>
                <td className="booking-status">
                  <span className={`status-badge ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="booking-actions">
                  <button
                    className="view-details-btn"
                    onClick={() => openBookingModal(booking)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
                 ))}
               </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Booking Details */}
      {modalOpen && selectedBooking && (
        <div className="modal-overlay" style={{zIndex: 9999}} onClick={closeModal}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-content">
                <div className="modal-title-section">
                  <div className="booking-type-badge">
                    <span className="type-icon">{getBookingTypeIcon(selectedBooking.bookingType)}</span>
                    <span className="type-text">{selectedBooking.bookingType}</span>
                  </div>
                  <h2>{selectedBooking.id}</h2>
                  <div className="booking-status-row">
                    <span className={`status-badge ${getStatusColor(selectedBooking.status)}`}>
                      {selectedBooking.status}
                    </span>
                  </div>
                </div>
                <button className="modal-close" onClick={closeModal}>×</button>
              </div>
            </div>
            <div className="modal-body">
              {selectedBooking.bookingType === 'Flight' ? (
                <div className="booking-detail-sections">
                  {/* Booking Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('booking')}>
                      <div className="section-title">
                        <span className="section-icon">📋</span>
                        <h3>Booking Information</h3>
                      </div>
                                             <span className={`collapse-icon ${collapsedSections.booking ? 'collapsed' : ''}`}>▼</span>
                    </div>
                                         <div className={`section-content ${collapsedSections.booking ? 'collapsed' : ''}`} id="booking-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Booking ID</span>
                          <span className="detail-value">{selectedBooking.id}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Airline Booking Reference</span>
                          <span className="detail-value">{selectedBooking.bookingReference}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Airline</span>
                          <span className="detail-value">{selectedBooking.airline}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cabin Class</span>
                          <span className="detail-value">Economy</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Fare Class</span>
                          <span className="detail-value">Y</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Fare Family</span>
                          <span className="detail-value">Standard</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Booking Date</span>
                          <span className="detail-value">{selectedBooking.bookingDate}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Ticket Issued</span>
                          <span className="detail-value">Yes</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Bags Included</span>
                          <span className="detail-value">1 x 23kg</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Bags Purchased</span>
                          <span className="detail-value">1 x 23kg</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Seat Selection Included</span>
                          <span className="detail-value">No</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Seat Purchased</span>
                          <span className="detail-value">Yes</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('itinerary')}>
                      <div className="section-title">
                        <span className="section-icon">✈️</span>
                        <h3>Itinerary</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.itinerary ? 'collapsed' : ''}`}>▼</span>
                    </div>
                                         <div className={`section-content ${collapsedSections.itinerary ? 'collapsed' : ''}`} id="itinerary-content">
                      <div className="flight-itinerary">
                        <div className="flight-route">
                          <div className="route-header">
                            <span className="route-label">Outbound</span>
                            <span className="route-date">{selectedBooking.departureDate}</span>
                          </div>
                          <div className="flight-details">
                            <div className="flight-segment">
                              <div className="airport-info">
                                <div className="airport-code">{selectedBooking.origin}</div>
                                <div className="airport-name">New York JFK</div>
                              </div>
                              <div className="flight-info">
                                <div className="flight-number">BA 203</div>
                                <div className="flight-times">
                                  <span className="departure-time">10:30</span>
                                  <span className="flight-duration">7h 30m</span>
                                  <span className="arrival-time">13:00</span>
                                </div>
                              </div>
                              <div className="airport-info">
                                <div className="airport-code">{selectedBooking.destination}</div>
                                <div className="airport-name">London Heathrow</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {selectedBooking.flightType === 'Round Trip' && (
                          <div className="flight-route">
                            <div className="route-header">
                              <span className="route-label">Inbound</span>
                              <span className="route-date">{selectedBooking.returnDate}</span>
                            </div>
                            <div className="flight-details">
                              <div className="flight-segment">
                                <div className="airport-info">
                                  <div className="airport-code">{selectedBooking.destination}</div>
                                  <div className="airport-name">London Heathrow</div>
                                </div>
                                <div className="flight-info">
                                  <div className="flight-number">BA 204</div>
                                  <div className="flight-times">
                                    <span className="departure-time">15:30</span>
                                    <span className="flight-duration">7h 30m</span>
                                    <span className="arrival-time">04:00</span>
                                  </div>
                                </div>
                                <div className="airport-info">
                                  <div className="airport-code">{selectedBooking.origin}</div>
                                  <div className="airport-name">New York JFK</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {renderAddOnBenefitsInItinerary()}
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('customer')}>
                      <div className="section-title">
                        <span className="section-icon">👤</span>
                        <h3>Customer Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.customer ? 'collapsed' : ''}`}>▼</span>
                    </div>
                                         <div className={`section-content ${collapsedSections.customer ? 'collapsed' : ''}`} id="customer-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Name</span>
                          <span className="detail-value">{selectedBooking.customerName}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Email</span>
                          <span className="detail-value">{selectedBooking.customer.email}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Phone</span>
                          <span className="detail-value">{selectedBooking.customer.phone}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyTier}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program Number</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('payment')}>
                      <div className="section-title">
                        <span className="section-icon">💳</span>
                        <h3>Payment Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.payment ? 'collapsed' : ''}`}>▼</span>
                    </div>
                                         <div className={`section-content ${collapsedSections.payment ? 'collapsed' : ''}`} id="payment-content">
                      <div className="payment-summary">
                        <div className="payment-total">
                          <span className="total-label">Total Amount</span>
                          <span className="total-amount">{selectedBooking.totalPrice}</span>
                        </div>
                      </div>
                      
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Payment Method</span>
                          <span className="detail-value">{selectedBooking.payment.method}</span>
                        </div>
                        {selectedBooking.payment.method === 'Credit Card' && (
                          <div className="detail-item">
                            <span className="detail-label">Card Last 4</span>
                            <span className="detail-value">**** {selectedBooking.payment.last4}</span>
                          </div>
                        )}
                        <div className="detail-item">
                          <span className="detail-label">Base Fare</span>
                          <span className="detail-value">£1,800.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Taxes & Fees</span>
                          <span className="detail-value">£540.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Discount Applied</span>
                          <span className="detail-value">-£150.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Ancillaries</span>
                          <span className="detail-value">
                            <div className="ancillaries-list">
                              <span className="ancillary-item" title="Seat Selection - Premium Economy Seat">
                                💺 £75.00
                              </span>
                              <span className="ancillary-item" title="Extra Baggage - 1 x 23kg">
                                🧳 £75.00
                              </span>
                            </div>
                          </span>
                        </div>
                        
                        {/* Payment Breakdown */}
                        <div className="payment-breakdown">
                          <h4>Payment Method Breakdown</h4>
                          <div className="breakdown-grid">
                            {selectedBooking.payment.method === 'Credit Card' && (
                              <div className="breakdown-item">
                                <span className="breakdown-label">Credit Card Payment</span>
                                <span className="breakdown-value">{selectedBooking.totalPrice}</span>
                              </div>
                            )}
                            {selectedBooking.payment.method === 'Points + Cash' && (
                              <>
                                <div className="breakdown-item">
                                  <span className="breakdown-label">Points Used</span>
                                  <span className="breakdown-value">{selectedBooking.payment.pointsUsed}</span>
                                </div>
                                <div className="breakdown-item">
                                  <span className="breakdown-label">Cash Payment</span>
                                  <span className="breakdown-value">{selectedBooking.payment.cash}</span>
                                </div>
                              </>
                            )}
                            {selectedBooking.payment.method === 'Points' && (
                              <div className="breakdown-item">
                                <span className="breakdown-label">Points Used</span>
                                <span className="breakdown-value">{selectedBooking.payment.pointsUsed}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedBooking.bookingType === 'Hotel' ? (
                <div className="booking-detail-sections">
                  {/* Booking Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('booking')}>
                      <div className="section-title">
                        <span className="section-icon">📋</span>
                        <h3>Booking Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.booking ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.booking ? 'collapsed' : ''}`} id="booking-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Booking ID</span>
                          <span className="detail-value">{selectedBooking.id}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Hotel Booking Reference</span>
                          <span className="detail-value">{selectedBooking.bookingReference}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Booking Date</span>
                          <span className="detail-value">{selectedBooking.bookingDate}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Chain Name</span>
                          <span className="detail-value">The Ritz London</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Property Type</span>
                          <span className="detail-value">Luxury Hotel</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Star Rating</span>
                          <span className="detail-value">⭐⭐⭐⭐⭐</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Property Phone</span>
                          <span className="detail-value">+44 20 7493 8181</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Property Email</span>
                          <span className="detail-value">reservations@theritzlondon.com</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cancellation Policy</span>
                          <span className="detail-value">Free cancellation until 24h before check-in</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cancellation Cost</span>
                          <span className="detail-value">£0.00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('itinerary')}>
                      <div className="section-title">
                        <span className="section-icon">🏨</span>
                        <h3>Itinerary</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.itinerary ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.itinerary ? 'collapsed' : ''}`} id="itinerary-content">
                      <div className="hotel-itinerary">
                        <div className="hotel-stay">
                          <div className="stay-header">
                            <span className="stay-label">Hotel Stay</span>
                            <span className="stay-nights">{selectedBooking.nights} nights</span>
                          </div>
                          <div className="stay-details">
                            <div className="stay-segment">
                              <div className="check-info">
                                <div className="check-label">Check-in</div>
                                <div className="check-date">{selectedBooking.checkIn}</div>
                                <div className="check-time">15:00</div>
                              </div>
                              <div className="stay-info">
                                <div className="room-name">{selectedBooking.roomType}</div>
                                <div className="hotel-name">{selectedBooking.hotelName}</div>
                                <div className="hotel-address">150 Piccadilly, St. James's, London W1J 9BR, UK</div>
                                <div className="breakfast-info">Breakfast Included</div>
                              </div>
                              <div className="check-info">
                                <div className="check-label">Check-out</div>
                                <div className="check-date">{selectedBooking.checkOut}</div>
                                <div className="check-time">11:00</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {renderAddOnBenefitsInItinerary()}
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('customer')}>
                      <div className="section-title">
                        <span className="section-icon">👤</span>
                        <h3>Customer Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.customer ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.customer ? 'collapsed' : ''}`} id="customer-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Name</span>
                          <span className="detail-value">{selectedBooking.customerName}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Email</span>
                          <span className="detail-value">{selectedBooking.customer.email}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Phone</span>
                          <span className="detail-value">{selectedBooking.customer.phone}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyTier}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program Number</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('payment')}>
                      <div className="section-title">
                        <span className="section-icon">💳</span>
                        <h3>Payment Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.payment ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.payment ? 'collapsed' : ''}`} id="payment-content">
                      <div className="payment-summary">
                        <div className="payment-total">
                          <span className="total-label">Total Amount</span>
                          <span className="total-amount">{selectedBooking.totalPrice}</span>
                        </div>
                      </div>
                      
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Payment Method</span>
                          <span className="detail-value">{selectedBooking.payment.method}</span>
                        </div>
                        {selectedBooking.payment.method === 'Credit Card' && (
                          <div className="detail-item">
                            <span className="detail-label">Card Last 4</span>
                            <span className="detail-value">**** {selectedBooking.payment.last4}</span>
                          </div>
                        )}
                        <div className="detail-item">
                          <span className="detail-label">Base Rate</span>
                          <span className="detail-value">£2,800.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Taxes & Fees</span>
                          <span className="detail-value">£700.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Discount Applied</span>
                          <span className="detail-value">-£200.00</span>
                        </div>
                        
                        {/* Payment Breakdown */}
                        <div className="payment-breakdown">
                          <h4>Payment Method Breakdown</h4>
                          <div className="breakdown-grid">
                            {selectedBooking.payment.method === 'Credit Card' && (
                              <div className="breakdown-item">
                                <span className="breakdown-label">Credit Card Payment</span>
                                <span className="breakdown-value">{selectedBooking.totalPrice}</span>
                              </div>
                            )}
                            {selectedBooking.payment.method === 'Points + Cash' && (
                              <>
                                <div className="breakdown-item">
                                  <span className="breakdown-label">Points Used</span>
                                  <span className="breakdown-value">{selectedBooking.payment.pointsUsed}</span>
                                </div>
                                <div className="breakdown-item">
                                  <span className="breakdown-label">Cash Payment</span>
                                  <span className="breakdown-value">{selectedBooking.payment.cash}</span>
                                </div>
                              </>
                            )}
                            {selectedBooking.payment.method === 'Points' && (
                              <div className="breakdown-item">
                                <span className="breakdown-label">Points Used</span>
                                <span className="breakdown-value">{selectedBooking.payment.pointsUsed}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedBooking.bookingType === 'Event Ticket' ? (
                <div className="booking-detail-sections">
                  {/* Booking Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('booking')}>
                      <div className="section-title">
                        <span className="section-icon">📋</span>
                        <h3>Booking Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.booking ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.booking ? 'collapsed' : ''}`} id="booking-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Booking ID</span>
                          <span className="detail-value">{selectedBooking.id}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Event Ticket Booking Reference</span>
                          <span className="detail-value">{selectedBooking.bookingReference}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Booking Date</span>
                          <span className="detail-value">{selectedBooking.bookingDate}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Event Type</span>
                          <span className="detail-value">Sports</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Event Country</span>
                          <span className="detail-value">United Kingdom</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Event City</span>
                          <span className="detail-value">London</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Event Provider Name</span>
                          <span className="detail-value">UEFA</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Event Phone</span>
                          <span className="detail-value">+44 20 7386 9000</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Event Email</span>
                          <span className="detail-value">tickets@uefa.com</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cancellation Policy</span>
                          <span className="detail-value">Non-refundable</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cancellation Cost</span>
                          <span className="detail-value">Full amount</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('itinerary')}>
                      <div className="section-title">
                        <span className="section-icon">🎫</span>
                        <h3>Itinerary</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.itinerary ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.itinerary ? 'collapsed' : ''}`} id="itinerary-content">
                      <div className="event-itinerary">
                        <div className="event-details">
                          <div className="event-header">
                            <span className="event-label">Event Details</span>
                            <span className="event-category">{selectedBooking.seatCategory}</span>
                          </div>
                          <div className="event-content">
                            <div className="event-segment">
                              <div className="event-info">
                                <div className="event-name">{selectedBooking.eventName}</div>
                                <div className="event-venue">{selectedBooking.venue}</div>
                                <div className="event-address">Wembley Way, London HA9 0WS, UK</div>
                                <div className="event-duration">Duration: 3 hours</div>
                              </div>
                              <div className="event-timing">
                                <div className="timing-info">
                                  <div className="timing-label">Event Start</div>
                                  <div className="timing-date">{selectedBooking.eventDate}</div>
                                  <div className="timing-time">20:00</div>
                                </div>
                                <div className="timing-info">
                                  <div className="timing-label">Event End</div>
                                  <div className="timing-date">{selectedBooking.eventDate}</div>
                                  <div className="timing-time">23:00</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {renderAddOnBenefitsInItinerary()}
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('customer')}>
                      <div className="section-title">
                        <span className="section-icon">👤</span>
                        <h3>Customer Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.customer ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.customer ? 'collapsed' : ''}`} id="customer-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Name</span>
                          <span className="detail-value">{selectedBooking.customerName}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Email</span>
                          <span className="detail-value">{selectedBooking.customer.email}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Phone</span>
                          <span className="detail-value">{selectedBooking.customer.phone}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyTier}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program Number</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('payment')}>
                      <div className="section-title">
                        <span className="section-icon">💳</span>
                        <h3>Payment Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.payment ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.payment ? 'collapsed' : ''}`} id="payment-content">
                      <div className="payment-summary">
                        <div className="payment-total">
                          <span className="total-label">Total Amount</span>
                          <span className="total-amount">{selectedBooking.totalPrice}</span>
                        </div>
                      </div>
                      
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Payment Method</span>
                          <span className="detail-value">{selectedBooking.payment.method}</span>
                        </div>
                        {selectedBooking.payment.method === 'Credit Card' && (
                          <div className="detail-item">
                            <span className="detail-label">Card Last 4</span>
                            <span className="detail-value">**** {selectedBooking.payment.last4}</span>
                          </div>
                        )}
                        <div className="detail-item">
                          <span className="detail-label">Base Ticket Price</span>
                          <span className="detail-value">£1,000.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Taxes & Fees</span>
                          <span className="detail-value">£200.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Discount Applied</span>
                          <span className="detail-value">-£0.00</span>
                        </div>
                        
                        {/* Payment Breakdown */}
                        <div className="payment-breakdown">
                          <h4>Payment Method Breakdown</h4>
                          <div className="breakdown-grid">
                            {selectedBooking.payment.method === 'Credit Card' && (
                              <div className="breakdown-item">
                                <span className="breakdown-label">Credit Card Payment</span>
                                <span className="breakdown-value">{selectedBooking.totalPrice}</span>
                              </div>
                            )}
                            {selectedBooking.payment.method === 'Points + Cash' && (
                              <>
                                <div className="breakdown-item">
                                  <span className="breakdown-label">Points Used</span>
                                  <span className="breakdown-value">{selectedBooking.payment.pointsUsed}</span>
                                </div>
                                <div className="breakdown-item">
                                  <span className="breakdown-label">Cash Payment</span>
                                  <span className="breakdown-value">{selectedBooking.payment.cash}</span>
                                </div>
                              </>
                            )}
                            {selectedBooking.payment.method === 'Points' && (
                              <div className="breakdown-item">
                                <span className="breakdown-label">Points Used</span>
                                <span className="breakdown-value">{selectedBooking.payment.pointsUsed}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedBooking.bookingType === 'eSIM' ? (
                <div className="booking-detail-sections">
                  {/* Booking Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('booking')}>
                      <div className="section-title">
                        <span className="section-icon">📋</span>
                        <h3>Booking Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.booking ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.booking ? 'collapsed' : ''}`} id="booking-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Booking ID</span>
                          <span className="detail-value">{selectedBooking.id}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">eSIM Booking Reference</span>
                          <span className="detail-value">{selectedBooking.bookingReference}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Booking Date</span>
                          <span className="detail-value">{selectedBooking.bookingDate}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">eSIM Provider</span>
                          <span className="detail-value">{selectedBooking.networkProvider}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">eSIM Phone</span>
                          <span className="detail-value">+44 20 7946 0958</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">eSIM Email</span>
                          <span className="detail-value">support@esimprovider.com</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cancellation Policy</span>
                          <span className="detail-value">Non-refundable once activated</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">eSIM Count</span>
                          <span className="detail-value">1</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cancellation Cost</span>
                          <span className="detail-value">Full amount if activated</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('itinerary')}>
                      <div className="section-title">
                        <span className="section-icon">📱</span>
                        <h3>Itinerary</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.itinerary ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.itinerary ? 'collapsed' : ''}`} id="itinerary-content">
                      <div className="esim-itinerary">
                        <div className="esim-details">
                          <div className="esim-header">
                            <span className="esim-label">eSIM Details</span>
                            <span className="esim-status">Active</span>
                          </div>
                          <div className="esim-content">
                            <div className="esim-segment">
                              <div className="esim-info">
                                <div className="esim-destination">🌏 {selectedBooking.destination}</div>
                                <div className="esim-provider">{selectedBooking.networkProvider}</div>
                                <div className="esim-data">{selectedBooking.dataAllowance}</div>
                                <div className="esim-validity">Valid for {selectedBooking.validity}</div>
                              </div>
                              <div className="esim-timing">
                                <div className="timing-info">
                                  <div className="timing-label">Start Date</div>
                                  <div className="timing-date">2024-02-01</div>
                                  <div className="timing-time">00:00</div>
                                </div>
                                <div className="timing-info">
                                  <div className="timing-label">End Date</div>
                                  <div className="timing-date">2024-03-02</div>
                                  <div className="timing-time">23:59</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="esim-features">
                          <h4>eSIM Features</h4>
                          <div className="features-list">
                            <div className="feature-item">
                              <span className="feature-icon">📶</span>
                              <span className="feature-name">4G/5G Coverage</span>
                            </div>
                            <div className="feature-item">
                              <span className="feature-icon">🌍</span>
                              <span className="feature-name">Country-wide Coverage</span>
                            </div>
                            <div className="feature-item">
                              <span className="feature-icon">⚡</span>
                              <span className="feature-name">Instant Activation</span>
                            </div>
                            <div className="feature-item">
                              <span className="feature-icon">📞</span>
                              <span className="feature-name">Local Phone Number</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('customer')}>
                      <div className="section-title">
                        <span className="section-icon">👤</span>
                        <h3>Customer Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.customer ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.customer ? 'collapsed' : ''}`} id="customer-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Name</span>
                          <span className="detail-value">{selectedBooking.customerName}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Email</span>
                          <span className="detail-value">{selectedBooking.customer.email}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Phone</span>
                          <span className="detail-value">{selectedBooking.customer.phone}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyTier}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program Number</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('payment')}>
                      <div className="section-title">
                        <span className="section-icon">💳</span>
                        <h3>Payment Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.payment ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.payment ? 'collapsed' : ''}`} id="payment-content">
                      <div className="payment-summary">
                        <div className="payment-total">
                          <span className="total-label">Total Amount</span>
                          <span className="total-amount">{selectedBooking.totalPrice}</span>
                        </div>
                      </div>
                      
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Payment Method</span>
                          <span className="detail-value">{selectedBooking.payment.method}</span>
                        </div>
                        {selectedBooking.payment.method === 'Credit Card' && (
                          <div className="detail-item">
                            <span className="detail-label">Card Last 4</span>
                            <span className="detail-value">**** {selectedBooking.payment.last4}</span>
                          </div>
                        )}
                        <div className="detail-item">
                          <span className="detail-label">Base eSIM Price</span>
                          <span className="detail-value">£35.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Taxes & Fees</span>
                          <span className="detail-value">£10.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Discount Applied</span>
                          <span className="detail-value">-£0.00</span>
                        </div>
                        
                        {/* Payment Breakdown */}
                        <div className="payment-breakdown">
                          <h4>Payment Method Breakdown</h4>
                          <div className="breakdown-grid">
                            {selectedBooking.payment.method === 'Credit Card' && (
                              <div className="breakdown-item">
                                <span className="breakdown-label">Credit Card Payment</span>
                                <span className="breakdown-value">{selectedBooking.totalPrice}</span>
                              </div>
                            )}
                            {selectedBooking.payment.method === 'Points + Cash' && (
                              <>
                                <div className="breakdown-item">
                                  <span className="breakdown-label">Points Used</span>
                                  <span className="breakdown-value">{selectedBooking.payment.pointsUsed}</span>
                                </div>
                                <div className="breakdown-item">
                                  <span className="breakdown-label">Cash Payment</span>
                                  <span className="breakdown-value">{selectedBooking.payment.cash}</span>
                                </div>
                              </>
                            )}
                            {selectedBooking.payment.method === 'Points' && (
                              <div className="breakdown-item">
                                <span className="breakdown-label">Points Used</span>
                                <span className="breakdown-value">{selectedBooking.payment.pointsUsed}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedBooking.bookingType === 'Health & Wellness' ? (
                <div className="booking-detail-sections">
                  {/* Booking Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('booking')}>
                      <div className="section-title">
                        <span className="section-icon">📋</span>
                        <h3>Booking Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.booking ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.booking ? 'collapsed' : ''}`} id="booking-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Booking ID</span>
                          <span className="detail-value">{selectedBooking.id}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Booking Reference</span>
                          <span className="detail-value">{selectedBooking.bookingReference}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Booking Date</span>
                          <span className="detail-value">{selectedBooking.bookingDate}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">H&W Provider</span>
                          <span className="detail-value">{selectedBooking.location}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">H&W Phone</span>
                          <span className="detail-value">+44 20 7629 8888</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">H&W Email</span>
                          <span className="detail-value">spa@thedorchester.com</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cancellation Policy</span>
                          <span className="detail-value">Free cancellation until 24h before service</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Service Count</span>
                          <span className="detail-value">1</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cancellation Cost</span>
                          <span className="detail-value">£0.00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('itinerary')}>
                      <div className="section-title">
                        <span className="section-icon">🧘</span>
                        <h3>Itinerary</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.itinerary ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.itinerary ? 'collapsed' : ''}`} id="itinerary-content">
                      <div className="wellness-itinerary">
                        <div className="wellness-details">
                          <div className="wellness-header">
                            <span className="wellness-label">Service Details</span>
                            <span className="wellness-category">Spa Treatment</span>
                          </div>
                          <div className="wellness-content">
                            <div className="wellness-segment">
                              <div className="wellness-info">
                                <div className="service-name">{selectedBooking.serviceName}</div>
                                <div className="service-location">{selectedBooking.location}</div>
                                <div className="service-address">53 Park Lane, Mayfair, London W1K 1QA, UK</div>
                                <div className="service-duration">Duration: {selectedBooking.duration}</div>
                              </div>
                              <div className="wellness-timing">
                                <div className="timing-info">
                                  <div className="timing-label">Service Start</div>
                                  <div className="timing-date">{selectedBooking.serviceDate}</div>
                                  <div className="timing-time">14:00</div>
                                </div>
                                <div className="timing-info">
                                  <div className="timing-label">Service End</div>
                                  <div className="timing-date">{selectedBooking.serviceDate}</div>
                                  <div className="timing-time">17:00</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="wellness-features">
                          <h4>Service Features</h4>
                          <div className="features-list">
                            <div className="feature-item">
                              <span className="feature-icon">🛁</span>
                              <span className="feature-name">Luxury Spa Facilities</span>
                            </div>
                            <div className="feature-item">
                              <span className="feature-icon">🧖‍♀️</span>
                              <span className="feature-name">Professional Therapists</span>
                            </div>
                            <div className="feature-item">
                              <span className="feature-icon">🌿</span>
                              <span className="feature-name">Premium Products</span>
                            </div>
                            <div className="feature-item">
                              <span className="feature-icon">☕</span>
                              <span className="feature-name">Refreshments Included</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('customer')}>
                      <div className="section-title">
                        <span className="section-icon">👤</span>
                        <h3>Customer Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.customer ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.customer ? 'collapsed' : ''}`} id="customer-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Name</span>
                          <span className="detail-value">{selectedBooking.customerName}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Email</span>
                          <span className="detail-value">{selectedBooking.customer.email}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Phone</span>
                          <span className="detail-value">{selectedBooking.customer.phone}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyTier}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program Number</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('payment')}>
                      <div className="section-title">
                        <span className="section-icon">💳</span>
                        <h3>Payment Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.payment ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.payment ? 'collapsed' : ''}`} id="payment-content">
                      <div className="payment-summary">
                        <div className="payment-total">
                          <span className="total-label">Total Amount</span>
                          <span className="total-amount">{selectedBooking.totalPrice}</span>
                        </div>
                      </div>
                      
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Payment Method</span>
                          <span className="detail-value">Entitlement</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Base Service Price</span>
                          <span className="detail-value">£250.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Taxes & Fees</span>
                          <span className="detail-value">£30.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Discount Applied</span>
                          <span className="detail-value">-£0.00</span>
                        </div>
                        
                        {/* Payment Breakdown */}
                        <div className="payment-breakdown">
                          <h4>Payment Method Breakdown</h4>
                          <div className="breakdown-grid">
                            <div className="breakdown-item">
                              <span className="breakdown-label">Entitlement Used</span>
                              <span className="breakdown-value">1</span>
                            </div>
                            <div className="breakdown-item">
                              <span className="breakdown-label">Points Used</span>
                              <span className="breakdown-value">0</span>
                            </div>
                            <div className="breakdown-item">
                              <span className="breakdown-label">Cash Payment</span>
                              <span className="breakdown-value">£0.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedBooking.bookingType === 'Fast Track' ? (
                <div className="booking-detail-sections">
                  {/* Booking Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('booking')}>
                      <div className="section-title">
                        <span className="section-icon">📋</span>
                        <h3>Booking Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.booking ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.booking ? 'collapsed' : ''}`} id="booking-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Booking ID</span>
                          <span className="detail-value">{selectedBooking.id}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Booking Reference</span>
                          <span className="detail-value">{selectedBooking.bookingReference}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Booking Date</span>
                          <span className="detail-value">{selectedBooking.bookingDate}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Pre-Book</span>
                          <span className="detail-value">Yes</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Fast Track Provider</span>
                          <span className="detail-value">Airport Fast Track Services</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Fast Track Phone</span>
                          <span className="detail-value">+44 20 7946 0958</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Fast Track Email</span>
                          <span className="detail-value">fasttrack@airportservices.com</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cancellation Policy</span>
                          <span className="detail-value">Free cancellation until 2h before service</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Fast Track Count</span>
                          <span className="detail-value">1</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cancellation Cost</span>
                          <span className="detail-value">£0.00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('itinerary')}>
                      <div className="section-title">
                        <span className="section-icon">⚡</span>
                        <h3>Itinerary</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.itinerary ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.itinerary ? 'collapsed' : ''}`} id="itinerary-content">
                      <div className="fasttrack-itinerary">
                        <div className="fasttrack-details">
                          <div className="fasttrack-header">
                            <span className="fasttrack-label">Fast Track Details</span>
                            <span className="fasttrack-category">{selectedBooking.serviceType}</span>
                          </div>
                          <div className="fasttrack-content">
                            <div className="fasttrack-segment">
                              <div className="fasttrack-info">
                                <div className="airport-name">{selectedBooking.airport}</div>
                                <div className="terminal-info">Terminal 5</div>
                                <div className="location-info">Security Fast Track Lane</div>
                                <div className="fasttrack-date">Date: {selectedBooking.serviceDate}</div>
                                <div className="fasttrack-hours">Hours: 05:00 - 23:00</div>
                                <div className="service-duration">Duration: {selectedBooking.duration}</div>
                              </div>
                              <div className="fasttrack-timing">
                                <div className="timing-info">
                                  <div className="timing-label">Service Start</div>
                                  <div className="timing-date">{selectedBooking.serviceDate}</div>
                                  <div className="timing-time">10:30</div>
                                </div>
                                <div className="timing-info">
                                  <div className="timing-label">Service End</div>
                                  <div className="timing-date">{selectedBooking.serviceDate}</div>
                                  <div className="timing-time">10:45</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="fasttrack-features">
                          <h4>Fast Track Features</h4>
                          <div className="features-list">
                            <div className="feature-item">
                              <span className="feature-icon">🚶‍♂️</span>
                              <span className="feature-name">Dedicated Fast Track Lane</span>
                            </div>
                            <div className="feature-item">
                              <span className="feature-icon">⏱️</span>
                              <span className="feature-name">Priority Processing</span>
                            </div>
                            <div className="feature-item">
                              <span className="feature-icon">📱</span>
                              <span className="feature-name">Digital Pass</span>
                            </div>
                            <div className="feature-item">
                              <span className="feature-icon">🛡️</span>
                              <span className="feature-name">Security Compliant</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('customer')}>
                      <div className="section-title">
                        <span className="section-icon">👤</span>
                        <h3>Customer Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.customer ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.customer ? 'collapsed' : ''}`} id="customer-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Name</span>
                          <span className="detail-value">{selectedBooking.customerName}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Email</span>
                          <span className="detail-value">{selectedBooking.customer.email}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Phone</span>
                          <span className="detail-value">{selectedBooking.customer.phone}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyTier}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program Number</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('payment')}>
                      <div className="section-title">
                        <span className="section-icon">💳</span>
                        <h3>Payment Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.payment ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.payment ? 'collapsed' : ''}`} id="payment-content">
                      <div className="payment-summary">
                        <div className="payment-total">
                          <span className="total-label">Total Amount</span>
                          <span className="total-amount">{selectedBooking.totalPrice}</span>
                        </div>
                      </div>
                      
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Payment Method</span>
                          <span className="detail-value">Entitlement</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Base Fast Track Price</span>
                          <span className="detail-value">£20.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Taxes & Fees</span>
                          <span className="detail-value">£5.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Discount Applied</span>
                          <span className="detail-value">-£0.00</span>
                        </div>
                        
                        {/* Payment Breakdown */}
                        <div className="payment-breakdown">
                          <h4>Payment Method Breakdown</h4>
                          <div className="breakdown-grid">
                            <div className="breakdown-item">
                              <span className="breakdown-label">Entitlement Used</span>
                              <span className="breakdown-value">1</span>
                            </div>
                            <div className="breakdown-item">
                              <span className="breakdown-label">Points Used</span>
                              <span className="breakdown-value">0</span>
                            </div>
                            <div className="breakdown-item">
                              <span className="breakdown-label">Cash Payment</span>
                              <span className="breakdown-value">£0.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedBooking.bookingType === 'Airport Lounge' ? (
                <div className="booking-detail-sections">
                  {/* Booking Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('booking')}>
                      <div className="section-title">
                        <span className="section-icon">📋</span>
                        <h3>Booking Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.booking ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.booking ? 'collapsed' : ''}`} id="booking-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Booking ID</span>
                          <span className="detail-value">{selectedBooking.id}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Booking Reference</span>
                          <span className="detail-value">{selectedBooking.bookingReference}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Booking Date</span>
                          <span className="detail-value">{selectedBooking.bookingDate}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Pre-Book</span>
                          <span className="detail-value">Yes</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Lounge Provider</span>
                          <span className="detail-value">Priority Pass</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Lounge Phone</span>
                          <span className="detail-value">+44 20 7946 0958</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Lounge Email</span>
                          <span className="detail-value">lounge@prioritypass.com</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cancellation Policy</span>
                          <span className="detail-value">Free cancellation until 2h before access</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Guest Count</span>
                          <span className="detail-value">{selectedBooking.guests}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cancellation Cost</span>
                          <span className="detail-value">£0.00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('itinerary')}>
                      <div className="section-title">
                        <span className="section-icon">🛋️</span>
                        <h3>Itinerary</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.itinerary ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.itinerary ? 'collapsed' : ''}`} id="itinerary-content">
                      <div className="lounge-itinerary">
                        <div className="lounge-details">
                          <div className="lounge-header">
                            <span className="lounge-label">Lounge Details</span>
                            <span className="lounge-category">Premium Lounge</span>
                          </div>
                          <div className="lounge-content">
                            <div className="lounge-segment">
                              <div className="lounge-info">
                                <div className="airport-name">{selectedBooking.airport}</div>
                                <div className="terminal-info">Terminal 5</div>
                                <div className="lounge-name">{selectedBooking.loungeName}</div>
                                <div className="lounge-location">Location: After Security, Level 2</div>
                                <div className="lounge-directions">Directions: Take escalator to Level 2, turn right after duty-free</div>
                                <div className="lounge-date">Date: {selectedBooking.accessDate}</div>
                                <div className="lounge-hours">Hours: 06:00 - 22:00</div>
                                <div className="lounge-duration">Duration: {selectedBooking.duration}</div>
                              </div>
                              <div className="lounge-timing">
                                <div className="timing-info">
                                  <div className="timing-label">Access Start</div>
                                  <div className="timing-date">{selectedBooking.accessDate}</div>
                                  <div className="timing-time">14:00</div>
                                </div>
                                <div className="timing-info">
                                  <div className="timing-label">Access End</div>
                                  <div className="timing-date">{selectedBooking.accessDate}</div>
                                  <div className="timing-time">17:00</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="lounge-features">
                          <h4>Lounge Features</h4>
                          <div className="features-list">
                            <div className="feature-item">
                              <span className="feature-icon">🍽️</span>
                              <span className="feature-name">Complimentary Food & Beverages</span>
                            </div>
                            <div className="feature-item">
                              <span className="feature-icon">💺</span>
                              <span className="feature-name">Comfortable Seating</span>
                            </div>
                            <div className="feature-item">
                              <span className="feature-icon">🔌</span>
                              <span className="feature-name">Charging Stations</span>
                            </div>
                            <div className="feature-item">
                              <span className="feature-icon">🛁</span>
                              <span className="feature-name">Shower Facilities</span>
                            </div>
                            <div className="feature-item">
                              <span className="feature-icon">📶</span>
                              <span className="feature-name">Free Wi-Fi</span>
                            </div>
                            <div className="feature-item">
                              <span className="feature-icon">📺</span>
                              <span className="feature-name">TV & Entertainment</span>
                            </div>
                          </div>
                        </div>

                        {renderAddOnBenefitsInItinerary()}
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('customer')}>
                      <div className="section-title">
                        <span className="section-icon">👤</span>
                        <h3>Customer Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.customer ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.customer ? 'collapsed' : ''}`} id="customer-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Name</span>
                          <span className="detail-value">{selectedBooking.customerName}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Email</span>
                          <span className="detail-value">{selectedBooking.customer.email}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Phone</span>
                          <span className="detail-value">{selectedBooking.customer.phone}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyTier}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program Number</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('payment')}>
                      <div className="section-title">
                        <span className="section-icon">💳</span>
                        <h3>Payment Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.payment ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.payment ? 'collapsed' : ''}`} id="payment-content">
                      <div className="payment-summary">
                        <div className="payment-total">
                          <span className="total-label">Total Amount</span>
                          <span className="total-amount">{selectedBooking.totalPrice}</span>
                        </div>
                      </div>
                      
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Payment Method</span>
                          <span className="detail-value">Entitlement</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Base Lounge Price</span>
                          <span className="detail-value">£35.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Taxes & Fees</span>
                          <span className="detail-value">£5.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Discount Applied</span>
                          <span className="detail-value">-£0.00</span>
                        </div>
                        
                        {/* Payment Breakdown */}
                        <div className="payment-breakdown">
                          <h4>Payment Method Breakdown</h4>
                          <div className="breakdown-grid">
                            <div className="breakdown-item">
                              <span className="breakdown-label">Entitlement Used</span>
                              <span className="breakdown-value">1</span>
                            </div>
                            <div className="breakdown-item">
                              <span className="breakdown-label">Points Used</span>
                              <span className="breakdown-value">0</span>
                            </div>
                            <div className="breakdown-item">
                              <span className="breakdown-label">Cash Payment</span>
                              <span className="breakdown-value">£0.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedBooking.bookingType === 'Airport Dining' ? (
                <div className="booking-detail-sections">
                  {/* Booking Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('booking')}>
                      <div className="section-title">
                        <span className="section-icon">📋</span>
                        <h3>Booking Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.booking ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.booking ? 'collapsed' : ''}`} id="booking-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Booking ID</span>
                          <span className="detail-value">{selectedBooking.id}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Booking Reference</span>
                          <span className="detail-value">{selectedBooking.bookingReference}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Booking Date</span>
                          <span className="detail-value">{selectedBooking.bookingDate}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Restaurant Provider</span>
                          <span className="detail-value">DragonPass Dining</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Restaurant Phone</span>
                          <span className="detail-value">+44 20 7946 0958</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Restaurant Email</span>
                          <span className="detail-value">dining@dragonpass.com</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cancellation Policy</span>
                          <span className="detail-value">Free cancellation until 2h before dining</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cancellation Cost</span>
                          <span className="detail-value">£0.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Status</span>
                          <span className={`detail-value status-badge ${getStatusColor(selectedBooking.status)}`}>
                            {selectedBooking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('itinerary')}>
                      <div className="section-title">
                        <span className="section-icon">🍽️</span>
                        <h3>Itinerary</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.itinerary ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.itinerary ? 'collapsed' : ''}`} id="itinerary-content">
                      <div className="dining-itinerary">
                        <div className="dining-details">
                          <div className="dining-header">
                            <span className="dining-label">Dining Details</span>
                            <span className="dining-category">{selectedBooking.cuisine}</span>
                          </div>
                          <div className="dining-content">
                            <div className="dining-segment">
                              <div className="dining-info">
                                <div className="restaurant-name">{selectedBooking.restaurantName}</div>
                                <div className="airport-location">{selectedBooking.airport}</div>
                                <div className="dining-directions">Directions: After Security, Level 2, turn left after duty-free shops</div>
                                <div className="dining-date">Date: {selectedBooking.diningDate}</div>
                                <div className="dining-time">Time: {selectedBooking.diningTime}</div>
                                <div className="dining-hours">Opening Hours: 06:00 - 22:00</div>
                                <div className="dining-guests">Guests: {selectedBooking.guests}</div>
                                <div className="dining-duration">Duration: 2 hours</div>
                              </div>
                              <div className="dining-timing">
                                <div className="timing-info">
                                  <div className="timing-label">Dining Start</div>
                                  <div className="timing-date">{selectedBooking.diningDate}</div>
                                  <div className="timing-time">{selectedBooking.diningTime}</div>
                                </div>
                                <div className="timing-info">
                                  <div className="timing-label">Dining End</div>
                                  <div className="timing-date">{selectedBooking.diningDate}</div>
                                  <div className="timing-time">20:30</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('customer')}>
                      <div className="section-title">
                        <span className="section-icon">👤</span>
                        <h3>Customer Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.customer ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.customer ? 'collapsed' : ''}`} id="customer-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Name</span>
                          <span className="detail-value">{selectedBooking.customerName}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Email</span>
                          <span className="detail-value">{selectedBooking.customer.email}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Phone</span>
                          <span className="detail-value">{selectedBooking.customer.phone}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyTier}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program Number</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('payment')}>
                      <div className="section-title">
                        <span className="section-icon">💳</span>
                        <h3>Payment Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.payment ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.payment ? 'collapsed' : ''}`} id="payment-content">
                      <div className="payment-summary">
                        <div className="payment-total">
                          <span className="total-label">Total Amount</span>
                          <span className="total-amount">{selectedBooking.totalPrice}</span>
                        </div>
                      </div>
                      
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Payment Method</span>
                          <span className="detail-value">Entitlement</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Base Fare</span>
                          <span className="detail-value">£0.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Taxes & Fees</span>
                          <span className="detail-value">£0.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Discount Applied</span>
                          <span className="detail-value">£0.00</span>
                        </div>
                        
                        {/* Payment Breakdown */}
                        <div className="payment-breakdown">
                          <h4>Payment Method Breakdown</h4>
                          <div className="breakdown-grid">
                            <div className="breakdown-item">
                              <span className="breakdown-label">Entitlement Used</span>
                              <span className="breakdown-value">1</span>
                            </div>
                            <div className="breakdown-item">
                              <span className="breakdown-label">Points Used</span>
                              <span className="breakdown-value">0</span>
                            </div>
                            <div className="breakdown-item">
                              <span className="breakdown-label">Cash Payment</span>
                              <span className="breakdown-value">£0.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedBooking.bookingType === 'Airport Transfer' ? (
                <div className="booking-detail-sections">
                  {/* Booking Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('booking')}>
                      <div className="section-title">
                        <span className="section-icon">📋</span>
                        <h3>Booking Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.booking ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.booking ? 'collapsed' : ''}`} id="booking-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Booking ID</span>
                          <span className="detail-value">{selectedBooking.id}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Booking Reference</span>
                          <span className="detail-value">{selectedBooking.bookingReference}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Booking Date</span>
                          <span className="detail-value">{selectedBooking.bookingDate}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Transfer Provider</span>
                          <span className="detail-value">DragonPass Transfers</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Transfer Phone</span>
                          <span className="detail-value">+44 20 7946 0958</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Transfer Email</span>
                          <span className="detail-value">transfers@dragonpass.com</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cancellation Policy</span>
                          <span className="detail-value">Free cancellation until 2h before transfer</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cancellation Cost</span>
                          <span className="detail-value">£0.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Status</span>
                          <span className={`detail-value status-badge ${getStatusColor(selectedBooking.status)}`}>
                            {selectedBooking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('itinerary')}>
                      <div className="section-title">
                        <span className="section-icon">🚗</span>
                        <h3>Itinerary</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.itinerary ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.itinerary ? 'collapsed' : ''}`} id="itinerary-content">
                      <div className="transfer-itinerary">
                        <div className="transfer-details">
                          <div className="transfer-header">
                            <span className="transfer-label">Transfer Details</span>
                            <span className="transfer-category">{selectedBooking.transferType}</span>
                          </div>
                          <div className="transfer-content">
                            <div className="transfer-segment">
                              <div className="transfer-info">
                                <div className="pickup-location">Pickup: {selectedBooking.pickupLocation}</div>
                                <div className="dropoff-location">Dropoff: {selectedBooking.dropoffLocation}</div>
                                <div className="vehicle-type">Vehicle: {selectedBooking.vehicleType}</div>
                                <div className="transfer-date">Date: {selectedBooking.transferDate}</div>
                                <div className="transfer-time">Time: {selectedBooking.transferTime}</div>
                                <div className="transfer-duration">Duration: 45 minutes</div>
                              </div>
                              <div className="transfer-timing">
                                <div className="timing-info">
                                  <div className="timing-label">Pickup Time</div>
                                  <div className="timing-date">{selectedBooking.transferDate}</div>
                                  <div className="timing-time">{selectedBooking.transferTime}</div>
                                </div>
                                <div className="timing-info">
                                  <div className="timing-label">Estimated Arrival</div>
                                  <div className="timing-date">{selectedBooking.transferDate}</div>
                                  <div className="timing-time">06:45</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {renderAddOnBenefitsInItinerary()}
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('customer')}>
                      <div className="section-title">
                        <span className="section-icon">👤</span>
                        <h3>Customer Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.customer ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.customer ? 'collapsed' : ''}`} id="customer-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Name</span>
                          <span className="detail-value">{selectedBooking.customerName}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Email</span>
                          <span className="detail-value">{selectedBooking.customer.email}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Phone</span>
                          <span className="detail-value">{selectedBooking.customer.phone}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyTier}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Reward Program Number</span>
                          <span className="detail-value">{selectedBooking.customer.loyaltyNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="detail-section collapsible">
                    <div className="section-header" onClick={() => toggleSection('payment')}>
                      <div className="section-title">
                        <span className="section-icon">💳</span>
                        <h3>Payment Information</h3>
                      </div>
                      <span className={`collapse-icon ${collapsedSections.payment ? 'collapsed' : ''}`}>▼</span>
                    </div>
                    <div className={`section-content ${collapsedSections.payment ? 'collapsed' : ''}`} id="payment-content">
                      <div className="payment-summary">
                        <div className="payment-total">
                          <span className="total-label">Total Amount</span>
                          <span className="total-amount">{selectedBooking.totalPrice}</span>
                        </div>
                      </div>
                      
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Payment Method</span>
                          <span className="detail-value">Entitlement</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Base Fare</span>
                          <span className="detail-value">£0.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Taxes & Fees</span>
                          <span className="detail-value">£0.00</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Discount Applied</span>
                          <span className="detail-value">£0.00</span>
                        </div>
                        
                        {/* Payment Breakdown */}
                        <div className="payment-breakdown">
                          <h4>Payment Method Breakdown</h4>
                          <div className="breakdown-grid">
                            <div className="breakdown-item">
                              <span className="breakdown-label">Entitlement Used</span>
                              <span className="breakdown-value">1</span>
                            </div>
                            <div className="breakdown-item">
                              <span className="breakdown-label">Points Used</span>
                              <span className="breakdown-value">0</span>
                            </div>
                            <div className="breakdown-item">
                              <span className="breakdown-label">Cash Payment</span>
                              <span className="breakdown-value">£0.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Fallback for other booking types (existing code)
                <div className="booking-detail-sections">
                  {/* Existing sections for other booking types */}
                  <div className="detail-section">
                    <h3>Booking Information</h3>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Booking ID:</span>
                        <span className="detail-value">{selectedBooking.id}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Booking Reference:</span>
                        <span className="detail-value">{selectedBooking.bookingReference}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Booking Date:</span>
                        <span className="detail-value">{selectedBooking.bookingDate}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Status:</span>
                        <span className={`detail-value status-badge ${getStatusColor(selectedBooking.status)}`}>
                          {selectedBooking.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="detail-section">
                    <h3>Customer Information</h3>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Name:</span>
                        <span className="detail-value">{selectedBooking.customerName}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Email:</span>
                        <span className="detail-value">{selectedBooking.customer.email}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Phone:</span>
                        <span className="detail-value">{selectedBooking.customer.phone}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Loyalty Tier:</span>
                        <span className="detail-value">{selectedBooking.customer.loyaltyTier}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Loyalty Number:</span>
                        <span className="detail-value">{selectedBooking.customer.loyaltyNumber}</span>
                      </div>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="detail-section">
                    <h3>Service Details</h3>
                    <div className="detail-grid">



                      
                      
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="detail-section">
                    <h3>Payment Information</h3>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Payment Method:</span>
                        <span className="detail-value">{selectedBooking.payment.method}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Total Price:</span>
                        <span className="detail-value">{selectedBooking.totalPrice}</span>
                      </div>
                      {selectedBooking.payment.method === 'Credit Card' && (
                        <div className="detail-item">
                          <span className="detail-label">Card Last 4:</span>
                          <span className="detail-value">**** {selectedBooking.payment.last4}</span>
                        </div>
                      )}
                      {selectedBooking.payment.method === 'Points + Cash' && (
                        <>
                          <div className="detail-item">
                            <span className="detail-label">Cash Amount:</span>
                            <span className="detail-value">{selectedBooking.payment.cash}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Points Used:</span>
                            <span className="detail-value">{selectedBooking.payment.pointsUsed}</span>
                          </div>
                        </>
                      )}
                      {selectedBooking.payment.method === 'Points' && (
                        <div className="detail-item">
                          <span className="detail-label">Points Used:</span>
                          <span className="detail-value">{selectedBooking.payment.pointsUsed}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="modal-btn secondary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings; 