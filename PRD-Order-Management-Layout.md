# PRD: Order Management Tab Layout & Structure

## Overview
The Order Management tab provides a comprehensive view of all customer orders organized by trips. Users can filter, search, and view detailed information about individual orders. The tab focuses on viewing and managing customer orders in a trip-grouped format, making it easy to see related orders together.

## Objectives
- Provide a clear view of all customer orders
- Group related orders into trips for better organization
- Enable filtering and searching of orders
- Display detailed order information in a modal view
- Support multiple order types (Flight, Hotel, Event Ticket, eSIM, Health & Wellness, Fast Track, Airport Lounge, Airport Dining, Airport Transfer)

## Page Header

### Header Section
- **Page Title**: "Order Management"
- **Page Subtitle**: "View and manage all customer orders"
- **Location**: Top of the page, above tab navigation

## Tab Structure

### Tab Navigation
- **Tab Container**: Horizontal tab navigation with rounded background
- **Active Tab**: "📋 Orders" (default active tab)
- **Inactive Tab**: "⚡ Action Center (Not in MVP)" (disabled/not available in MVP)
- **Tab Styling**: Active tab has primary color background, inactive tabs are transparent
- **Tab Behavior**: Clicking "Orders" tab shows the main orders view

### Tab Content Area
- **Orders Tab Content**: Displays the main orders table and filters
- **Action Center Tab**: Not included in MVP (marked as "Not in MVP")

## Filters Section

### Filters Header
- **Location**: Above the orders table
- **Layout**: Two-column layout with filters toggle on left, clear button on right
- **Filter Toggle Button**:
  - Icon: 🔍 (search icon)
  - Text: "Filters"
  - Badge: Shows count of active filters (only visible when count > 0)
  - Active State: Button highlighted when filters panel is open
  - Behavior: Toggles expandable filters panel

- **Clear All Button**:
  - Text: "Clear All"
  - Location: Right side of filters header
  - Visibility: Only shown when active filters count > 0
  - Behavior: Resets all filters to default values

### Expandable Filters Panel
- **Visibility**: Shown when filter toggle is active
- **Layout**: Grid layout with filter groups
- **Filter Groups**:

#### Order Type Filter
- **Label**: "Order Type"
- **Type**: Dropdown select
- **Options**:
  - All Types (default)
  - ✈️ Flights
  - 🏨 Hotels
  - 🎫 Event Tickets
  - 📱 eSIM
  - 🧘 Health & Wellness
  - ⚡ Fast Track
  - 🛋️ Airport Lounge

#### Status Filter
- **Label**: "Status"
- **Type**: Dropdown select
- **Options**:
  - All Statuses (default)
  - Confirmed
  - Completed

#### Order Date Range Filter
- **Label**: "Order Date Range"
- **Type**: Date range inputs
- **Components**:
  - "From" date input
  - "to" separator text
  - "To" date input
- **Format**: Date picker inputs

#### Search Functionality
- **Location**: Integrated into filters (if applicable)
- **Behavior**: Search by customer name, order reference, order ID, or trip ID

## Main Table Structure

### Table Container
- **Layout**: Full-width table container with rounded corners and shadow
- **Responsive**: Horizontal scrolling on smaller screens

### Table Headers
The table includes the following columns (in order):
1. **Trip ID** - Unique identifier for the trip
2. **Order ID** - Unique identifier for the order
3. **Customer Name** - Name of the customer who made the order
4. **Type** - Order type with icon (Flight, Hotel, etc.)
5. **Service Date** - Date of service (varies by order type)
6. **Benefit Type** - Type of benefit used (Entitlement, Discount, Points, or "-")
7. **Total Price** - Full service price regardless of payment method
8. **Customer Purchase** - Amount paid by customer (or "-" if benefit-funded)
9. **Funded Cost** - Amount funded by client for benefits (or "-" if customer-paid)
10. **Status** - Order status badge (Confirmed, Completed)
11. **Details** - "View Details" button to open detail modal

### Table Body Structure

#### Trip Grouping
Orders are automatically grouped by Trip ID. Each trip group contains:

**Trip Header Row**:
- **Appearance**: Distinct header row spanning all columns
- **Content**:
  - Expand/Collapse toggle button (▼ icon)
  - Trip icon (🌍)
  - Trip ID
  - Customer name
  - Trip summary: "[X] order(s) • Total: £[amount]"
  - Trip status badge
- **Behavior**: Clicking toggle expands/collapses all orders in the trip
- **Styling**: Highlighted background, distinct from order rows

**Collapsed Trip Summary Row** (when trip is collapsed):
- **Display**: Single row showing trip summary
- **Columns**:
  - Trip indicator icon (🔗)
  - Trip ID
  - Customer name
  - Trip summary text
  - Aggregated total price
  - Aggregated customer purchase
  - Aggregated benefit types
  - Aggregated funded cost
  - Trip status
  - "Expand Trip" button

**Expanded Order Rows** (when trip is expanded):
- **Display**: Individual rows for each order in the trip
- **Trip Indicator**: First column shows trip link icon (🔗) for orders within a trip
- **Order Details**: Each row shows full order information
- **Styling**: Slightly indented or visually connected to show trip relationship

**Single Order Trips**:
- **Display**: Orders without a trip group appear as individual rows
- **No Trip Header**: No expand/collapse functionality
- **Standard Row**: Regular order row format

### Table Row States

#### Trip Header Row
- **Background**: Distinct color to separate from order rows
- **Hover**: Visual feedback on hover
- **Toggle Icon**: Rotates or changes when expanded/collapsed

#### Order Rows
- **Hover State**: Highlight on hover
- **Trip Indicator**: Visual link icon for orders in multi-order trips
- **Status Badge**: Color-coded status indicator

