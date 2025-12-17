## MVP Task List (43) — Updated + User Stories

### Notes
- **Format per task**: Title, Description, Acceptance Criteria, User Story
- **Title tags**:
  - **[UPDATED]**: requirement/AC changed since original tasks
  - **[NEW]**: new requirement added since original tasks
  - **[NOT MVP]**: explicitly out of MVP scope (or removed from MVP UI)
- **MVP navigation scope**: Dashboard, Analytics, Order Management, Settings
- **MVP product categories** (where applicable): **Flights, Hotels, Airport Transfers, Local Offers**
- **UI Channels** (where applicable): **WhatsApp, Live Chat, Email, Phone**

---

## 1) [NOT MVP] Authentication System & Entry Point (P0, Discovery)

### Description
Implement the authentication flow and entry point for the client portal (sign-in page, session management, and integration with DragonPass main website). **No self-serve sign-up** (backend-only account creation).

### Acceptance Criteria
- Sign-in page accessible at `/client-portal` route
- Sign-in form includes:
  - Email/username field
  - Password field
  - “Forgot Password” link
  - “Remember Me” checkbox
- After successful sign-in, user is redirected to Dashboard
- Session management maintains login state across page refreshes
- Sign-out functionality accessible from profile menu
- No sign-up functionality (backend-only account creation)
- Entry point link visible on DragonPass main website (navigation or footer) for authenticated partners/clients

### User Stories
- As a client admin, I want to sign in to the client portal so that only authorised users can access our analytics and order data.

---

## 2) [UPDATED] Header Component (Main Layout Structure) (P0, Discovery)

### Description
Build the fixed header component with DragonPass branding and a profile menu dropdown.

### Acceptance Criteria
- Header is fixed at top of page, full width
- Left side displays DragonPass branding/logo that links to Dashboard
- Right side displays profile menu (user icon/avatar)
- Profile menu dropdown shows on click with:
  - Sign out option (MVP)
  - User name/email + Account settings link (post-MVP)
- Dropdown overlays correctly (not clipped behind header)
- Header remains visible when scrolling main content
- Responsive design maintains header functionality on all screen sizes

### User Stories
- As a client admin, I want a consistent header so that navigation and account actions are always accessible.

---

## 3) [UPDATED] Sidebar Navigation (Main Layout Structure) (P0, Discovery)

### Description
Create a collapsible sidebar navigation component with MVP navigation items and active state indicators.

### Acceptance Criteria
- Sidebar is fixed on the left, collapsible with a toggle button
- Navigation items include **MVP only**:
  - Dashboard
  - Analytics
  - Order Management
  - Settings
- Each nav item displays icon and label text
- Active state indicator shows current page
- Hover effects on navigation items
- Sidebar remains visible when main content scrolls
- Collapsed state shows icons only; expanded state shows icons + labels
- Responsive behavior maintains functionality on all screen sizes

### User Stories
- As a client admin, I want a simple sidebar so that I can quickly jump between Dashboard, Analytics, Orders, and Settings.

---

## 4) Content Area & Responsive Layout (Main Layout Structure) (P0, Discovery)

### Description
Implement the main content area layout with proper scrolling behavior and responsive design.

### Acceptance Criteria
- Main content area positioned adjacent to sidebar, below header
- Content area is scrollable while sidebar remains fixed/visible
- Proper padding and margins for content
- Layout is consistent across all MVP pages
- Responsive design adjusts for different screen sizes
- Sidebar collapse/expand does not break layout

### User Stories
- As a client admin, I want the page content to scroll independently so that navigation stays visible at all times.

---

## 5) [UPDATED] Key Metrics Section (Dashboard) (P1, Discovery)

### Description
Build the key metrics section with filtering capabilities and KPI drill-down.

### Acceptance Criteria
- KPI cards displayed (MVP):
  - Revenue Mix
  - Total Users
  - MAU (Monthly Active Users)
  - User Penetration
  - Total Requests
  - Conversion Rate
  - Response Time
  - CSAT
- Each KPI card shows:
  - Metric label
  - Current value
  - Definition/subtitle
- Timeframe filter dropdown options:
  - Max (All Time)
  - YTD
  - Last 90 Days
  - Last 30 Days
  - Last 7 Days
  - Yesterday
