import React, { useState } from 'react';
import revenueFunctionService from './firebase/revenueFunctionService.js';

const FirebaseQuickTest = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const testFirebase = async () => {
    setLoading(true);
    setStatus('Testing Firebase connection...');
    
    try {
      // Try to save a simple test function
      const testFunction = {
        title: 'Test Function',
        description: 'This is a test function',
        functionType: 'Upsell',
        objectives: ['revenue_uplift'],
        priority: 'Medium',
        tags: ['test'],
        status: 'draft',
        triggerEvents: ['test_event'],
        triggerConditions: [],
        triggerFrequency: 'once',
        eventSources: ['Test'],
        offerCategories: ['Test'],
        timingOption: 'immediately',
        timingValue: '',
        cooldownPeriod: '1',
        personaGroups: [],
        exclusions: { personas: [], loyaltyTiers: [], geo: [], cardTypes: [] },
        userLimits: { perUserPerDay: 1, perUserPerWeek: 1, maxTriggersPerProgram: 10 },
        offerSelection: ['test_offer'],
        offerFallback: { enabled: false, fallbackOffers: [] },
        offerVisibilityRules: { maxPrice: null, minInventory: null },
        channels: ['Email'],
        messageTemplate: { type: 'saved', templateId: null, content: 'Test message', language: 'English', tone: 'Professional', aiCopywriting: false },
        aiOptimization: { autoOptimization: false, suggestSegments: false },
        testMode: true,
        auditTrail: { createdBy: 'Test', createdAt: new Date().toISOString(), lastModifiedBy: 'Test', lastModifiedAt: new Date().toISOString() }
      };

      const functionId = await revenueFunctionService.saveRevenueFunction(testFunction, 'draft');
      setStatus(`✅ Firebase is working! Test function saved with ID: ${functionId}`);
      
      // Try to load it back
      const loadedFunction = await revenueFunctionService.getRevenueFunction(functionId);
      setStatus(prev => prev + `\n✅ Function loaded successfully: ${loadedFunction.title}`);
      
    } catch (error) {
      console.error('Firebase test error:', error);
      setStatus(`❌ Firebase error: ${error.message}`);
      
      if (error.message.includes('Firebase')) {
        setStatus(prev => prev + '\n\n💡 Make sure you have:');
        setStatus(prev => prev + '\n1. Created a Firebase project');
        setStatus(prev => prev + '\n2. Enabled Firestore Database');
        setStatus(prev => prev + '\n3. Updated the config.js with your credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #e5e7eb', 
      borderRadius: '8px', 
      margin: '20px',
      backgroundColor: '#f9fafb'
    }}>
      <h3>Firebase Quick Test</h3>
      <p>Click the button below to test if Firebase is working:</p>
      
      <button 
        onClick={testFirebase}
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#9ca3af' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '15px'
        }}
      >
        {loading ? 'Testing...' : 'Test Firebase Connection'}
      </button>
      
      {status && (
        <div style={{
          padding: '15px',
          backgroundColor: status.includes('❌') ? '#fef2f2' : '#f0fdf4',
          border: `1px solid ${status.includes('❌') ? '#fecaca' : '#bbf7d0'}`,
          borderRadius: '6px',
          whiteSpace: 'pre-line',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          {status}
        </div>
      )}
      
      <div style={{ marginTop: '15px', fontSize: '14px', color: '#6b7280' }}>
        <strong>To set up Firebase:</strong>
        <ol style={{ marginTop: '5px', paddingLeft: '20px' }}>
          <li>Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase Console</a></li>
          <li>Create a new project or select existing</li>
          <li>Enable Firestore Database</li>
          <li>Go to Project Settings → Your Apps → Add Web App</li>
          <li>Copy the config and update <code>src/firebase/config.js</code></li>
        </ol>
      </div>
    </div>
  );
};

export default FirebaseQuickTest; 