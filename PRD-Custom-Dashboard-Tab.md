# PRD: Custom Dashboard Tab

## Overview
The Custom Dashboard tab enables users to create personalized analytics dashboards by selecting, arranging, and configuring widgets from a comprehensive library. Users can save multiple dashboard views and export their custom dashboards.

## Objectives
- Enable personalized dashboard creation
- Provide drag-and-drop widget placement
- Allow dashboard view saving and loading
- Support widget-level configuration
- Enable dashboard export functionality

## Layout Structure

### Two-Panel Layout
- **Left Panel**: Widget Library (collapsible)
- **Right Panel**: Dashboard Workspace

### Header Section
- **Dashboard Name**: Editable dashboard name display
  - Default: "My Custom Dashboard"
  - Inline editing capability
  - Save on blur/enter/Escape
  - Edit button to enable editing mode
- **Action Buttons**:
  - Save (disabled if no widgets)
  - Save As... (disabled if no widgets)
  - Load View (dropdown)
  - New (only shown if saved views exist)
  - Export (CSV format, disabled if no widgets)

## Widget Library

### Library Features
- **Search Functionality**: Search widgets by name or description
- **Category Filters**: Filter by category
  - All
  - Program Overview
  - Member Engagement
  - Program Performance
  - Financial Impact
- **Widget Display**: Grid layout of widget cards
- **Widget Card Information**:
  - Icon
  - Name
  - Description (2 lines max, truncated)
  - Type badge (KPI, Chart, Table)

### Widget Categories
- **Program Overview**: 10+ widgets (KPIs, charts, tables)
- **Member Engagement**: 10+ widgets (KPIs, charts, tables)
- **Program Performance**: 10+ widgets (KPIs, charts, tables)
- **Financial Impact**: 10+ widgets (KPIs, charts, tables)

### Widget Types
- **KPI Widgets**: Single metric displays with trends
- **Chart Widgets**: Line charts, bar charts, pie charts, composed charts, funnels
- **Table Widgets**: Data tables with formatted values

### Widget Interaction
- Click widget card to add to dashboard
- Drag widget card to dashboard workspace
- Visual feedback during drag operations

## Dashboard Workspace

### Empty State
- Message: "Your Dashboard is Empty"
- Instruction: "Drag widgets from the library or click to add them to your dashboard"
- Visual drop zone indicator when dragging
- Button to show widget library if hidden

### Widget Grid
- Responsive grid layout
- Widgets arranged in order added
- Visual spacing between widgets

### Widget Display
Each widget in dashboard shows:
- **Header Section**:
  - Drag handle (⋮⋮) for reordering
  - Widget icon
  - Widget name (configurable)
  - Time period badge (if custom time period set)
  - Configuration button (⚙️)
  - Remove button (×)
- **Content Section**: Renders actual widget UI
  - KPI cards with values
  - Charts with data
  - Tables with formatted data

## Drag-and-Drop Functionality

### Adding Widgets from Library
- Drag widget card from library
- Drop onto dashboard workspace
- Widget added to end of grid
- Visual feedback during drag

### Reordering Widgets
- Drag existing widget by drag handle
- Drop before another widget to reposition
- Visual indicators for drop zones
- Smooth reordering animation

### Visual Feedback
- Dragging state highlights
- Drop zone indicators
- Cursor changes (grab/grabbing)
- Widget opacity changes during drag

## Widget Configuration

### Configuration Modal
- **Access**: Click configuration button (⚙️) on widget
- **Fields**:
  - Custom Title (optional, overrides default name)
  - Custom Time Period (optional)
    - Options: Use Global Filter, Yesterday, Last 7 Days, Last 30 Days, Last 90 Days, Year to Date (YTD), All Time
    - Allows widget-level time filtering
  - Show Trend Indicator (KPI widgets only)
    - Checkbox to show/hide trend arrows and percentages
- **Preview Section**: Shows preview of configured widget
- **Actions**:
  - Save
  - Cancel

