# PRD: Order Management Detail View Data Structure

## Overview
This document defines the data structure for the detailed order view modal in the Order Management view. The modal displays comprehensive information for each order type, organized into collapsible sections. Each order type has specific fields in the Order Information and Itinerary sections, while Customer Information and Payment Information sections are common across all order types. The Source column is left empty for the data team to fill in.

## Common Sections (All Order Types)

### Customer Information Section
Fields displayed for all order types:

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Customer Information | Name | Full name of the customer who made the order | |
| Customer Information | Email | Email address of the customer | |
| Customer Information | Phone | Phone number of the customer | |
| Customer Information | Reward Program | Customer's loyalty tier/reward program membership level (e.g., Platinum Member, Gold Member, Silver Member) | |
| Customer Information | Reward Program Number | Customer's loyalty program membership number | |

### Payment Information Section
Fields displayed for all order types (with order-type-specific base price field names):

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Payment Information | Total Amount | Total price of the order. Displayed prominently at top of payment section. Format: Currency with symbol. | |
| Payment Information | Payment Method | Method used to pay for the order. Values: "Credit Card", "Points", "Points + Cash", "Entitlement", "Discount". | |
| Payment Information | Card Last 4 | Last 4 digits of credit card (only shown when Payment Method is "Credit Card"). Format: "**** XXXX". | |
| Payment Information | Base [Service] Price | Base price for the service before taxes and fees. Field name varies by order type (e.g., "Base Fare" for flights, "Base Rate" for hotels, "Base Ticket Price" for events, "Base eSIM Price" for eSIM, "Base Service Price" for health & wellness, "Base Fast Track Price" for fast track, "Base Lounge Price" for airport lounge, "Base Fare" for airport dining/transfer). Format: Currency with symbol. | |
| Payment Information | Taxes & Fees | Additional taxes and fees applied to the order. Format: Currency with symbol. | |
| Payment Information | Discount Applied | Discount amount applied to the order (if any). Format: Currency with symbol, typically negative value (e.g., "-£150.00"). | |
| Payment Information | Ancillaries | Additional services purchased (flight-specific). List of ancillary items with icons and prices (e.g., Seat Selection, Extra Baggage). | |
| Payment Information | Payment Method Breakdown | Subsection showing breakdown by payment method. For Credit Card: shows credit card payment amount. For Points + Cash: shows points used and cash payment. For Points: shows points used. For Entitlement: shows entitlement used count, points used, and cash payment. For Discount: shows discount amount breakdown. | |
| Payment Information | Entitlement Used | Number of entitlements used (only for Entitlement payment method). | |
| Payment Information | Points Used | Number of points used (for Points or Points + Cash payment methods). | |
| Payment Information | Cash Payment | Cash amount paid (for Points + Cash or Discount payment methods). Format: Currency with symbol. | |
| Payment Information | Credit Card Payment | Amount paid via credit card (for Credit Card payment method). Format: Currency with symbol. | |
| Payment Information | Discount Amount | Amount of discount applied (for Discount payment method). Format: Currency with symbol. | |

---

## Order Type 1: Flight

### Order Information Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Flight | Order ID | Unique identifier for the flight order. Format: "BK-FL-XXX". | |
| Flight | Airline Order Reference | Order reference number provided by the airline (e.g., "ABC123456"). | |
| Flight | Airline | Name of the airline operating the flight (e.g., "British Airways", "Emirates"). | |
| Flight | Cabin Class | Cabin class of the flight order. Values: Economy, Premium Economy, Business, First. | |
| Flight | Fare Class | Fare class code (e.g., "Y", "J", "F"). | |
| Flight | Fare Family | Fare family category (e.g., "Standard", "Flexible"). | |
| Flight | Order Date | Date when the order was made. Format: YYYY-MM-DD. | |
| Flight | Ticket Issued | Whether the ticket has been issued. Values: "Yes" or "No". | |
| Flight | Bags Included | Baggage allowance included with the order. Format: "X x Ykg" (e.g., "1 x 23kg"). | |
| Flight | Bags Purchased | Additional baggage purchased. Format: "X x Ykg" (e.g., "1 x 23kg"). | |
| Flight | Seat Selection Included | Whether seat selection was included in the order. Values: "Yes" or "No". | |
| Flight | Seat Purchased | Whether seat selection was purchased separately. Values: "Yes" or "No". | |

