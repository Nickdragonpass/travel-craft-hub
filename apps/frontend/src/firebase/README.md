# Firebase Integration for Revenue Optimizer

This directory contains the Firebase integration for storing and managing revenue functions, drafts, and templates.

## Setup Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Follow the setup wizard

### 2. Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development (you can add security rules later)
4. Select a location for your database

### 3. Get Firebase Configuration

1. In your Firebase project, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select "Web"
4. Register your app and copy the configuration object

### 4. Update Configuration

Replace the placeholder values in `config.js` with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

### 5. Install Dependencies

The Firebase SDK is already installed. If you need to reinstall:

```bash
npm install firebase
```

## Database Structure

### Collections

- **`revenue_functions`**: Stores all revenue functions (drafts and completed)
- **`drafts`**: Stores draft functions (alternative collection)
- **`templates`**: Stores reusable templates

### Document Structure

Each revenue function document contains:

```javascript
{
  // Basic Info
  title: string,
  description: string,
  functionType: string,
  objectives: string[],
  priority: string,
  tags: string[],
  status: 'draft' | 'completed',
  
  // Trigger Definition
  triggerEvents: string[],
  triggerConditions: string[],
  triggerFrequency: string,
  eventSources: string[],
  offerCategories: string[],
  timingOption: string,
  timingValue: string,
  cooldownPeriod: string,
  
  // Persona & Targeting
  personaGroups: string[],
  exclusions: {
    personas: string[],
    loyaltyTiers: string[],
    geo: string[],
    cardTypes: string[]
  },
  userLimits: {
    perUserPerDay: number,
    perUserPerWeek: number,
    maxTriggersPerProgram: number
  },
  
  // Offer/Action Definition
  offerSelection: string[],
  offerFallback: {
    enabled: boolean,
    fallbackOffers: string[]
  },
  offerVisibilityRules: {
    maxPrice: number | null,
    minInventory: number | null
  },
  
  // Communication Setup
  channels: string[],
  messageTemplate: {
    type: string,
    templateId: string | null,
    content: string,
    language: string,
    tone: string,
    aiCopywriting: boolean
  },
  
  // AI Support
  aiOptimization: {
    autoOptimization: boolean,
    suggestSegments: boolean
  },
  
  // Control & Auditing
  testMode: boolean,
  auditTrail: {
    createdBy: string,
    createdAt: timestamp,
    lastModifiedBy: string,
    lastModifiedAt: timestamp
  },
  
  // Firebase metadata
  createdAt: timestamp,
  updatedAt: timestamp,
  version: number
}
```

## Usage

### Basic Operations

```javascript
import revenueFunctionService from './firebase/revenueFunctionService.js';

// Save a new function
const functionId = await revenueFunctionService.saveRevenueFunction(functionData, 'draft');

// Update an existing function
await revenueFunctionService.updateRevenueFunction(functionId, updatedData, 'completed');

// Get all functions
const functions = await revenueFunctionService.getAllRevenueFunctions();

// Get draft functions
const drafts = await revenueFunctionService.getDraftFunctions();

// Get completed functions
const completed = await revenueFunctionService.getCompletedFunctions();

// Delete a function
await revenueFunctionService.deleteRevenueFunction(functionId);
```

### Populate Database with Sample Data

```javascript
import { populateDatabase } from './firebase/populateDatabase.js';

// Populate with sample data
await populateDatabase();
```

### Get Analytics

```javascript
const analytics = await revenueFunctionService.getAnalytics();
console.log(analytics);
// {
//   total: 15,
//   drafts: 8,
//   completed: 7,
//   byType: { 'Upsell': 10, 'Cross-sell': 5 },
//   byObjective: { 'revenue_uplift': 12, 'basket_size': 8 },
//   recentActivity: [...]
// }
```

## Security Rules (Recommended)

For production, add these Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Revenue functions collection
    match /revenue_functions/{document} {
      allow read, write: if request.auth != null;
    }
    
    // Templates collection
    match /templates/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Drafts collection
    match /drafts/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Error Handling

The service includes comprehensive error handling:

```javascript
try {
  const functionId = await revenueFunctionService.saveRevenueFunction(data);
  console.log('Function saved successfully:', functionId);
} catch (error) {
  console.error('Error saving function:', error);
  // Handle error appropriately
}
```

## Development Tips

1. **Test Mode**: Use Firebase's test mode during development
2. **Console Logging**: All operations are logged to the console for debugging
3. **Sample Data**: Use the populate script to add test data
4. **Offline Support**: Firebase provides offline support out of the box
5. **Real-time Updates**: Consider adding real-time listeners for live updates

## Troubleshooting

### Common Issues

1. **Configuration Error**: Ensure your Firebase config is correct
2. **Permission Denied**: Check Firestore security rules
3. **Network Issues**: Firebase handles offline/online transitions automatically
4. **Data Structure**: Ensure your data matches the expected schema

### Debug Mode

Enable debug logging by adding this to your main app:

```javascript
import { enableLogging } from 'firebase/firestore';
enableLogging(true);
```

## Next Steps

1. Set up Firebase Authentication for user management
2. Add real-time listeners for live updates
3. Implement data validation and sanitization
4. Add backup and recovery procedures
5. Set up monitoring and analytics 