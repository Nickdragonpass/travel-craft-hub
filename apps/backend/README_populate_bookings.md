# Booking Management Firebase Population Script

This script populates the Firebase `Booking_Management` collection with comprehensive booking data for all booking types.

## Prerequisites

1. **Firebase Setup**: Ensure you have Firebase credentials set up in `firebase-credentials.json`
2. **Python Dependencies**: Install required packages:
   ```bash
   pip install firebase-admin
   ```

## Usage

### Run the Script

```bash
cd apps/backend
python populate_bookings.py
```

### What the Script Does

The script creates a `Booking_Management` collection in Firebase with detailed booking data including:

#### 📊 **High-Level Table Data**
- Booking ID, customer name, booking type
- Status, dates, prices, payment methods
- Customer loyalty information

#### 🔍 **Detailed Modal Information**
- **Flight**: Airline details, cabin class, fare information, flight itinerary, ancillaries
- **Hotel**: Property details, room information, check-in/out times, amenities
- **Event Ticket**: Event details, venue information, timing
- **eSIM**: Data allowance, validity, provider information
- **Health & Wellness**: Service details, location, duration
- **Fast Track**: Airport information, terminal details, timing
- **Airport Lounge**: Lounge features, access times, amenities
- **Airport Dining**: Restaurant details, directions, opening hours
- **Airport Transfer**: Vehicle information, pickup/dropoff locations

#### 💳 **Payment Information**
- Payment methods (Credit Card, Points, Cash, Entitlements)
- Payment breakdowns
- Points and cash amounts used

## Data Structure

Each booking document contains:

```json
{
  "id": "BK-FL-001",
  "customerName": "John Smith",
  "customer": {
    "email": "john.smith@email.com",
    "phone": "+44 7700 900123",
    "loyaltyTier": "Gold Member",
    "loyaltyNumber": "BA123456789"
  },
  "bookingType": "Flight",
  "status": "Confirmed",
  "payment": {
    "method": "Credit Card",
    "last4": "1234",
    "pointsUsed": "0",
    "cash": "£0.00"
  },
  "flightDetails": { /* Flight-specific details */ },
  "itinerary": { /* Journey details */ },
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## Booking Types Included

1. **Flight** (4 bookings) - Including failed and pending action statuses
2. **Hotel** (1 booking) - Luxury hotel booking
3. **Event Ticket** (1 booking) - Sports event
4. **eSIM** (1 booking) - International data
5. **Health & Wellness** (1 booking) - Spa treatment
6. **Fast Track** (1 booking) - Airport security
7. **Airport Lounge** (1 booking) - Premium lounge access
8. **Airport Dining** (1 booking) - Restaurant reservation
9. **Airport Transfer** (1 booking) - Private car service

## Status Types

- **Confirmed**: Active bookings
- **Failed**: Bookings that need attention
- **Pending action**: Bookings requiring user action
- **Completed**: Finished bookings

## Payment Methods

- **Credit Card**: Standard card payments
- **Points**: Loyalty points redemption
- **Points + Cash**: Mixed payment
- **Entitlement**: Free access (for lounge, dining, transfers, wellness)

## Output

The script will display progress for each booking added:

```
✅ Added booking: BK-FL-001 - John Smith (Flight)
✅ Added booking: BK-HT-001 - Emma Wilson (Hotel)
...
🎉 Successfully populated 10 bookings in the 'Booking_Management' collection!
```

## Error Handling

- Validates Firebase credentials before running
- Provides detailed error messages for failed operations
- Continues processing even if individual bookings fail

## Next Steps

After running the script, you can:

1. **Connect Frontend**: Update the frontend to fetch data from Firebase instead of using mock data
2. **Add Real-time Updates**: Implement Firebase listeners for live booking updates
3. **Add CRUD Operations**: Create scripts for adding, updating, and deleting bookings
4. **Add Authentication**: Implement user authentication and authorization 