### Itinerary Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Flight | Outbound Route Label | Label for outbound flight segment. Value: "Outbound". | |
| Flight | Outbound Date | Departure date for outbound flight. Format: YYYY-MM-DD. | |
| Flight | Outbound Origin Airport Code | IATA code of origin airport (e.g., "JFK", "LHR"). | |
| Flight | Outbound Origin Airport Name | Full name of origin airport (e.g., "New York JFK", "London Heathrow"). | |
| Flight | Outbound Flight Number | Flight number for outbound segment (e.g., "BA 203"). | |
| Flight | Outbound Departure Time | Scheduled departure time for outbound flight. Format: HH:MM (24-hour). | |
| Flight | Outbound Flight Duration | Duration of outbound flight. Format: "Xh Ym" (e.g., "7h 30m"). | |
| Flight | Outbound Arrival Time | Scheduled arrival time for outbound flight. Format: HH:MM (24-hour). | |
| Flight | Outbound Destination Airport Code | IATA code of destination airport. | |
| Flight | Outbound Destination Airport Name | Full name of destination airport. | |
| Flight | Inbound Route Label | Label for inbound flight segment (only for round trip). Value: "Inbound". | |
| Flight | Inbound Date | Departure date for inbound flight (only for round trip). Format: YYYY-MM-DD. | |
| Flight | Inbound Origin Airport Code | IATA code of origin airport for return flight. | |
| Flight | Inbound Origin Airport Name | Full name of origin airport for return flight. | |
| Flight | Inbound Flight Number | Flight number for inbound segment (e.g., "BA 204"). | |
| Flight | Inbound Departure Time | Scheduled departure time for inbound flight. Format: HH:MM (24-hour). | |
| Flight | Inbound Flight Duration | Duration of inbound flight. Format: "Xh Ym". | |
| Flight | Inbound Arrival Time | Scheduled arrival time for inbound flight. Format: HH:MM (24-hour). | |
| Flight | Inbound Destination Airport Code | IATA code of destination airport for return flight. | |
| Flight | Inbound Destination Airport Name | Full name of destination airport for return flight. | |
| Flight | Flight Type | Type of flight order. Values: "Round Trip" or "One Way". | |
| Flight | Passengers | List of passengers on the order. Each passenger shows name and type (e.g., "Adult", "Child"). | |
| Flight | Passenger Name | Full name of passenger (with title, e.g., "Ms. Sarah Johnson"). | |
| Flight | Passenger Type | Type of passenger. Values: "Adult", "Child", "Infant". | |

---

## Order Type 2: Hotel

### Order Information Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Hotel | Order ID | Unique identifier for the hotel order. Format: "BK-HT-XXX". | |
| Hotel | Hotel Order Reference | Order reference number provided by the hotel (e.g., "PLZ-2024-001"). | |
| Hotel | Order Date | Date when the order was made. Format: YYYY-MM-DD. | |
| Hotel | Chain Name | Name of the hotel chain (e.g., "The Ritz London"). | |
| Hotel | Property Type | Type of property. Values: "Luxury Hotel", "Boutique Hotel", "Resort", etc. | |
| Hotel | Star Rating | Star rating of the hotel. Format: Star symbols (e.g., "⭐⭐⭐⭐⭐"). | |
| Hotel | Property Phone | Contact phone number of the hotel property. | |
| Hotel | Property Email | Contact email address of the hotel property. | |
| Hotel | Cancellation Policy | Cancellation policy for the order (e.g., "Free cancellation until 24h before check-in"). | |
| Hotel | Cancellation Cost | Cost to cancel the order. Format: Currency with symbol (e.g., "£0.00"). | |

