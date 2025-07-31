import firebase_admin
from firebase_admin import credentials, firestore
import os
from datetime import datetime, timedelta
import json

# Initialize Firebase Admin SDK
FIREBASE_CRED_PATH = os.environ.get('FIREBASE_CRED_PATH', 'firebase-credentials.json')
if os.path.exists(FIREBASE_CRED_PATH):
    cred = credentials.Certificate(FIREBASE_CRED_PATH)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
else:
    print(f"Error: Firebase credentials file '{FIREBASE_CRED_PATH}' not found.")
    exit(1)

def populate_bookings():
    """Populate the Booking_Management collection with all booking data"""
    
    # Collection reference
    bookings_ref = db.collection('Booking_Management')
    
    # All booking data from the frontend with trip grouping
    bookings_data = [
        # Trip 1: John Smith's New York Trip (Flight + Hotel + Airport Services)
        {
            'id': 'BK-FL-001',
            'tripId': 'TRIP-001',
            'customerName': 'John Smith',
            'customer': {
                'email': 'john.smith@email.com',
                'phone': '+44 7700 900123',
                'loyaltyTier': 'Gold Member',
                'loyaltyNumber': 'BA123456789'
            },
            'bookingType': 'Flight',
            'airline': 'British Airways',
            'origin': 'LHR',
            'destination': 'JFK',
            'departureDate': '2024-03-15',
            'returnDate': '2024-03-22',
            'bookingDate': '2024-02-15',
            'bookingReference': 'ABC123456',
            'totalPrice': '£2,190.00',
            'status': 'Confirmed',
            'payment': {
                'method': 'Credit Card',
                'last4': '1234',
                'pointsUsed': '0',
                'cash': '£0.00'
            },
            'flightDetails': {
                'flightType': 'Round Trip',
                'cabinClass': 'Economy',
                'fareClass': 'Y',
                'fareFamily': 'Flex',
                'ticketIssued': 'Yes',
                'bagsIncluded': '1 checked bag',
                'bagsPurchased': '0',
                'seatSelectionIncluded': 'No',
                'seatPurchased': 'Yes',
                'passengers': 1
            },
            'itinerary': {
                'outbound': {
                    'flightNumber': 'BA 203',
                    'departureDate': '2024-03-15',
                    'departureTime': '10:30',
                    'arrivalDate': '2024-03-15',
                    'arrivalTime': '13:45'
                },
                'inbound': {
                    'flightNumber': 'BA 204',
                    'departureDate': '2024-03-22',
                    'departureTime': '15:30',
                    'arrivalDate': '2024-03-23',
                    'arrivalTime': '06:45'
                }
            },
            'ancillaries': [
                {'type': 'seat', 'description': 'Window seat', 'price': '£25.00'},
                {'type': 'bag', 'description': 'Extra checked bag', 'price': '£45.00'}
            ]
        },
        {
            'id': 'BK-HT-001',
            'tripId': 'TRIP-001',
            'customerName': 'John Smith',
            'customer': {
                'email': 'john.smith@email.com',
                'phone': '+44 7700 900123',
                'loyaltyTier': 'Gold Member',
                'loyaltyNumber': 'BA123456789'
            },
            'bookingType': 'Hotel',
            'hotelName': 'The Plaza Hotel',
            'checkIn': '2024-03-15',
            'checkOut': '2024-03-22',
            'nights': 7,
            'roomType': 'Deluxe Room',
            'guests': 1,
            'bookingReference': 'PLZ-2024-001',
            'totalPrice': '£2,800.00',
            'status': 'Confirmed',
            'bookingDate': '2024-02-15',
            'payment': {
                'method': 'Credit Card',
                'last4': '1234',
                'pointsUsed': '0',
                'cash': '£0.00'
            }
        },
        {
            'id': 'BK-AT-001',
            'tripId': 'TRIP-001',
            'customerName': 'John Smith',
            'customer': {
                'email': 'john.smith@email.com',
                'phone': '+44 7700 900123',
                'loyaltyTier': 'Gold Member',
                'loyaltyNumber': 'BA123456789'
            },
            'bookingType': 'Airport Transfer',
            'transferType': 'Private Car',
            'pickupLocation': 'London City Centre',
            'dropoffLocation': 'Heathrow Terminal 5',
            'transferDate': '2024-03-15',
            'transferTime': '06:00',
            'vehicleType': 'Luxury Sedan',
            'bookingReference': 'LHR-AT-001',
            'totalPrice': '£0.00',
            'status': 'Confirmed',
            'bookingDate': '2024-02-15',
            'payment': {
                'method': 'Entitlement',
                'entitlementsUsed': '1'
            }
        },
        {
            'id': 'BK-AL-001',
            'tripId': 'TRIP-001',
            'customerName': 'John Smith',
            'customer': {
                'email': 'john.smith@email.com',
                'phone': '+44 7700 900123',
                'loyaltyTier': 'Gold Member',
                'loyaltyNumber': 'BA123456789'
            },
            'bookingType': 'Airport Lounge',
            'loungeName': 'No.1 Traveller Lounge',
            'airport': 'Heathrow Terminal 5',
            'accessDate': '2024-03-15',
            'duration': '3 hours',
            'guests': 1,
            'bookingReference': 'LHR-LG-001',
            'totalPrice': '£0.00',
            'status': 'Confirmed',
            'bookingDate': '2024-02-15',
            'payment': {
                'method': 'Entitlement',
                'entitlementsUsed': '1'
            }
        },
        {
            'id': 'BK-ES-001',
            'tripId': 'TRIP-001',
            'customerName': 'John Smith',
            'customer': {
                'email': 'john.smith@email.com',
                'phone': '+44 7700 900123',
                'loyaltyTier': 'Gold Member',
                'loyaltyNumber': 'BA123456789'
            },
            'bookingType': 'eSIM',
            'destination': 'United States',
            'dataAllowance': '10GB',
            'validity': '14 days',
            'networkProvider': 'AT&T',
            'bookingReference': 'ESIM-US-001',
            'totalPrice': '£25.00',
            'status': 'Confirmed',
            'bookingDate': '2024-02-15',
            'payment': {
                'method': 'Credit Card',
                'last4': '1234',
                'pointsUsed': '0',
                'cash': '£0.00'
            }
        },

        # Trip 2: Sarah Johnson's Dubai Trip (Flight + Hotel + Fast Track)
        {
            'id': 'BK-FL-002',
            'tripId': 'TRIP-002',
            'customerName': 'Sarah Johnson',
            'customer': {
                'email': 'sarah.johnson@email.com',
                'phone': '+44 7700 900456',
                'loyaltyTier': 'Silver Member',
                'loyaltyNumber': 'BA987654321'
            },
            'bookingType': 'Flight',
            'airline': 'Emirates',
            'origin': 'LHR',
            'destination': 'DXB',
            'departureDate': '2024-03-20',
            'returnDate': '2024-03-27',
            'bookingDate': '2024-02-10',
            'bookingReference': 'EK789012',
            'totalPrice': '£1,850.00',
            'status': 'Confirmed',
            'payment': {
                'method': 'Credit Card',
                'last4': '5678',
                'pointsUsed': '0',
                'cash': '£0.00'
            },
            'flightDetails': {
                'flightType': 'Round Trip',
                'cabinClass': 'Economy',
                'fareClass': 'K',
                'fareFamily': 'Saver',
                'ticketIssued': 'Yes',
                'bagsIncluded': '1 checked bag',
                'bagsPurchased': '0',
                'seatSelectionIncluded': 'No',
                'seatPurchased': 'No',
                'passengers': 2
            },
            'itinerary': {
                'outbound': {
                    'flightNumber': 'EK 001',
                    'departureDate': '2024-03-20',
                    'departureTime': '14:30',
                    'arrivalDate': '2024-03-21',
                    'arrivalTime': '01:45'
                },
                'inbound': {
                    'flightNumber': 'EK 002',
                    'departureDate': '2024-03-27',
                    'departureTime': '08:30',
                    'arrivalDate': '2024-03-27',
                    'arrivalTime': '12:45'
                }
            },
            'ancillaries': []
        },
        {
            'id': 'BK-HT-002',
            'tripId': 'TRIP-002',
            'customerName': 'Sarah Johnson',
            'customer': {
                'email': 'sarah.johnson@email.com',
                'phone': '+44 7700 900456',
                'loyaltyTier': 'Silver Member',
                'loyaltyNumber': 'BA987654321'
            },
            'bookingType': 'Hotel',
            'hotelName': 'Burj Al Arab',
            'checkIn': '2024-03-21',
            'checkOut': '2024-03-27',
            'nights': 6,
            'roomType': 'Deluxe Suite',
            'guests': 2,
            'bookingReference': 'BURJ-2024-002',
            'totalPrice': '£4,200.00',
            'status': 'Confirmed',
            'bookingDate': '2024-02-10',
            'payment': {
                'method': 'Credit Card',
                'last4': '5678',
                'pointsUsed': '0',
                'cash': '£0.00'
            }
        },
        {
            'id': 'BK-FT-001',
            'tripId': 'TRIP-002',
            'customerName': 'Sarah Johnson',
            'customer': {
                'email': 'sarah.johnson@email.com',
                'phone': '+44 7700 900456',
                'loyaltyTier': 'Silver Member',
                'loyaltyNumber': 'BA987654321'
            },
            'bookingType': 'Fast Track',
            'airport': 'Heathrow Terminal 3',
            'serviceDate': '2024-03-20',
            'serviceType': 'Security Fast Track',
            'bookingReference': 'LHR-FT-001',
            'totalPrice': '£25.00',
            'status': 'Confirmed',
            'bookingDate': '2024-02-10',
            'payment': {
                'method': 'Credit Card',
                'last4': '5678',
                'pointsUsed': '0',
                'cash': '£0.00'
            }
        },

        # Trip 3: Michael Brown's London Business Trip (Flight + Hotel + Event)
        {
            'id': 'BK-FL-003',
            'tripId': 'TRIP-003',
            'customerName': 'Michael Brown',
            'customer': {
                'email': 'michael.brown@email.com',
                'phone': '+44 7700 900789',
                'loyaltyTier': 'Platinum Member',
                'loyaltyNumber': 'BA456789123'
            },
            'bookingType': 'Flight',
            'airline': 'Virgin Atlantic',
            'origin': 'JFK',
            'destination': 'LHR',
            'departureDate': '2024-04-10',
            'returnDate': '2024-04-15',
            'bookingDate': '2024-03-01',
            'bookingReference': 'VS456789',
            'totalPrice': '£1,650.00',
            'status': 'Confirmed',
            'payment': {
                'method': 'Credit Card',
                'last4': '9012',
                'pointsUsed': '0',
                'cash': '£0.00'
            },
            'flightDetails': {
                'flightType': 'Round Trip',
                'cabinClass': 'Premium Economy',
                'fareClass': 'W',
                'fareFamily': 'Premium',
                'ticketIssued': 'Yes',
                'bagsIncluded': '2 checked bags',
                'bagsPurchased': '0',
                'seatSelectionIncluded': 'Yes',
                'seatPurchased': 'No',
                'passengers': 1
            },
            'itinerary': {
                'outbound': {
                    'flightNumber': 'VS 138',
                    'departureDate': '2024-04-10',
                    'departureTime': '18:30',
                    'arrivalDate': '2024-04-11',
                    'arrivalTime': '06:45'
                },
                'inbound': {
                    'flightNumber': 'VS 139',
                    'departureDate': '2024-04-15',
                    'departureTime': '10:30',
                    'arrivalDate': '2024-04-15',
                    'arrivalTime': '13:45'
                }
            },
            'ancillaries': [
                {'type': 'seat', 'description': 'Premium seat selection', 'price': '£0.00'}
            ]
        },
        {
            'id': 'BK-HT-003',
            'tripId': 'TRIP-003',
            'customerName': 'Michael Brown',
            'customer': {
                'email': 'michael.brown@email.com',
                'phone': '+44 7700 900789',
                'loyaltyTier': 'Platinum Member',
                'loyaltyNumber': 'BA456789123'
            },
            'bookingType': 'Hotel',
            'hotelName': 'The Ritz London',
            'checkIn': '2024-04-11',
            'checkOut': '2024-04-15',
            'nights': 4,
            'roomType': 'Executive Suite',
            'guests': 1,
            'bookingReference': 'RITZ-2024-003',
            'totalPrice': '£3,200.00',
            'status': 'Confirmed',
            'bookingDate': '2024-03-01',
            'payment': {
                'method': 'Credit Card',
                'last4': '9012',
                'pointsUsed': '0',
                'cash': '£0.00'
            }
        },
        {
            'id': 'BK-TK-001',
            'tripId': 'TRIP-003',
            'customerName': 'Michael Brown',
            'customer': {
                'email': 'michael.brown@email.com',
                'phone': '+44 7700 900789',
                'loyaltyTier': 'Platinum Member',
                'loyaltyNumber': 'BA456789123'
            },
            'bookingType': 'Event Ticket',
            'eventName': 'Premier League Match: Arsenal vs Chelsea',
            'eventDate': '2024-04-13',
            'venue': 'Emirates Stadium',
            'tickets': 1,
            'seatCategory': 'Premium',
            'bookingReference': 'ARS-CHE-001',
            'totalPrice': '£150.00',
            'status': 'Confirmed',
            'bookingDate': '2024-03-01',
            'payment': {
                'method': 'Credit Card',
                'last4': '9012',
                'pointsUsed': '0',
                'cash': '£0.00'
            }
        },

        # Single booking trips (individual trips)
        {
            'id': 'BK-ES-002',
            'tripId': 'TRIP-ES-002',
            'customerName': 'Emma Wilson',
            'customer': {
                'email': 'emma.wilson@email.com',
                'phone': '+44 7700 901234',
                'loyaltyTier': 'Gold Member',
                'loyaltyNumber': 'BA789123456'
            },
            'bookingType': 'eSIM',
            'destination': 'Japan',
            'dataAllowance': '15GB',
            'validity': '21 days',
            'networkProvider': 'NTT Docomo',
            'bookingReference': 'ESIM-JP-002',
            'totalPrice': '£35.00',
            'status': 'Confirmed',
            'bookingDate': '2024-02-20',
            'payment': {
                'method': 'Credit Card',
                'last4': '3456',
                'pointsUsed': '0',
                'cash': '£0.00'
            }
        },
        {
            'id': 'BK-HW-001',
            'tripId': 'TRIP-HW-001',
            'customerName': 'David Lee',
            'customer': {
                'email': 'david.lee@email.com',
                'phone': '+44 7700 901567',
                'loyaltyTier': 'Silver Member',
                'loyaltyNumber': 'BA321654987'
            },
            'bookingType': 'Health & Wellness',
            'serviceName': 'Spa Treatment Package',
            'serviceDate': '2024-04-05',
            'location': 'The Dorchester Spa',
            'duration': '3 hours',
            'bookingReference': 'DOR-SPA-001',
            'totalPrice': '£280.00',
            'status': 'Confirmed',
            'bookingDate': '2024-03-05',
            'payment': {
                'method': 'Credit Card',
                'last4': '7890',
                'pointsUsed': '0',
                'cash': '£0.00'
            }
        },

        # Single booking trips (individual trips)
        {
            'id': 'BK-FL-004',
            'tripId': 'TRIP-004',
            'customerName': 'Lisa Chen',
            'customer': {
                'email': 'lisa.chen@email.com',
                'phone': '+44 7700 901890',
                'loyaltyTier': 'Platinum Member',
                'loyaltyNumber': 'BA147258369'
            },
            'bookingType': 'Flight',
            'airline': 'Qatar Airways',
            'origin': 'LHR',
            'destination': 'DOH',
            'departureDate': '2024-05-15',
            'returnDate': None,
            'bookingDate': '2024-04-01',
            'bookingReference': 'QR-LHR-DOH-001',
            'totalPrice': '£1,200.00',
            'status': 'Confirmed',
            'payment': {
                'method': 'Credit Card',
                'last4': '1111',
                'pointsUsed': '0',
                'cash': '£0.00'
            },
            'flightDetails': {
                'flightType': 'One Way',
                'cabinClass': 'Economy',
                'fareClass': 'Y',
                'fareFamily': 'Standard',
                'ticketIssued': 'Yes',
                'bagsIncluded': '1 checked bag',
                'bagsPurchased': '0',
                'seatSelectionIncluded': 'No',
                'seatPurchased': 'No',
                'passengers': 1
            },
            'itinerary': {
                'outbound': {
                    'flightNumber': 'QR 001',
                    'departureDate': '2024-05-15',
                    'departureTime': '14:30',
                    'arrivalDate': '2024-05-15',
                    'arrivalTime': '23:45'
                }
            },
            'ancillaries': []
        },
        {
            'id': 'BK-HT-004',
            'tripId': 'TRIP-005',
            'customerName': 'Robert Taylor',
            'customer': {
                'email': 'robert.taylor@email.com',
                'phone': '+44 7700 902123',
                'loyaltyTier': 'Gold Member',
                'loyaltyNumber': 'BA963852741'
            },
            'bookingType': 'Hotel',
            'hotelName': 'The Savoy',
            'checkIn': '2024-06-10',
            'checkOut': '2024-06-12',
            'nights': 2,
            'roomType': 'River View Room',
            'guests': 1,
            'bookingReference': 'SVY-2024-004',
            'totalPrice': '£1,800.00',
            'status': 'Confirmed',
            'bookingDate': '2024-04-15',
            'payment': {
                'method': 'Credit Card',
                'last4': '2222',
                'pointsUsed': '0',
                'cash': '£0.00'
            }
        },
        {
            'id': 'BK-TK-002',
            'tripId': 'TRIP-006',
            'customerName': 'Sophie Martinez',
            'customer': {
                'email': 'sophie.martinez@email.com',
                'phone': '+44 7700 902456',
                'loyaltyTier': 'Silver Member',
                'loyaltyNumber': 'BA852963741'
            },
            'bookingType': 'Event Ticket',
            'eventName': 'Wimbledon Tennis Championships',
            'eventDate': '2024-07-08',
            'venue': 'All England Lawn Tennis Club',
            'tickets': 2,
            'seatCategory': 'Centre Court',
            'bookingReference': 'WIM-2024-001',
            'totalPrice': '£600.00',
            'status': 'Confirmed',
            'bookingDate': '2024-04-20',
            'payment': {
                'method': 'Credit Card',
                'last4': '3333',
                'pointsUsed': '0',
                'cash': '£0.00'
            }
        },

        # More single booking trips
        {
            'id': 'BK-FT-002',
            'tripId': 'TRIP-FT-002',
            'customerName': 'Alex Rodriguez',
            'customer': {
                'email': 'alex.rodriguez@email.com',
                'phone': '+44 7700 902789',
                'loyaltyTier': 'Bronze Member',
                'loyaltyNumber': 'BA741852963'
            },
            'bookingType': 'Fast Track',
            'airport': 'Gatwick North',
            'serviceDate': '2024-05-20',
            'serviceType': 'Immigration Fast Track',
            'bookingReference': 'LGW-FT-002',
            'totalPrice': '£30.00',
            'status': 'Confirmed',
            'bookingDate': '2024-04-25',
            'payment': {
                'method': 'Credit Card',
                'last4': '4444',
                'pointsUsed': '0',
                'cash': '£0.00'
            }
        },
        {
            'id': 'BK-AL-002',
            'tripId': 'TRIP-AL-002',
            'customerName': 'Jennifer Davis',
            'customer': {
                'email': 'jennifer.davis@email.com',
                'phone': '+44 7700 903012',
                'loyaltyTier': 'Gold Member',
                'loyaltyNumber': 'BA369258147'
            },
            'bookingType': 'Airport Lounge',
            'loungeName': 'Aspire Lounge',
            'airport': 'Stansted',
            'accessDate': '2024-06-05',
            'duration': '4 hours',
            'guests': 1,
            'bookingReference': 'STN-LG-002',
            'totalPrice': '£40.00',
            'status': 'Confirmed',
            'bookingDate': '2024-05-01',
            'payment': {
                'method': 'Credit Card',
                'last4': '5555',
                'pointsUsed': '0',
                'cash': '£0.00'
            }
        },

        # Problematic bookings to demonstrate flag UI
        {
            'id': 'BK-FL-005',
            'tripId': 'TRIP-007',
            'customerName': 'Thomas Anderson',
            'customer': {
                'email': 'thomas.anderson@email.com',
                'phone': '+44 7700 903345',
                'loyaltyTier': 'Platinum Member',
                'loyaltyNumber': 'BA147369258'
            },
            'bookingType': 'Flight',
            'airline': 'American Airlines',
            'origin': 'LHR',
            'destination': 'LAX',
            'departureDate': '2024-06-15',
            'returnDate': '2024-06-22',
            'bookingDate': '2024-05-01',
            'bookingReference': 'AA-LAX-001',
            'totalPrice': '£2,500.00',
            'status': 'Failed',
            'payment': {
                'method': 'Credit Card',
                'last4': '6666',
                'pointsUsed': '0',
                'cash': '£0.00'
            },
            'flightDetails': {
                'flightType': 'Round Trip',
                'cabinClass': 'Economy',
                'fareClass': 'Y',
                'fareFamily': 'Standard',
                'ticketIssued': 'No',
                'bagsIncluded': '1 checked bag',
                'bagsPurchased': '0',
                'seatSelectionIncluded': 'No',
                'seatPurchased': 'No',
                'passengers': 2
            },
            'itinerary': {
                'outbound': {
                    'flightNumber': 'AA 100',
                    'departureDate': '2024-06-15',
                    'departureTime': '10:30',
                    'arrivalDate': '2024-06-15',
                    'arrivalTime': '13:45'
                },
                'inbound': {
                    'flightNumber': 'AA 101',
                    'departureDate': '2024-06-22',
                    'departureTime': '15:30',
                    'arrivalDate': '2024-06-23',
                    'arrivalTime': '09:45'
                }
            },
            'ancillaries': []
        },
        {
            'id': 'BK-HT-005',
            'tripId': 'TRIP-007',
            'customerName': 'Thomas Anderson',
            'customer': {
                'email': 'thomas.anderson@email.com',
                'phone': '+44 7700 903345',
                'loyaltyTier': 'Platinum Member',
                'loyaltyNumber': 'BA147369258'
            },
            'bookingType': 'Hotel',
            'hotelName': 'The Beverly Hills Hotel',
            'checkIn': '2024-06-15',
            'checkOut': '2024-06-22',
            'nights': 7,
            'roomType': 'Bungalow Suite',
            'guests': 2,
            'bookingReference': 'BHH-2024-001',
            'totalPrice': '£4,200.00',
            'status': 'Pending action',
            'bookingDate': '2024-05-01',
            'payment': {
                'method': 'Credit Card',
                'last4': '6666',
                'pointsUsed': '0',
                'cash': '£0.00'
            }
        },
        {
            'id': 'BK-TK-003',
            'tripId': 'TRIP-TK-003',
            'customerName': 'Maria Garcia',
            'customer': {
                'email': 'maria.garcia@email.com',
                'phone': '+44 7700 903678',
                'loyaltyTier': 'Silver Member',
                'loyaltyNumber': 'BA258147369'
            },
            'bookingType': 'Event Ticket',
            'eventName': 'Taylor Swift Concert',
            'eventDate': '2024-08-10',
            'venue': 'Wembley Stadium',
            'tickets': 1,
            'seatCategory': 'VIP',
            'bookingReference': 'TS-WEM-001',
            'totalPrice': '£350.00',
            'status': 'Failed',
            'bookingDate': '2024-05-10',
            'payment': {
                'method': 'Credit Card',
                'last4': '7777',
                'pointsUsed': '0',
                'cash': '£0.00'
            }
        },
        {
            'id': 'BK-ES-003',
            'tripId': 'TRIP-ES-003',
            'customerName': 'James Wilson',
            'customer': {
                'email': 'james.wilson@email.com',
                'phone': '+44 7700 904011',
                'loyaltyTier': 'Gold Member',
                'loyaltyNumber': 'BA369258147'
            },
            'bookingType': 'eSIM',
            'destination': 'Italy',
            'dataAllowance': '25GB',
            'validity': '30 days',
            'networkProvider': 'TIM',
            'bookingReference': 'ESIM-IT-001',
            'totalPrice': '£45.00',
            'status': 'Pending action',
            'bookingDate': '2024-05-15',
            'payment': {
                'method': 'Credit Card',
                'last4': '8888',
                'pointsUsed': '0',
                'cash': '£0.00'
            }
        }
    ]
    
    print(f"Starting to populate {len(bookings_data)} bookings...")
    
    # Add each booking to Firebase
    for booking in bookings_data:
        try:
            # Add timestamp for when the document was created
            booking['createdAt'] = firestore.SERVER_TIMESTAMP
            booking['updatedAt'] = firestore.SERVER_TIMESTAMP
            
            # Use the booking ID as the document ID
            doc_ref = bookings_ref.document(booking['id'])
            doc_ref.set(booking)
            
            print(f"✅ Added booking: {booking['id']} - {booking['customerName']} ({booking['bookingType']})")
            
        except Exception as e:
            print(f"❌ Error adding booking {booking['id']}: {str(e)}")
    
    print(f"\n🎉 Successfully populated {len(bookings_data)} bookings in the 'Booking_Management' collection!")
    print("📊 Collection includes:")
    print("   • Flight bookings (with detailed itinerary and ancillaries)")
    print("   • Hotel bookings (with property details)")
    print("   • Event ticket bookings (with venue information)")
    print("   • eSIM bookings (with data and validity details)")
    print("   • Health & Wellness bookings (with service details)")
    print("   • Fast Track bookings (with airport information)")
    print("   • Airport Lounge bookings (with lounge features)")
    print("   • Airport Dining bookings (with restaurant details)")
    print("   • Airport Transfer bookings (with vehicle information)")

if __name__ == '__main__':
    populate_bookings() 