- Default timeframe is YTD
- “View Analytics” CTA navigates to Analytics tab
- Clicking a KPI opens a modal with the metric trend chart (MVP)

### User Stories
- As a client admin, I want to see a KPI snapshot with time filtering so that I can quickly understand program performance.

---

## 6) [UPDATED] Operational Feed Section (Dashboard) (P1, Discovery)

### Description
Implement the operational feed displaying the latest order confirmations (MVP: confirmations only).

### Acceptance Criteria
- Operational feed displays the latest 20 order confirmations
- Feed is scrollable with latest orders at top
- Each feed item displays:
  - Title: “Order Confirmation”
  - Product (MVP categories: Flights, Hotels, Local Offers, Airport Transfers) + product summary
  - Type: Purchase or Redeemed (with detail if present)
  - Date(s)
  - Confirmation Number
  - Price (total price customer paid; redemptions show £0)
  - Customer (name + surname)
- “View All Orders” CTA navigates to Order Management tab
- **Revenue/commission is not displayed in MVP operational feed**

### User Stories
- As a client admin, I want to see recent confirmations so that I can monitor what’s happening operationally.

---

## 8) [UPDATED] Analytics Page Layout & Tab Navigation (P0, Discovery)

### Description
Implement the Analytics page structure with tab navigation and a global filter bar.

### Acceptance Criteria
- Analytics accessible from sidebar navigation
- Header displays “Analytics & Insights” title and subtitle
- Filter bar integrated in header actions area
- Time Period dropdown options include:
  - Yesterday, Last 7 Days, Last 30 Days, Last 90 Days, Year to Date (YTD), All Time, Custom Range
- When “Custom Range” selected, show two date inputs (Start Date + End Date)
- Tabs shown (MVP):
  - Overview (previously Program Overview)
  - User Engagement (previously Member Engagement)
  - Program Performance
  - Financial (previously Financial Impact)
  - Custom Dashboard
- Tab switching updates content without page reload
- Responsive design maintains functionality on all screen sizes

### User Stories
- As a client admin, I want analytics grouped into tabs with one consistent time filter so that exploration is fast and predictable.

---

## 9) [UPDATED] Overview Tab — KPI Cards Section (P0, Discovery)

### Description
Build the Overview (Program Overview) KPI cards with tooltip definitions and click-to-open trend modal.

### Acceptance Criteria
- KPI cards displayed:
  - Eligible Users
  - Active Users
  - Engagement Rate
  - GMV
  - Total Orders
  - Entitlement Utilization
  - Customer Satisfaction
- KPI cards show formatted values, subtitles, icon
- Tooltip definitions available on hover
- Clicking a KPI opens a trend modal (chart view)
- Values respect global time period filter
- **Cost per Member is not included**

### User Stories
- As a client admin, I want an overview of core program metrics so that I can quickly assess program health.

---

## 10) [UPDATED] Overview Tab — Monthly Activity Summary Table (P0, Discovery)

### Description
Create the “Monthly Activity Summary” table with export functionality.

### Acceptance Criteria
- Title: “Monthly Activity Summary”
- Last 6 months in reverse chronological order
- Columns include:
  - Month, New Users, Active Users, Total Users, Total Orders, Entitlement, Purchased, Value, Utilization, Conversion Rate
- Conversion Rate calculated as (transactions / total users) × 100%
- Export button generates CSV filename “program-overview-monthly-activity”
- Responsive horizontal scrolling on smaller screens
- Data respects global time period filter
- Tooltip definitions on column headers

### User Stories
- As a client admin, I want a monthly summary table so that I can export and review trends over time.

---

## 11) Overview Tab — Order Breakdown Chart (P0, Discovery)

### Description
Implement the “Order Breakdown” bar chart showing entitlement redemptions vs purchased orders.

### Acceptance Criteria
- Title: “Order Breakdown”
- Subtitle: “Entitlement redemptions vs purchased orders”
- Two series: Entitlement Orders, Purchased Orders
- Tooltips on hover
- Respects global time period filter

### User Stories
- As a client admin, I want to compare entitlement vs purchased orders so that I understand how users are consuming benefits.

---

## 12) [UPDATED] Overview Tab — Program Reach & Adoption Chart (P0, Discovery)

### Description
Implement the “Program Reach & Adoption” line chart showing **user** growth trends.