### Configuration Behavior
- Custom title appears in widget header
- Custom time period overrides global filter for that widget
- Time period badge shows when custom period is set
- Configurations saved with dashboard view
- Trend indicator toggle affects KPI widget display

## Dashboard View Management

### Save Functionality
- **Save**: Overwrites current view if saved previously
- **Save As**: Creates new view with new name
- **Validation**:
  - Name required
  - Name must be unique
- **Success/Error Messages**: 
  - Success: "Dashboard saved successfully!"
  - Error: "A dashboard with this name already exists"
- **Button State**: Disabled if no widgets in dashboard

### Load Functionality
- **Load Dropdown**: Lists all saved dashboard views
- **Selection**: Loads selected view's widgets and configuration
- **Success Message**: "Loaded '[Dashboard Name]'"
- **New Dashboard**: Clears current dashboard and resets to default
- **Empty State**: Shows "No saved views" if none exist

### View Storage
- Stored locally (browser localStorage)
- Each view includes:
  - Unique ID
  - Name
  - Widget array with configurations
  - Creation timestamp
  - Last updated timestamp

### Dashboard Name Editing
- Inline editing in header
- Edit button to enable editing mode
- Input field with save/cancel buttons
- Save on Enter key, cancel on Escape key
- Validation: Name must be unique

## Export Functionality

### Export Button
- **Location**: Header section
- **Format**: CSV only
- **Export Content**: 
  - Dashboard configuration summary
  - Widget list with metadata
  - Timestamp and dashboard name

### Export File
- **Filename**: `dashboard-summary-[name]-YYYY-MM-DD.csv`
- **Content**: 
  - Dashboard metadata (name, export date, widget counts)
  - Widget inventory (name, type, category, icon, description)
- **Button State**: Disabled if no widgets

## Widget Rendering

### Widget Types Supported

#### KPI Widgets
- Display formatted values
- Show trends and subtitles
- Include icons
- Support tooltips
- Respect custom time periods

#### Chart Widgets
- Render full chart visualizations
- Support multiple chart types
- Include legends and tooltips
- Responsive sizing
- Real data from analytics service

#### Table Widgets
- Display formatted data tables
- Include headers
- Formatted values (currency, numbers, percentages)
- Responsive scrolling
- Last 6 months of data typically

### Data Fetching
- Widgets fetch data based on their category
- Uses analytics service methods:
  - getProgramMetrics()
  - getEngagementMetrics()
  - getPerformanceMetrics()
  - getFinancialMetrics()
- Respects widget-level or global time filters

### Loading States
- Individual widget loading indicators
- "Loading data..." message
- Error states per widget
- Graceful error handling

## User Workflow

### Creating a Dashboard
1. Navigate to Custom Dashboard tab
2. Browse or search widget library
3. Drag widgets onto workspace or click to add
4. Configure widgets (optional)
5. Reorder widgets as needed
6. Save dashboard with custom name

### Modifying a Dashboard
1. Load existing dashboard
2. Add/remove widgets
3. Reorder widgets
4. Configure widgets
5. Save changes

### Exporting a Dashboard
1. Create or load dashboard
2. Click Export button
3. CSV file downloads automatically

## Loading and Error States

### Loading State
- Widget library loads immediately
- Individual widgets show loading state while fetching data
- Dashboard workspace shows loading for initial render

### Error State
- Widget-level error messages if data fails to load
- Dashboard-level error if view fails to load
- Graceful degradation when data unavailable
## Data Structure

