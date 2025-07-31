# Component Creation Guide

## 🚨 CRITICAL: Prevent Blank Page Issues

### Required Structure for All New Components

Every new component MUST follow this exact structure to work properly:

```jsx
import React, { useState } from 'react';
import './App.css';

function YourComponentName() {
  // State management
  const [exampleState, setExampleState] = useState('');

  // Event handlers
  const handleExampleAction = () => {
    console.log('Example action triggered');
  };

  return (
    <div className="dashboard-grid">
      {/* Page Header Section */}
      <section className="dashboard-section">
        <div className="section-title">
          <h2>Page Title</h2>
          <p>Page description or subtitle</p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="dashboard-section">
        <div className="section-title">
          <h3>Section Title</h3>
        </div>
        
        {/* Content goes here */}
        <div className="content-container">
          <p>Your content here</p>
        </div>
      </section>
    </div>
  );
}

export default YourComponentName;
```

## 🔑 Key Requirements

### 1. **Root Container**
- MUST use `className="dashboard-grid"` as the root div
- This ensures proper layout and spacing

### 2. **Section Structure**
- Each major section MUST be wrapped in `<section className="dashboard-section">`
- This provides consistent spacing and styling

### 3. **Section Titles**
- Use `<div className="section-title">` for headers
- Contains `<h2>` for page titles, `<h3>` for section titles
- Can include description `<p>` tags

### 4. **CSS Import**
- MUST import `'./App.css'` for styling
- All existing styles are in this file

## 📋 Step-by-Step Process

### 1. Create Component File
```bash
# Create new component file
touch apps/frontend/src/YourComponent.jsx
```

### 2. Copy Template Structure
Use the `ComponentTemplate.jsx` as a starting point

### 3. Add to Routing
```jsx
// In App.jsx
import YourComponent from './YourComponent';

// Add route
<Route path="/your-route" element={<YourComponent />} />
```

### 4. Add to Sidebar
```jsx
// In Sidebar.jsx
{
  icon: '🔗',
  text: 'Your Component',
  path: '/your-route'
}
```

## 🎨 Branding Guidelines

### Colors (CSS Variables)
- Primary: `var(--brand-primary)` - Dark text
- Accent: `var(--brand-accent)` - Red accent (#dc2626)
- Muted: `var(--brand-muted)` - Light borders
- Background: `var(--brand-bg)` - Page background
- White: `var(--brand-white)` - Card backgrounds

### Typography
- Page titles: `<h2>` with `section-title` class
- Section titles: `<h3>` with `section-title` class
- Body text: `<p>` tags
- Use existing font weights and sizes

### Layout
- Use `dashboard-grid` for main container
- Use `dashboard-section` for sections
- Cards should use `var(--brand-white)` background
- Borders should use `var(--brand-muted)`

## 🚫 Common Mistakes to Avoid

1. **Don't create custom page containers** - Use `dashboard-grid`
2. **Don't skip section wrappers** - Always use `dashboard-section`
3. **Don't forget CSS import** - Always import `'./App.css'`
4. **Don't use custom padding/margins** - Use existing classes
5. **Don't create new color schemes** - Use existing CSS variables

## ✅ Checklist Before Creating New Component

- [ ] Use `dashboard-grid` as root container
- [ ] Wrap sections in `dashboard-section`
- [ ] Use `section-title` for headers
- [ ] Import `'./App.css'`
- [ ] Use existing CSS variables for colors
- [ ] Add to routing in `App.jsx`
- [ ] Add to sidebar navigation
- [ ] Test that page loads without blank screen

## 🔧 Troubleshooting

### Blank Page Issues
1. **Check browser console for errors** - Most common cause
2. **Verify route path matches sidebar link** - Critical! Route `/integrations` must match sidebar link `/integrations`
3. **Verify component is properly exported** - Check `export default ComponentName`
4. **Confirm route is correctly added** - Check `App.jsx` routing
5. **Ensure CSS import is present** - Must import `'./App.css'`
6. **Check that root container uses `dashboard-grid`** - Required for layout

### Common Routing Issues
- **Sidebar link mismatch**: If sidebar links to `/dashboard/component` but route is `/component`
- **Missing route**: Forgetting to add route in `App.jsx`
- **Wrong import path**: Incorrect import statement

### Styling Issues
1. Use existing CSS classes
2. Don't override existing styles
3. Use CSS variables for colors
4. Follow existing component patterns

## 📁 File Structure
```
apps/frontend/src/
├── App.jsx (add route)
├── Sidebar.jsx (add navigation)
├── YourComponent.jsx (new component)
└── App.css (existing styles)
```

## 🎯 Example: Working Component

See `Integrations.jsx` for a complete working example that follows all guidelines. 