### Acceptance Criteria
- Title: “Program Reach & Adoption”
- Subtitle: “User growth trends over time”
- Series: Eligible, Active, New
- Tooltips on hover
- Respects global time period filter

### User Stories
- As a client admin, I want to see user growth trends so that I can track adoption.

---

## 13) [UPDATED] Overview Tab — User Activity Breakdown Chart (P0, Discovery)

### Description
Implement the “User Activity Breakdown” bar chart comparing monthly new vs active users.

### Acceptance Criteria
- Title: “User Activity Breakdown”
- Subtitle: “Monthly comparison”
- Series: New Users, Active Users
- Tooltips on hover
- Respects global time period filter

### User Stories
- As a client admin, I want to compare new vs active users so that I can gauge momentum.

---

## 14) [UPDATED] Overview Tab — Channel Distribution & Orders by Category Charts (P0, Discovery)

### Description
Implement the two-column layout with Channel Distribution (pie) and Orders by Category (dual-axis).

### Acceptance Criteria
- Channel Distribution:
  - Title: “Channel Distribution”
  - Subtitle: “How users access the program”
  - Channels: WhatsApp, Live Chat, Email, Phone
- Orders by Category:
  - Title: “Orders by Category”
  - Subtitle: “Order count and GMV by benefit category”
  - MVP categories only: Flights, Hotels, Airport Transfers, Local Offers
  - Dual Y-axis: Order Count and GMV
- Both charts respect global time period filter

### User Stories
- As a client admin, I want channel and category views so that I understand where usage and value come from.

---

## 15) [UPDATED] User Engagement Tab — KPI Cards Section (P0, Discovery)

### Description
Build KPI cards for user engagement metrics, including Total Requests and Request Rate.

### Acceptance Criteria
- KPI cards displayed:
  - MAU, DAU, MAC, Total Requests, Request Rate, Repeat Users, Entitlement Utilization
- Total Requests definition (client-facing):
  - Count of all assisted user requests in the selected time period. A request includes informational requests (recommendations, Q&A, trip planning) and order-related requests.
- Request Rate:
  - Users with Requests / Total Users × 100%
- KPI tiles clickable → open trend modal
- Metrics respect global time period filter

### User Stories
- As a client admin, I want to measure user engagement (including AI requests) so that I can understand adoption beyond orders.

---

## 16) [UPDATED] User Engagement Tab — Engagement Funnel Visualization (P0, Discovery)

### Description
Create funnel visualization showing conversion from eligible users through requests and orders.

### Acceptance Criteria
- Title: “User Engagement Funnel”
- Stages:
  - Eligible Users (100%)
  - Users with Requests
  - Users with Orders
  - Users with Repeat Orders
- Each stage shows count and % of eligible
- Safe calculations (no NaN)
- Respects global time period filter

### User Stories
- As a client admin, I want a full funnel so that I can see how requests translate into orders over time.

---

## 17) User Engagement Tab — Daily Active Trends Chart (P0, Discovery)

### Description
Implement multi-line chart showing DAU, WAU, MAU trends.

### Acceptance Criteria
- Title: “Daily Active Trends”
- Subtitle: “DAU, WAU, MAU over time”
- Series: DAU, WAU, MAU
- Tooltips on hover

### User Stories
- As a client admin, I want daily trends so that I can spot short-term engagement changes.

---

## 18) [UPDATED] User Engagement Tab — User Segmentation Table (P0, Discovery)

### Description
Build segmentation table for engagement analysis.

### Acceptance Criteria
- Title: “User Segmentation”
- Columns: Segment, Users, Avg. Orders, Value, Trend
- Segments: New, Active, Repeat
- Trend indicators with directional arrows
- Respects global time period filter

### User Stories
- As a client admin, I want segmentation so that I can understand how different user groups behave.

---

## 19) [UPDATED] User Engagement Tab — Entitlement Utilization by Benefit Type Chart (P0, Discovery)

### Description
Build horizontal bar chart showing entitlement utilization by benefit type.

### Acceptance Criteria
- Title: “Entitlement Utilization by Benefit Type”
- Subtitle: “Usage breakdown”
- MVP focus types only: Flights, Hotels, Local Offers, Airport Transfers
- Utilization shown as 0–100%
- Tooltips on hover
- Respects global time period filter