| Data Field | Definition | Calculation | Data Source |
|------------|------------|-------------|-------------|
| currentViewName | Name of the currently active dashboard view | User-entered name or default "My Custom Dashboard" | |
| currentViewId | Unique identifier for the currently loaded dashboard view | Generated on save: `dashboard-${timestamp}-${random}` or loaded from saved view | |
| widgets | Array of widget objects currently on the dashboard | Collection of widgets added to dashboard workspace | |
| widgets[].id | Unique identifier for widget instance | Generated as `${widgetCatalogId}-${timestamp}` when added | |
| widgets[].name | Display name of the widget | From widget catalog or custom title from configuration | |
| widgets[].category | Widget category classification | From widget catalog: 'Program Overview', 'Member Engagement', 'Program Performance', 'Financial Impact' | |
| widgets[].type | Widget type classification | From widget catalog: 'kpi', 'chart', or 'table' | |
| widgets[].icon | Icon identifier for widget display | From widget catalog (emoji or icon code) | |
| widgets[].description | Widget description text | From widget catalog | |
| widgets[].position | Widget position in grid layout | Object with x and y coordinates (currently sequential: {x: 0, y: index}) | |
| widgets[].position.x | X coordinate in grid | Currently always 0 | |
| widgets[].position.y | Y coordinate in grid | Index position in widgets array | |
| widgets[].size | Widget size in grid units | Object with width and height (currently {width: 1, height: 1}) | |
| widgets[].size.width | Width in grid units | Currently always 1 | |
| widgets[].size.height | Height in grid units | Currently always 1 | |
| widgets[].config | Widget configuration object | Optional object containing custom settings | |
| widgets[].config.title | Custom title override for widget | User-entered custom title or null | |
| widgets[].config.customTimePeriod | Custom time period for widget | Selected time period or null (null means use global filter) | |
| widgets[].config.showTrend | Whether to show trend indicator (KPI only) | Boolean, defaults to true for KPI widgets | |
| savedViews | Array of all saved dashboard view objects | Loaded from localStorage on component mount | |
| savedViews[].id | Unique identifier for saved view | Generated on save: `dashboard-${timestamp}-${random}` | |
| savedViews[].name | Name of the saved dashboard view | User-entered name | |
| savedViews[].widgets | Array of widgets in saved view | Copy of widgets array at time of save | |
| savedViews[].createdAt | ISO timestamp when view was created | Generated on first save: `new Date().toISOString()` | |
| savedViews[].updatedAt | ISO timestamp when view was last updated | Updated on each save: `new Date().toISOString()` | |
| widgetCatalog | Array of all available widgets from catalog | Static catalog definition with all widget metadata | |
| widgetCatalog[].id | Widget catalog identifier | Unique ID matching pattern: 'kpi-*', 'chart-*', 'table-*' | |
| widgetCatalog[].name | Widget display name | Human-readable widget name | |
| widgetCatalog[].category | Widget category | One of: 'Program Overview', 'Member Engagement', 'Program Performance', 'Financial Impact' | |
| widgetCatalog[].type | Widget type | One of: 'kpi', 'chart', 'table' | |
| widgetCatalog[].icon | Widget icon | Emoji or icon identifier | |
| widgetCatalog[].description | Widget description | Brief description of what the widget displays | |
| showWidgetLibrary | Boolean indicating if widget library panel is visible | User toggle or default true | |
| editingName | Boolean indicating if dashboard name is being edited | Toggles between display and edit mode | |
| tempViewName | Temporary name value during editing | User input during name editing | |
| draggedWidgetId | ID of widget being dragged from dashboard | Set during drag operation, null when not dragging | |
| dragOverWidgetId | ID of widget being hovered over during drag | Set during drag over operation, null when not hovering | |
| isDragging | Boolean indicating if any drag operation is in progress | True when dragging from library or reordering on dashboard | |
| showSaveAsModal | Boolean indicating if Save As modal is visible | Toggles modal display | |
| saveAsName | Name value for Save As operation | User input for new dashboard name | |
| saveMessage | Message object for save operation feedback | Object with type ('success' or 'error') and text, null when no message | |
| saveMessage.type | Type of save message | 'success' or 'error' | |
| saveMessage.text | Text content of save message | Message string to display to user | |
| configuringWidgetId | ID of widget currently being configured | Widget ID or null when no configuration modal open | |
| filters | Global filter object passed from parent Analytics component | Contains timePeriod and other filter values | |
| filters.timePeriod | Selected time period filter | One of: 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Year to Date (YTD)', 'All Time', 'Custom Range' | |