### Itinerary Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Hotel | Stay Label | Label for hotel stay. Value: "Hotel Stay". | |
| Hotel | Number of Nights | Number of nights for the stay. Format: "X nights" (e.g., "7 nights"). | |
| Hotel | Check-in Date | Date of check-in. Format: YYYY-MM-DD. | |
| Hotel | Check-in Time | Scheduled check-in time. Format: HH:MM (24-hour, e.g., "15:00"). | |
| Hotel | Check-out Date | Date of check-out. Format: YYYY-MM-DD. | |
| Hotel | Check-out Time | Scheduled check-out time. Format: HH:MM (24-hour, e.g., "11:00"). | |
| Hotel | Room Type | Type of room booked (e.g., "Deluxe Room", "Bungalow Suite"). | |
| Hotel | Hotel Name | Name of the hotel property. | |
| Hotel | Hotel Address | Full address of the hotel property. | |
| Hotel | Breakfast Included | Whether breakfast is included. Values: "Breakfast Included" or "No Breakfast". | |
| Hotel | Guests | List of guests staying at the hotel. Each guest shows name and type. | |
| Hotel | Guest Name | Full name of guest (with title). | |
| Hotel | Guest Type | Type of guest. Values: "Primary Guest", "Additional Guest". | |

---

## Order Type 3: Event Ticket

### Order Information Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Event Ticket | Order ID | Unique identifier for the event ticket order. Format: "BK-TK-XXX". | |
| Event Ticket | Event Ticket Order Reference | Order reference number for the event ticket (e.g., "TS-WEM-001"). | |
| Event Ticket | Order Date | Date when the order was made. Format: YYYY-MM-DD. | |
| Event Ticket | Event Type | Type of event. Values: "Sports", "Concert", "Theater", etc. | |
| Event Ticket | Event Country | Country where the event takes place. | |
| Event Ticket | Event City | City where the event takes place. | |
| Event Ticket | Event Provider Name | Name of the event provider/organizer (e.g., "UEFA"). | |
| Event Ticket | Event Phone | Contact phone number for the event provider. | |
| Event Ticket | Event Email | Contact email address for the event provider. | |
| Event Ticket | Cancellation Policy | Cancellation policy for the event ticket (e.g., "Non-refundable"). | |
| Event Ticket | Cancellation Cost | Cost to cancel the order. Format: Currency or text (e.g., "Full amount"). | |

### Itinerary Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Event Ticket | Event Details Label | Label for event details. Value: "Event Details". | |
| Event Ticket | Seat Category | Category of seats/tickets (e.g., "VIP", "Premium", "Standard"). | |
| Event Ticket | Event Name | Name of the event (e.g., "Taylor Swift Concert"). | |
| Event Ticket | Venue | Name of the venue where the event takes place (e.g., "Wembley Stadium"). | |
| Event Ticket | Venue Address | Full address of the venue. | |
| Event Ticket | Event Duration | Duration of the event. Format: "X hours" (e.g., "3 hours"). | |
| Event Ticket | Event Start Date | Date when the event starts. Format: YYYY-MM-DD. | |
| Event Ticket | Event Start Time | Time when the event starts. Format: HH:MM (24-hour, e.g., "20:00"). | |
| Event Ticket | Event End Date | Date when the event ends. Format: YYYY-MM-DD. | |
| Event Ticket | Event End Time | Time when the event ends. Format: HH:MM (24-hour, e.g., "23:00"). | |
| Event Ticket | Event Date | Date of the event (used for display). Format: YYYY-MM-DD. | |
| Event Ticket | Tickets | Number of tickets purchased. | |
| Event Ticket | Attendees | List of attendees for the event. Each attendee shows name and type. | |
| Event Ticket | Attendee Name | Full name of attendee (with title). | |
| Event Ticket | Attendee Type | Type of attendee. Values: "Primary Attendee", "Additional Attendee". | |

---

## Order Type 4: eSIM