### User Stories
- As a client admin, I want utilization by benefit type so that I can see which benefits drive usage.

---

## 20) [UPDATED] Program Performance Tab — Quality Scorecard KPIs (P0, Discovery)

### Description
Create KPI cards for quality metrics.

### Acceptance Criteria
- KPI cards displayed:
  - Order Confirmation (previously Booking Confirmation)
  - Automation Rate
  - CSAT
  - NPS
  - FCR
  - Response Time
- Order Confirmation:
  - Tile subtitle: Successfully confirmed orders
  - Modal subtitle/definition: Percentage of orders attempts that are successfully confirmed.
- Response Time uses inverse trend (lower is better)
- KPI tiles clickable → open trend modal
- Tooltips provide definitions

### User Stories
- As a client admin, I want quality KPIs so that I can monitor service delivery performance.

---

## 21) Program Performance Tab — Quality Metrics Over Time Chart (P0, Discovery)

### Description
Implement multi-line chart for quality trends showing CSAT, NPS, and FCR over time.

### Acceptance Criteria
- Title: “Quality Metrics Over Time”
- Subtitle: “CSAT, NPS, and FCR trends”
- Series: CSAT, NPS, FCR %
- Tooltips and legends included
- Respects global time period filter

### User Stories
- As a client admin, I want to see quality trends so that I can tell if service is improving.

---

## 22) [UPDATED] Program Performance Tab — SLA Performance by Channel & Channel Comparison (P0, Discovery)

### Description
Implement two charts comparing SLA and quality by channel.

### Acceptance Criteria
- Channels are exactly: WhatsApp, Live Chat, Email, Phone
- SLA Performance by Channel:
  - Horizontal bar chart
  - SLA % on 0–100 axis
- Channel Comparison:
  - Volume vs CSAT by channel
- Tooltips and legends included
- Respects global time period filter

### User Stories
- As a client admin, I want channel comparisons so that I can identify where service is underperforming.

---

## 23) [UPDATED] Program Performance Tab — Channel Performance Summary Table (P0, Discovery)

### Description
Create table showing channel performance metrics with status indicators.

### Acceptance Criteria
- Table title: “Channel Performance Summary”
- Columns: Channel, Volume, SLA %, Response Time, FCR, CSAT, Status
- Channels: WhatsApp, Live Chat, Email, Phone
- Responsive with horizontal scrolling if needed
- Respects global time period filter

### User Stories
- As a client admin, I want a channel summary table so that I can review volume and quality in one place.

---

## 24) [UPDATED] Financial Tab — Financial KPI Cards (P0, Discovery)

### Description
Build KPI cards for Financial tab (MVP KPI set).

### Acceptance Criteria
- KPI cards displayed:
  - Transaction Revenue
  - GMV
  - Revenue Mix
  - Conversion Rate
- Removed from MVP:
  - Cost per Member
  - Program ROI
  - ROI %
- KPI tiles clickable → open trend modal
- Tooltips provide definitions

### User Stories
- As a client admin, I want financial KPIs so that I can track revenue and conversion performance.

---

## 25) [UPDATED] Financial Tab — Transaction Revenue Trends Chart (P0, Discovery)

### Description
Implement transaction revenue trends area chart.

### Acceptance Criteria
- Title: “Transaction Revenue Trends”
- Subtitle uses user-paid language
- X-axis months; Y-axis revenue
- Tooltips format values as currency
- Respects global time period filter

### User Stories
- As a client admin, I want revenue trends so that I can understand growth over time.

---

## 26) [UPDATED] Financial Tab — Budget vs Actual Chart (Cost Breakdown removed) (P0, Discovery)

### Description
Implement the **Budget vs Actual** chart in the Financial tab.

### Acceptance Criteria
- Budget vs Actual chart is displayed in Financial tab
- Chart title: “Budget vs Actual”
- Chart subtitle: “Forecast comparison”
- Chart type: grouped bar chart comparing **Forecast vs Actual**
- Forecast represents the client’s budget / entitlement allocation (as defined with the data team)
- Tooltips format values as currency
- Chart respects the global time period filter

### User Stories
- As a client admin, I want to compare budget vs actual so that I can understand whether performance is on track.

---

