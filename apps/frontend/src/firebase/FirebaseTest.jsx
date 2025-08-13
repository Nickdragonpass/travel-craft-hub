import React, { useState } from 'react';
import { populateDatabase, clearDatabase } from './populateDatabase.js';
import revenueFunctionService from './revenueFunctionService.js';

/**
 * Firebase Test Component
 * This component helps test the Firebase integration
 * You can temporarily add this to your app to test the database
 */
const FirebaseTest = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [functions, setFunctions] = useState([]);
  const [templates, setTemplates] = useState([]);

  const handlePopulateDatabase = async () => {
    setLoading(true);
    setMessage('Populating database...');
    
    try {
      await populateDatabase();
      setMessage('Database populated successfully! Check the console for details.');
    } catch (error) {
      setMessage(`Error populating database: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClearDatabase = async () => {
    if (!window.confirm('Are you sure you want to clear all data? This cannot be undone!')) {
      return;
    }
    
    setLoading(true);
    setMessage('Clearing database...');
    
    try {
      await clearDatabase();
      setMessage('Database cleared successfully!');
    } catch (error) {
      setMessage(`Error clearing database: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadData = async () => {
    setLoading(true);
    setMessage('Loading data...');
    
    try {
      const [functionsData, templatesData] = await Promise.all([
        revenueFunctionService.getAllRevenueFunctions(),
        revenueFunctionService.getAllTemplates()
      ]);
      
      setFunctions(functionsData);
      setTemplates(templatesData);
      setMessage(`Loaded ${functionsData.length} functions and ${templatesData.length} templates`);
    } catch (error) {
      setMessage(`Error loading data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAnalytics = async () => {
    setLoading(true);
    setMessage('Getting analytics...');
    
    try {
      const analytics = await revenueFunctionService.getAnalytics();
      console.log('Analytics:', analytics);
      setMessage(`Analytics loaded! Check console for details. Total: ${analytics.total} functions`);
    } catch (error) {
      setMessage(`Error getting analytics: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>Firebase Integration Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <p style={{ color: '#666' }}>
          Use these buttons to test the Firebase integration. Make sure you've updated the Firebase configuration first.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button 
          onClick={handlePopulateDatabase}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Loading...' : 'Populate Database'}
        </button>

        <button 
          onClick={handleLoadData}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Loading...' : 'Load Data'}
        </button>

        <button 
          onClick={handleGetAnalytics}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Loading...' : 'Get Analytics'}
        </button>

        <button 
          onClick={handleClearDatabase}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Loading...' : 'Clear Database'}
        </button>
      </div>

      {message && (
        <div style={{
          padding: '15px',
          backgroundColor: message.includes('Error') ? '#fef2f2' : '#f0fdf4',
          border: `1px solid ${message.includes('Error') ? '#fecaca' : '#bbf7d0'}`,
          borderRadius: '6px',
          marginBottom: '20px',
          color: message.includes('Error') ? '#dc2626' : '#059669'
        }}>
          {message}
        </div>
      )}

      {functions.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Revenue Functions ({functions.length})</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '10px' }}>
            {functions.map(func => (
              <div key={func.id} style={{ 
                padding: '10px', 
                borderBottom: '1px solid #f3f4f6',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <strong>{func.title}</strong>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    {func.functionType} • {func.status}
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#999' }}>
                  ID: {func.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {templates.length > 0 && (
        <div>
          <h3>Templates ({templates.length})</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '10px' }}>
            {templates.map(template => (
              <div key={template.id} style={{ 
                padding: '10px', 
                borderBottom: '1px solid #f3f4f6',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <strong>{template.title}</strong>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    {template.type} • {template.status}
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#999' }}>
                  ID: {template.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <h4>Next Steps:</h4>
        <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Update Firebase configuration in <code>config.js</code></li>
          <li>Click "Populate Database" to add sample data</li>
          <li>Test the Revenue Optimizer to see Firebase integration</li>
          <li>Remove this test component when ready for production</li>
        </ol>
      </div>
    </div>
  );
};

export default FirebaseTest; 