### Order Information Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| eSIM | Order ID | Unique identifier for the eSIM order. Format: "BK-ES-XXX". | |
| eSIM | eSIM Order Reference | Order reference number for the eSIM (e.g., "ESIM-US-001"). | |
| eSIM | Order Date | Date when the order was made. Format: YYYY-MM-DD. | |
| eSIM | eSIM Provider | Name of the eSIM network provider (e.g., "AT&T", "TIM"). | |
| eSIM | eSIM Phone | Contact phone number for eSIM support. | |
| eSIM | eSIM Email | Contact email address for eSIM support. | |
| eSIM | Cancellation Policy | Cancellation policy for the eSIM (e.g., "Non-refundable once activated"). | |
| eSIM | eSIM Count | Number of eSIMs purchased. | |
| eSIM | Cancellation Cost | Cost to cancel the order. Format: Currency or text (e.g., "Full amount if activated"). | |

### Itinerary Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| eSIM | eSIM Details Label | Label for eSIM details. Value: "eSIM Details". | |
| eSIM | eSIM Status | Current status of the eSIM. Values: "Active", "Pending", "Expired". | |
| eSIM | Destination | Destination country/region for the eSIM (e.g., "United States", "Italy"). | |
| eSIM | Network Provider | Name of the network provider (e.g., "AT&T", "TIM"). | |
| eSIM | Data Allowance | Data allowance included with the eSIM (e.g., "10GB", "25GB"). | |
| eSIM | Validity | Validity period of the eSIM (e.g., "14 days", "30 days"). | |
| eSIM | Start Date | Date when eSIM activation starts. Format: YYYY-MM-DD. | |
| eSIM | Start Time | Time when eSIM activation starts. Format: HH:MM (24-hour, e.g., "00:00"). | |
| eSIM | End Date | Date when eSIM expires. Format: YYYY-MM-DD. | |
| eSIM | End Time | Time when eSIM expires. Format: HH:MM (24-hour, e.g., "23:59"). | |
| eSIM | eSIM Features | List of features included with the eSIM. | |
| eSIM | Feature Name | Name of eSIM feature (e.g., "4G/5G Coverage", "Instant Activation", "Local Phone Number"). | |

---

## Order Type 5: Health & Wellness

### Order Information Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Health & Wellness | Order ID | Unique identifier for the health & wellness order. Format: "BK-HW-XXX". | |
| Health & Wellness | Order Reference | Order reference number for the service. | |
| Health & Wellness | Order Date | Date when the order was made. Format: YYYY-MM-DD. | |
| Health & Wellness | H&W Provider | Name of the health & wellness provider/location. | |
| Health & Wellness | H&W Phone | Contact phone number for the provider. | |
| Health & Wellness | H&W Email | Contact email address for the provider. | |
| Health & Wellness | Cancellation Policy | Cancellation policy for the service (e.g., "Free cancellation until 24h before service"). | |
| Health & Wellness | Service Count | Number of services ordered. | |
| Health & Wellness | Cancellation Cost | Cost to cancel the order. Format: Currency with symbol (e.g., "£0.00"). | |

### Itinerary Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Health & Wellness | Service Details Label | Label for service details. Value: "Service Details". | |
| Health & Wellness | Service Category | Category of the service (e.g., "Spa Treatment", "Massage", "Wellness Session"). | |
| Health & Wellness | Service Name | Name of the specific service booked. | |
| Health & Wellness | Service Location | Location/name of the service provider. | |
| Health & Wellness | Service Address | Full address of the service location. | |
| Health & Wellness | Service Duration | Duration of the service. Format: "X hours" or "X minutes". | |
| Health & Wellness | Service Start Date | Date when the service starts. Format: YYYY-MM-DD. | |
| Health & Wellness | Service Start Time | Time when the service starts. Format: HH:MM (24-hour, e.g., "14:00"). | |
| Health & Wellness | Service End Date | Date when the service ends. Format: YYYY-MM-DD. | |
| Health & Wellness | Service End Time | Time when the service ends. Format: HH:MM (24-hour, e.g., "17:00"). | |
| Health & Wellness | Service Date | Date of the service (used for display). Format: YYYY-MM-DD. | |
| Health & Wellness | Service Features | List of features included with the service. | |
| Health & Wellness | Feature Name | Name of service feature (e.g., "Luxury Spa Facilities", "Professional Therapists", "Premium Products", "Refreshments Included"). | |