## 27) [UPDATED] Financial Tab — Monthly Financial Summary Table (P0, Discovery)

### Description
Build table showing month-over-month financial overview with budget variance indicators.

### Acceptance Criteria
- Table title: “Monthly Financial Summary”
- Columns (MVP): Month, Transaction Revenue, GMV, Cost, vs Budget
- ROI column removed from MVP
- Budget variance shows ±X.X% with trend indicators
- Respects global time period filter

### User Stories
- As a client admin, I want a monthly summary so that I can compare revenue, GMV, cost, and budget variance.

---

## 28) Financial Tab — Entitlement Value Utilization & Value by Benefit Type (P0, Discovery)

### Description
Implement entitlement value utilization gauge and value by benefit type chart.

### Acceptance Criteria
- Entitlement Value Utilization shows utilized vs allocated and utilization %
- Value by Benefit Type shows Allocated vs Used
- Respects global time period filter

### User Stories
- As a client admin, I want entitlement value views so that I can understand allocated vs used value.

---

## 29) [UPDATED] Custom Dashboard Tab — Layout & Header Section (P0, Discovery)

### Description
Implement two-panel custom dashboard layout with header actions.

### Acceptance Criteria
- Widget library (left) and dashboard workspace (right)
- Editable dashboard name (default “My Custom Dashboard”)
- Action buttons: Save, Save As, Load View, New, Export
- Category naming aligns to current tabs (Overview/User Engagement/Program Performance/Financial)

### User Stories
- As a client admin, I want to build a custom dashboard so that I can tailor analytics to my organisation’s needs.

---

## 30) [UPDATED] Custom Dashboard Tab — Widget Library Panel (P0, Discovery)

### Description
Build widget library with search, category filters, and widget cards.

### Acceptance Criteria
- Search widgets by name/description
- Category filters align to current analytics categories
- Widget cards show icon, name, description, type badge
- Click/drag adds widget to workspace

### User Stories
- As a client admin, I want a widget library so that I can quickly find and add the insights I care about.

---

## 31) Custom Dashboard Tab — Dashboard Workspace & Widget Display (P0, Discovery)

### Description
Implement dashboard workspace with empty state, grid layout, and widget display controls.

### Acceptance Criteria
- Empty state message + instructions
- Responsive grid layout
- Widget header: drag handle, icon, name, time badge, config, remove
- Reordering supported

### User Stories
- As a client admin, I want to arrange widgets so that my dashboard is easy to consume.

---

## 32) Custom Dashboard Tab — Widget Configuration Modal (P0, Discovery)

### Description
Create configuration modal for widget title, time period, and trend display options.

### Acceptance Criteria
- Modal opens from widget config button
- Supports custom title and custom time period
- KPI widgets can toggle trend display (if supported)
- Save/cancel supported; config persists with dashboard view

### User Stories
- As a client admin, I want to configure widgets so that each widget matches how I report internally.

---

## 33) Custom Dashboard Tab — Dashboard View Management (P0, Discovery)

### Description
Implement save/load view management with local persistence.

### Acceptance Criteria
- Save overwrites; Save As creates new view
- Name validation unique
- Load dropdown lists saved views
- New clears dashboard
- Stored in localStorage (MVP)

### User Stories
- As a client admin, I want to save multiple dashboards so that different stakeholders can use tailored views.

---

## 34) Custom Dashboard Tab — Widget Rendering & Data Fetching (P0, Discovery)

### Description
Implement widget renderer for KPI/chart/table widgets with analytics service data fetching.

### Acceptance Criteria
- KPI/chart/table widgets render correctly
- Data fetched based on widget category
- Respects widget-level or global time period
- Per-widget loading/error states

### User Stories
- As a client admin, I want widgets to load reliably so that my dashboards are trustworthy.

---

## 35) Custom Dashboard Tab — Export Functionality (P0, Discovery)

### Description
Implement CSV export for dashboard summary and widget metadata.

### Acceptance Criteria
- Export button produces CSV file
- Includes dashboard metadata + widget inventory
- Disabled if no widgets

### User Stories
- As a client admin, I want to export my dashboard so that I can share it externally.

---

## 36) [UPDATED] Order Management Page Layout & Filters (P1, Discovery)

### Description
Implement Order Management layout, tabs, and filters for the Orders table.

