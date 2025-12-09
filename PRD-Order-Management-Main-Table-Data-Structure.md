# PRD: Order Management Main Table Data Structure

## Overview
This document defines the data structure for the main trip table in the Order Management view. The table displays all customer orders organized by trips, with each row showing key order information. The Source column is left empty for the data team to fill in.

## Main Trip Table Data Structure

The main trip table displays the following fields for each order:

| Field Name | Definition | Source |
|------------|------------|--------|
| Trip ID | Unique identifier for the trip that groups related orders together. Format: "TRIP-XXX" or custom identifier. | |
| Order ID | Unique identifier for the individual order. Format: "BK-XX-XXX" (e.g., "BK-FL-001" for flight order). | |
| Customer Name | Full name of the customer who made the order. | |
| Type | The type of order/service. Values: Flight, Hotel, Event Ticket, eSIM, Health & Wellness, Fast Track, Airport Lounge, Airport Dining, Airport Transfer. Displayed with icon. | |
| Service Date | The date when the service is scheduled to occur. For flights: departure date; for hotels: check-in date; for events: event date; for eSIM: shows "Active"; for health & wellness: service date; for fast track: service date; for airport lounge: access date; for airport dining: dining date; for airport transfer: transfer date. | |
| Benefit Type | Type of benefit used to fund the order. Values: "Entitlement", "Discount", "Points", or "-" (if customer-paid only). | |
| Total Price | The full service price regardless of payment method. Always shows the complete cost of the service, whether paid by customer or funded by client. Format: Currency with symbol (e.g., "£2,190.00"). | |
| Customer Purchase | The amount paid by the customer. Shows the customer-paid portion for Credit Card payments, cash portion for Points + Cash payments, customer-paid amount for Discount payments, or "-" if fully benefit-funded. Format: Currency with symbol or "-". | |
| Funded Cost | The amount funded by the client for benefits. Shows the full price for Entitlement payments, discount amount for Discount payments, or "-" for customer-paid or Points payments. Format: Currency with symbol or "-". | |
| Status | Current status of the order. Values: "Confirmed" or "Completed". Displayed as color-coded badge. | |
| Details | Action button to open the detailed order view modal. Text: "View Details". | |

## Notes

1. **Source Column**: All Source columns are intentionally left empty for the data team to fill in with the appropriate data source information.

2. **Currency Format**: All currency fields should be formatted with the currency symbol (e.g., "£" for British Pounds) and include decimal places (e.g., "£2,190.00").

3. **Date Format**: All date fields use the format YYYY-MM-DD (e.g., "2024-03-15").

4. **Time Format**: All time fields use 24-hour format HH:MM (e.g., "14:00", "06:30").

5. **Status Values**: Status fields can have values "Confirmed" or "Completed" for MVP.

6. **Payment Methods**: Payment method values include "Credit Card", "Points", "Points + Cash", "Entitlement", and "Discount".

7. **Benefit Types**: Benefit type values include "Entitlement", "Discount", "Points", or "-" (for customer-paid only).