---

## Order Type 6: Fast Track

### Order Information Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Fast Track | Order ID | Unique identifier for the fast track order. Format: "BK-FT-XXX". | |
| Fast Track | Order Reference | Order reference number for the fast track service. | |
| Fast Track | Order Date | Date when the order was made. Format: YYYY-MM-DD. | |
| Fast Track | Pre-Book | Whether the fast track was pre-booked. Values: "Yes" or "No". | |
| Fast Track | Fast Track Provider | Name of the fast track service provider (e.g., "Airport Fast Track Services"). | |
| Fast Track | Fast Track Phone | Contact phone number for the provider. | |
| Fast Track | Fast Track Email | Contact email address for the provider. | |
| Fast Track | Cancellation Policy | Cancellation policy for the service (e.g., "Free cancellation until 2h before service"). | |
| Fast Track | Fast Track Count | Number of fast track services ordered. | |
| Fast Track | Cancellation Cost | Cost to cancel the order. Format: Currency with symbol (e.g., "£0.00"). | |

### Itinerary Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Fast Track | Fast Track Details Label | Label for fast track details. Value: "Fast Track Details". | |
| Fast Track | Service Type | Type of fast track service (e.g., "Security Fast Track", "Immigration Fast Track"). | |
| Fast Track | Airport | Name of the airport where fast track is available. | |
| Fast Track | Terminal | Terminal number/identifier (e.g., "Terminal 5", "Terminal 3"). | |
| Fast Track | Location Info | Location of the fast track service (e.g., "Security Fast Track Lane"). | |
| Fast Track | Service Date | Date of the fast track service. Format: YYYY-MM-DD. | |
| Fast Track | Operating Hours | Operating hours of the fast track service. Format: "HH:MM - HH:MM" (e.g., "05:00 - 23:00"). | |
| Fast Track | Service Duration | Duration of the fast track service. Format: "X minutes" (e.g., "15 minutes"). | |
| Fast Track | Service Start Date | Date when the service starts. Format: YYYY-MM-DD. | |
| Fast Track | Service Start Time | Time when the service starts. Format: HH:MM (24-hour, e.g., "10:30"). | |
| Fast Track | Service End Date | Date when the service ends. Format: YYYY-MM-DD. | |
| Fast Track | Service End Time | Time when the service ends. Format: HH:MM (24-hour, e.g., "10:45"). | |
| Fast Track | Fast Track Features | List of features included with the fast track service. | |
| Fast Track | Feature Name | Name of fast track feature (e.g., "Dedicated Fast Track Lane", "Priority Processing", "Digital Pass", "Security Compliant"). | |

---

## Order Type 7: Airport Lounge

### Order Information Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Airport Lounge | Order ID | Unique identifier for the airport lounge order. Format: "BK-AL-XXX". | |
| Airport Lounge | Order Reference | Order reference number for the lounge access. | |
| Airport Lounge | Order Date | Date when the order was made. Format: YYYY-MM-DD. | |
| Airport Lounge | Pre-Book | Whether the lounge access was pre-booked. Values: "Yes" or "No". | |
| Airport Lounge | Lounge Provider | Name of the lounge provider (e.g., "Priority Pass", "No.1 Traveller"). | |
| Airport Lounge | Lounge Phone | Contact phone number for the lounge provider. | |
| Airport Lounge | Lounge Email | Contact email address for the lounge provider. | |
| Airport Lounge | Cancellation Policy | Cancellation policy for the lounge access (e.g., "Free cancellation until 2h before access"). | |
| Airport Lounge | Guest Count | Number of guests included in the order. | |
| Airport Lounge | Cancellation Cost | Cost to cancel the order. Format: Currency with symbol (e.g., "£0.00"). | |

