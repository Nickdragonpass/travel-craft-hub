## Layout & Structure Overview
This is a client portal for our clients to access analytics, manage orders, and configure settings (and in the future fully build, manage, and optimise their loyalty programs). Clients access it via the DragonPass main website with authentication.

## MVP Scope
For MVP, this PRD covers only:
- Dashboard
- Analytics
- Order Management
- Settings

## Access & Authentication (MVP)

### Entry Point
- Link on the DragonPass main website (e.g., "Client Portal" or "Partner Portal" in navigation or footer)
- Visible to authenticated partners/clients
- URL: /client-portal (target state)

### Authentication
- Sign-in page required before accessing the portal (target state)
- Sign-in form with email/username, password, "Forgot Password" link, and "Remember Me" option
- After sign-in, redirect to the main dashboard
- Session management to maintain login state
- Sign-out functionality accessible from profile menu
- IMPORTANT: No sign up in MVP (signup will be enabled through backend only)

Note (current MVP implementation): Authentication is not fully implemented yet; the UI includes a top-right profile dropdown with Log out.

## Main Layout Structure

### Overall Layout
- Fixed header at top
- Collapsible sidebar on left
- Main content area (scrollable, sidebar remains visible)
- Consistent layout across all pages

### Header Component
- Position: Top header, full width
- Left side:
  - DragonPass branding/logo (links to Dashboard)
- Right side:
  - Profile menu (user icon/avatar)
  - Dropdown on click (MVP):
    - Log out option (returns user to landing page)
  - Future (post-MVP):
    - User name and email
    - Account settings link

### Sidebar Navigation (MVP)
- Position: Left sidebar, collapsible
  - Collapse/expand toggle button
- Navigation items (MVP):
  - Dashboard (default active on load)
  - Analytics
  - Order Management
  - Settings
- Each nav item:
  - Icon
  - Label text
  - Active state indicator
  - Hover effects

### Main Content Area
- Position: Adjacent to sidebar, below header
- Layout:
  - Scrollable content area
  - Sidebar remains fixed/visible
  - Responsive padding and margins

## Homepage / Dashboard Overview
The homepage dashboard is the landing view after sign-in (target state). For MVP, the dashboard has two key areas:
- Key metrics to view at a glance
- Operational feed showing confirmed orders (latest at the top)

This homepage will be extended as we build out additional portal capabilities, but MVP should remain clean and simple for clients.

## Key Metrics
Key metrics give clients a quick birds eye view of the ongoing performance of their program.

### Main dashboard key metrics (MVP)
Metric | Definition
---|---
Revenue Mix | Split of subscription vs user-paid revenue mix (displayed as “X% / Y%”)
Total Users | Total count of users
MAU (Monthly Active Users) | Users active in last 30 days
User Penetration | Share of total users who engaged (requests or orders) in the selected time period
Total Requests | Count of all assisted user requests in the selected time period. A request includes informational requests (recommendations, Q&A, trip planning) and order-related requests.
Conversion Rate | Percentage of total users that resulted in an order. Calculation: (Total Orders / Total Users) × 100%
Response Time | Average user support response time
CSAT | User satisfaction score (1–5 scale)

Notes
- Total Orders is not shown as a dashboard KPI in MVP.
- Revenue/commission is not shown in the dashboard Operational Feed in MVP.

## Key Metrics Filtering
Key metrics can be filtered by:
- Max (All Time)
- YTD (Year To Date)
- Last 90 Days
- Last 30 Days
- Last 7 Days
- Yesterday

Default setting: YTD

## CTA Button (Key Metrics)
Key metrics area includes a CTA button to "View Analytics" which navigates to the Analytics tab for deeper analysis.

## Operational Feed Requirements
The operational feed gives clients a birds eye view on the latest order confirmations coming through.

For MVP:
- Only order confirmations are included (no cancellations/modifications/support tasks yet)
- The feed is scrollable, showing latest items at the top
- Up to the latest 20 order confirmations are shown

### Operational Feed Data Requirements (MVP)
Data Field | Definition
---|---
Title of feed | Always "Order Confirmation"
Product | Product type/category and product summary (MVP product categories: Flights, Hotels, Local Offers, Airport Transfers)
Date(s) | Dates of travel / consumption of the order
Quantity | Quantity of products/services in the order
Type | Purchase or Redeemed (with detail if present)
Price | Total price of the order (Entitlement/redemption would show £0)
Confirmation Number | Supplier confirmation/reference number
Customer | Customer name (e.g., Name + Surname)

CTA Button (Operational Feed)
Operational Feed includes a CTA button to "View All Orders" which navigates to the Order Management tab.