## Trip Grouping Features

### Trip Identification
- **Trip ID Format**: "TRIP-XXX" or custom trip identifier
- **Grouping Logic**: Orders with same Trip ID are grouped together
- **Single Order Trips**: Orders without matching Trip ID appear individually

### Expand/Collapse Functionality
- **Toggle Button**: Located in trip header row
- **Icon State**: 
  - Expanded: ▼ (pointing down)
  - Collapsed: ▼ rotated (pointing right)
- **Behavior**: 
  - Clicking expands to show all orders in trip
  - Clicking again collapses to show trip summary
- **State Persistence**: Each trip's expand/collapse state is independent

### Trip Summary Information
When collapsed, trip summary shows:
- Total number of orders in trip
- Aggregated total value
- Customer name
- Aggregated customer purchase amount
- List of benefit types used
- Aggregated funded cost
- Overall trip status (Confirmed if all orders confirmed, Completed if all orders completed)

## Detail Modal

### Modal Structure
- **Trigger**: "View Details" button in Details column
- **Overlay**: Semi-transparent backdrop
- **Modal Size**: Large modal (modal-large class)
- **Close Button**: × button in top-right corner
- **Click Outside**: Clicking overlay closes modal

### Modal Header
- **Order Type Badge**: Icon and order type name
- **Order ID**: Large heading showing order ID
- **Status Badge**: Status indicator with color coding
- **Close Button**: × in top-right

### Modal Body
- **Layout**: Scrollable content area
- **Sections**: Collapsible sections with icons

#### Collapsible Sections
Each section has:
- **Section Header**: 
  - Icon (section-specific)
  - Section title
  - Collapse/expand icon (▼)
- **Section Content**: 
  - Detail grid layout
  - Field labels and values
  - Section-specific information

#### Section Types (All Order Types)
1. **Order Information** (📋)
   - Order-specific details
   - Order references
   - Provider information
   - Cancellation policies

2. **Itinerary** (order type-specific icon)
   - Service-specific itinerary details
   - Dates and times
   - Locations and addresses
   - Service-specific features

3. **Customer Information** (👤)
   - Customer name
   - Email
   - Phone
   - Reward program information
   - Reward program number

4. **Payment Information** (💳)
   - Total amount
   - Payment method
   - Payment breakdown
   - Base prices, taxes, fees
   - Discounts applied
   - Payment method breakdown (Credit Card, Points, Entitlement, Discount)

### Order Type-Specific Detail Views

#### Flight
- **Itinerary**: Outbound and inbound flight segments
- **Flight Details**: Flight numbers, times, airports
- **Passenger Information**: Passenger names and types
- **Order Information**: Airline, cabin class, fare class, bags, seats

#### Hotel
- **Itinerary**: Check-in/check-out dates and times
- **Hotel Details**: Hotel name, address, room type
- **Guest Information**: Guest names
- **Order Information**: Chain name, property type, star rating, cancellation policy

#### Event Ticket
- **Itinerary**: Event details, venue, date, time
- **Ticket Information**: Seat category, number of tickets
- **Order Information**: Event type, provider, cancellation policy

#### eSIM
- **Itinerary**: Destination, data allowance, validity period
- **eSIM Details**: Network provider, activation status
- **Features**: eSIM features list
- **Order Information**: Provider, cancellation policy

#### Health & Wellness
- **Itinerary**: Service details, location, duration
- **Service Information**: Service name, location, timing
- **Features**: Service features list
- **Order Information**: Provider, cancellation policy

#### Fast Track
- **Itinerary**: Airport, terminal, service type, timing
- **Fast Track Details**: Location, hours, duration
- **Features**: Fast track features list
- **Order Information**: Provider, pre-book status, cancellation policy

#### Airport Lounge
- **Itinerary**: Airport, terminal, lounge name, access times
- **Lounge Details**: Location, directions, hours
- **Features**: Lounge amenities list
- **Order Information**: Provider, guest count, cancellation policy

#### Airport Dining
- **Itinerary**: Restaurant name, location, dining time
- **Dining Details**: Cuisine type, guests, duration
- **Order Information**: Provider, cancellation policy

#### Airport Transfer
- **Itinerary**: Pickup/dropoff locations, vehicle type, timing
- **Transfer Details**: Transfer type, date, time, duration
- **Order Information**: Provider, cancellation policy

## User Interactions

### Filtering
1. Click "Filters" button to expand filter panel
2. Select filter options from dropdowns
3. Enter date range in date inputs
4. Active filter count badge updates
5. Table automatically filters based on selections
6. Click "Clear All" to reset all filters

### Searching
- Search by customer name, booking reference, order ID, or trip ID
- Real-time filtering as user types

### Trip Expansion/Collapse
1. Click expand/collapse button in trip header
2. Trip expands to show all orders
3. Click again to collapse to summary view

### Viewing Order Details
1. Click "View Details" button in any order row
2. Modal opens with order details
3. Expand/collapse sections as needed
4. Click × or outside modal to close

## Loading and Error States

### Loading State
- Display loading indicator while fetching order data
- Maintain table structure during load
- Show "Loading orders..." message

### Error State
- Display error message if data fails to load
- Allow retry without page refresh
- Show "Error loading orders. Please try again." message

### Empty State
- Show message when no orders match filters
- Display "No orders found" with suggestion to adjust filters
- Show empty table structure

## Responsive Design

### Desktop View
- Full table with all columns visible
- Filters panel expands inline
- Modal displays at optimal size

### Tablet View
- Table may require horizontal scrolling
- Filters remain accessible
- Modal adapts to screen size

### Mobile View
- Table scrolls horizontally
- Filters may stack vertically
- Modal takes full screen or near-full screen