### Itinerary Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Airport Lounge | Lounge Details Label | Label for lounge details. Value: "Lounge Details". | |
| Airport Lounge | Lounge Category | Category of the lounge (e.g., "Premium Lounge", "Business Lounge"). | |
| Airport Lounge | Airport | Name of the airport where the lounge is located. | |
| Airport Lounge | Terminal | Terminal number/identifier where the lounge is located. | |
| Airport Lounge | Lounge Name | Name of the specific lounge (e.g., "No.1 Traveller Lounge"). | |
| Airport Lounge | Lounge Location | Location description within the terminal (e.g., "After Security, Level 2"). | |
| Airport Lounge | Lounge Directions | Directions to reach the lounge (e.g., "Take escalator to Level 2, turn right after duty-free"). | |
| Airport Lounge | Access Date | Date of lounge access. Format: YYYY-MM-DD. | |
| Airport Lounge | Operating Hours | Operating hours of the lounge. Format: "HH:MM - HH:MM" (e.g., "06:00 - 22:00"). | |
| Airport Lounge | Access Duration | Duration of lounge access. Format: "X hours" (e.g., "3 hours"). | |
| Airport Lounge | Access Start Date | Date when access starts. Format: YYYY-MM-DD. | |
| Airport Lounge | Access Start Time | Time when access starts. Format: HH:MM (24-hour, e.g., "14:00"). | |
| Airport Lounge | Access End Date | Date when access ends. Format: YYYY-MM-DD. | |
| Airport Lounge | Access End Time | Time when access ends. Format: HH:MM (24-hour, e.g., "17:00"). | |
| Airport Lounge | Lounge Features | List of features/amenities available in the lounge. | |
| Airport Lounge | Feature Name | Name of lounge feature (e.g., "Complimentary Food & Beverages", "Comfortable Seating", "Charging Stations", "Shower Facilities", "Free Wi-Fi", "TV & Entertainment"). | |

---

## Order Type 8: Airport Dining

### Order Information Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Airport Dining | Order ID | Unique identifier for the airport dining order. Format: "BK-AD-XXX". | |
| Airport Dining | Order Reference | Order reference number for the dining reservation. | |
| Airport Dining | Order Date | Date when the order was made. Format: YYYY-MM-DD. | |
| Airport Dining | Restaurant Provider | Name of the restaurant provider (e.g., "DragonPass Dining"). | |
| Airport Dining | Restaurant Phone | Contact phone number for the restaurant. | |
| Airport Dining | Restaurant Email | Contact email address for the restaurant. | |
| Airport Dining | Cancellation Policy | Cancellation policy for the dining reservation (e.g., "Free cancellation until 2h before dining"). | |
| Airport Dining | Cancellation Cost | Cost to cancel the order. Format: Currency with symbol (e.g., "£0.00"). | |
| Airport Dining | Status | Current status of the dining order. Values: "Confirmed" or "Completed". | |

### Itinerary Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Airport Dining | Dining Details Label | Label for dining details. Value: "Dining Details". | |
| Airport Dining | Cuisine Category | Type of cuisine (e.g., "Italian", "Asian", "International"). | |
| Airport Dining | Restaurant Name | Name of the restaurant. | |
| Airport Dining | Airport Location | Name of the airport where the restaurant is located. | |
| Airport Dining | Dining Directions | Directions to reach the restaurant (e.g., "After Security, Level 2, turn left after duty-free shops"). | |
| Airport Dining | Dining Date | Date of the dining reservation. Format: YYYY-MM-DD. | |
| Airport Dining | Dining Time | Time of the dining reservation. Format: HH:MM (24-hour). | |
| Airport Dining | Opening Hours | Opening hours of the restaurant. Format: "HH:MM - HH:MM" (e.g., "06:00 - 22:00"). | |
| Airport Dining | Number of Guests | Number of guests for the reservation. | |
| Airport Dining | Dining Duration | Expected duration of dining. Format: "X hours" (e.g., "2 hours"). | |
| Airport Dining | Dining Start Date | Date when dining starts. Format: YYYY-MM-DD. | |
| Airport Dining | Dining Start Time | Time when dining starts. Format: HH:MM (24-hour). | |
| Airport Dining | Dining End Date | Date when dining ends. Format: YYYY-MM-DD. | |
| Airport Dining | Dining End Time | Time when dining ends. Format: HH:MM (24-hour). | |