### Acceptance Criteria
- Page header title/subtitle
- Orders tab present (Action Center is Not in MVP)
- Filters panel with Order Type, Status, Date Range filters
- Search by customer name, order reference, order ID, trip ID
- Clear All resets filters
- Filters apply to table data

### User Stories
- As a client admin, I want robust filtering so that I can quickly find the right order/trip.

---

## 37) Main Orders Table with Trip Grouping (P1, Discovery)

### Description
Build the orders table with trip grouping and expand/collapse behavior.

### Acceptance Criteria
- Columns include: Trip ID, Order ID, Customer Name, Type, Service Date, Benefit Type, Total Price, Customer Purchase, Funded Cost, Status, Details
- Group by Trip ID with expand/collapse
- Collapsed trip shows summary; expanded shows order rows
- “View Details” opens modal

### User Stories
- As a client admin, I want trips grouped so that I can understand a customer’s trip holistically.

---

## 38) [UPDATED] Detail Modal — Structure & Common Sections (P1, Discovery)

### Description
Build the detail modal and common collapsible sections.

### Acceptance Criteria
- Modal opens from “View Details”
- Modal header includes order type badge, Order ID, status badge, close button
- Collapsible sections:
  - Order Information
  - Itinerary
  - Customer Information
  - Payment Information
- Modal responsive and scrollable
- Itinerary includes Add-on Benefits section (when present)

### User Stories
- As a client admin, I want a single detail modal so that I can review order, itinerary, customer, and payment info without leaving the table.

---

## 39) [UPDATED] Detail Modal — MVP Order Types Only (Flights, Hotels, Local Offers, Airport Transfers) (P1, Discovery)

### Description
Implement the Order Information + Itinerary fields for the 4 MVP product categories.

### Acceptance Criteria
- MVP order types supported: Flights, Hotels, Local Offers, Airport Transfers
- Customer info section consistent across MVP types (Name, Email, Phone)
- Payment info section consistent across MVP types:
  - Total Amount, Payment Method, Card Last 4 (if applicable), Base Price (type-specific), Taxes & Fees, Discount Applied, Payment Method Breakdown
- Itinerary shows service-specific details and Add-on Benefits (when present)
- Remove redundant itinerary identity blocks (passenger/guest/attendee) in MVP UI

### User Stories
- As a client admin, I want to see the right fields per order type so that I can support customers effectively.

---

## 40) [UPDATED] Settings Page Layout & Tab Navigation (P2, Discovery)

### Description
Implement Settings page layout with MVP tabs.

### Acceptance Criteria
- Page title/subtitle
- Tabs:
  - Team
  - General
- Tab switching with active state
- Each tab content includes header section with icon/title/description
- Non-MVP tabs are removed or clearly labeled as Not in MVP

### User Stories
- As a client admin, I want settings organised into clear tabs so that I can manage team and client info quickly.

---

## 41) General Tab — Client Information Section (P2, Discovery)

### Description
Build Client Information card for editing client profile.

### Acceptance Criteria
- Fields:
  - Organization Name (editable)
  - Primary Contact Email (editable)
  - Telephone (editable)
  - Account Manager (read-only)
- Save button saves changes
- Email field browser validation

### User Stories
- As a client admin, I want to update client profile details so that our account information stays accurate.

---

## 42) [UPDATED] Team Tab — Team Users List (P2, Discovery)

### Description
Build the team list with role management and **Delete account** capability.

### Acceptance Criteria
- Stats cards: Team users, Admins, Invite rights
- Team list shows avatar, name, email, role badge, invite badge
- Role dropdown updates invite rights
- Delete button per user row opens confirmation modal
- Confirming deletion removes user from list and updates stats

### User Stories
- As an admin, I want to manage roles and remove access so that only the right people can use the portal.

---

## 43) [UPDATED] Team Tab — Invite Team User Form (P2, Discovery)

### Description
Build invite form for adding new team users.

### Acceptance Criteria
- Heading: “Invite a team user”
- Fields: Full Name (required), Email (required), Role (Admin/Manager/Viewer; default Viewer)
- On submit: adds user to list, updates stats, clears form
- Note: email sending is backend-integrated (post-MVP) but UI supports invite creation

### User Stories
- As an admin, I want to invite a new team user so that colleagues can access the portal with the right permissions.