---

## Order Type 9: Airport Transfer

### Order Information Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Airport Transfer | Order ID | Unique identifier for the airport transfer order. Format: "BK-AT-XXX". | |
| Airport Transfer | Order Reference | Order reference number for the transfer service. | |
| Airport Transfer | Order Date | Date when the order was made. Format: YYYY-MM-DD. | |
| Airport Transfer | Transfer Provider | Name of the transfer service provider (e.g., "DragonPass Transfers"). | |
| Airport Transfer | Transfer Phone | Contact phone number for the transfer provider. | |
| Airport Transfer | Transfer Email | Contact email address for the transfer provider. | |
| Airport Transfer | Cancellation Policy | Cancellation policy for the transfer (e.g., "Free cancellation until 2h before transfer"). | |
| Airport Transfer | Cancellation Cost | Cost to cancel the order. Format: Currency with symbol (e.g., "£0.00"). | |
| Airport Transfer | Status | Current status of the transfer order. Values: "Confirmed" or "Completed". | |

### Itinerary Section

| Category Type | Field Name | Definition | Source |
|---------------|------------|------------|--------|
| Airport Transfer | Transfer Details Label | Label for transfer details. Value: "Transfer Details". | |
| Airport Transfer | Transfer Type | Type of transfer service (e.g., "Private Car", "Shared Shuttle", "Luxury Sedan"). | |
| Airport Transfer | Pickup Location | Location where the transfer picks up the passenger (e.g., "London City Centre", "Heathrow Terminal 5"). | |
| Airport Transfer | Dropoff Location | Location where the transfer drops off the passenger (e.g., "Heathrow Terminal 5", "London City Centre"). | |
| Airport Transfer | Vehicle Type | Type of vehicle used for the transfer (e.g., "Luxury Sedan", "SUV", "Van"). | |
| Airport Transfer | Transfer Date | Date of the transfer service. Format: YYYY-MM-DD. | |
| Airport Transfer | Transfer Time | Scheduled time for the transfer. Format: HH:MM (24-hour, e.g., "06:00"). | |
| Airport Transfer | Transfer Duration | Estimated duration of the transfer. Format: "X minutes" (e.g., "45 minutes"). | |
| Airport Transfer | Pickup Time Date | Date of pickup. Format: YYYY-MM-DD. | |
| Airport Transfer | Pickup Time | Scheduled pickup time. Format: HH:MM (24-hour). | |
| Airport Transfer | Estimated Arrival Date | Date of estimated arrival. Format: YYYY-MM-DD. | |
| Airport Transfer | Estimated Arrival Time | Estimated arrival time. Format: HH:MM (24-hour, e.g., "06:45"). | |

---

## Notes

1. **Source Column**: All Source columns are intentionally left empty for the data team to fill in with the appropriate data source information.

2. **Currency Format**: All currency fields should be formatted with the currency symbol (e.g., "£" for British Pounds) and include decimal places (e.g., "£2,190.00").

3. **Date Format**: All date fields use the format YYYY-MM-DD (e.g., "2024-03-15").

4. **Time Format**: All time fields use 24-hour format HH:MM (e.g., "14:00", "06:30").

5. **Status Values**: Status fields can have values "Confirmed" or "Completed" for MVP.

6. **Payment Methods**: Payment method values include "Credit Card", "Points", "Points + Cash", "Entitlement", and "Discount".

7. **Benefit Types**: Benefit type values include "Entitlement", "Discount", "Points", or "-" (for customer-paid only).

8. **Common Fields**: Customer Information and Payment Information sections are consistent across all order types, with only the base price field name varying by order type.

