import React, { useState } from 'react';
import './App.css';

function Integrations() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Integration categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'crm', name: 'CRM' },
    { id: 'marketing', name: 'Marketing & Comms' },
    { id: 'messaging', name: 'Messaging' },
    { id: 'database', name: 'Database' },
    { id: 'payment', name: 'Payment' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'collaboration', name: 'Collaboration' },
    { id: 'ai', name: 'AI & Machine Learning' },
    { id: 'operations', name: 'Operations' },
    { id: 'security', name: 'Security' }
  ];

  // Comprehensive integration library
  const integrations = [
    // CRM Integrations
    {
      id: 'hubspot',
      company: 'HubSpot',
      product: 'CRM',
      description: 'All-in-one CRM platform for marketing, sales, and customer service',
      category: 'crm',
      logo: '🟠',
      status: 'available'
    },
    {
      id: 'salesforce',
      company: 'Salesforce',
      product: 'CRM',
      description: 'Leading customer relationship management platform',
      category: 'crm',
      logo: '🔵',
      status: 'available'
    },
    {
      id: 'pipedrive',
      company: 'Pipedrive',
      product: 'CRM',
      description: 'Sales-focused CRM designed for growing teams',
      category: 'crm',
      logo: '🔴',
      status: 'available'
    },
    {
      id: 'zoho',
      company: 'Zoho',
      product: 'CRM',
      description: 'Comprehensive CRM suite for businesses of all sizes',
      category: 'crm',
      logo: '🟣',
      status: 'available'
    },
    {
      id: 'freshworks',
      company: 'Freshworks',
      product: 'CRM',
      description: 'Modern CRM platform with AI-powered insights',
      category: 'crm',
      logo: '🟢',
      status: 'available'
    },

    // Marketing & Comms Integrations
    {
      id: 'twilio',
      company: 'Twilio',
      product: 'Communications API',
      description: 'Cloud communications platform for SMS, voice, and video',
      category: 'marketing',
      logo: '🔴',
      status: 'available'
    },
    {
      id: 'messagebird',
      company: 'MessageBird',
      product: 'Omnichannel Platform',
      description: 'Global messaging platform for SMS, WhatsApp, and more',
      category: 'marketing',
      logo: '🟡',
      status: 'available'
    },
    {
      id: 'mailchimp',
      company: 'Mailchimp',
      product: 'Email Marketing',
      description: 'All-in-one marketing platform for email campaigns',
      category: 'marketing',
      logo: '🟠',
      status: 'available'
    },
    {
      id: 'sendgrid',
      company: 'SendGrid',
      product: 'Email API',
      description: 'Email delivery service for transactional and marketing emails',
      category: 'marketing',
      logo: '🔵',
      status: 'available'
    },
    {
      id: 'klaviyo',
      company: 'Klaviyo',
      product: 'Email Marketing',
      description: 'E-commerce focused email marketing and SMS platform',
      category: 'marketing',
      logo: '🟣',
      status: 'available'
    },
    {
      id: 'intercom',
      company: 'Intercom',
      product: 'Customer Messaging',
      description: 'Customer messaging platform for support and engagement',
      category: 'marketing',
      logo: '🟢',
      status: 'available'
    },
    {
      id: 'drift',
      company: 'Drift',
      product: 'Conversational Marketing',
      description: 'Conversational marketing and sales platform',
      category: 'marketing',
      logo: '🔵',
      status: 'available'
    },

    // Messaging Integrations
    {
      id: 'slack',
      company: 'Slack',
      product: 'Team Collaboration',
      description: 'Team communication platform for modern workplaces',
      category: 'messaging',
      logo: '🟣',
      status: 'available'
    },
    {
      id: 'microsoft-teams',
      company: 'Microsoft',
      product: 'Teams',
      description: 'Collaboration platform for chat, meetings, and file sharing',
      category: 'messaging',
      logo: '🔵',
      status: 'available'
    },
    {
      id: 'discord',
      company: 'Discord',
      product: 'Communication',
      description: 'Voice, video, and text communication platform',
      category: 'messaging',
      logo: '🟣',
      status: 'available'
    },
    {
      id: 'telegram',
      company: 'Telegram',
      product: 'Messaging',
      description: 'Secure messaging app with bot API capabilities',
      category: 'messaging',
      logo: '🔵',
      status: 'available'
    },
    {
      id: 'whatsapp-business',
      company: 'WhatsApp',
      product: 'Business API',
      description: 'Business messaging platform for customer engagement',
      category: 'messaging',
      logo: '🟢',
      status: 'available'
    },

    // Database Integrations
    {
      id: 'mongodb',
      company: 'MongoDB',
      product: 'Database',
      description: 'NoSQL document database for modern applications',
      category: 'database',
      logo: '🟢',
      status: 'available'
    },
    {
      id: 'postgresql',
      company: 'PostgreSQL',
      product: 'Database',
      description: 'Advanced open-source relational database',
      category: 'database',
      logo: '🔵',
      status: 'available'
    },
    {
      id: 'mysql',
      company: 'MySQL',
      product: 'Database',
      description: 'Popular open-source relational database management system',
      category: 'database',
      logo: '🟠',
      status: 'available'
    },
    {
      id: 'redis',
      company: 'Redis',
      product: 'Cache & Database',
      description: 'In-memory data structure store for caching and messaging',
      category: 'database',
      logo: '🔴',
      status: 'available'
    },
    {
      id: 'firebase',
      company: 'Firebase',
      product: 'Database',
      description: 'Google\'s mobile and web app development platform',
      category: 'database',
      logo: '🟠',
      status: 'available'
    },
    {
      id: 'supabase',
      company: 'Supabase',
      product: 'Database',
      description: 'Open source Firebase alternative with PostgreSQL',
      category: 'database',
      logo: '🟢',
      status: 'available'
    },

    // Payment Integrations
    {
      id: 'stripe',
      company: 'Stripe',
      product: 'Payment Processing',
      description: 'Online payment processing platform for businesses',
      category: 'payment',
      logo: '🟣',
      status: 'available'
    },
    {
      id: 'paypal',
      company: 'PayPal',
      product: 'Payment Gateway',
      description: 'Global payment platform for online transactions',
      category: 'payment',
      logo: '🔵',
      status: 'available'
    },
    {
      id: 'square',
      company: 'Square',
      product: 'Payment Solutions',
      description: 'Payment and point-of-sale solutions for businesses',
      category: 'payment',
      logo: '⚫',
      status: 'available'
    },
    {
      id: 'adyen',
      company: 'Adyen',
      product: 'Payment Platform',
      description: 'Global payment platform for enterprise businesses',
      category: 'payment',
      logo: '🟠',
      status: 'available'
    },
    {
      id: 'braintree',
      company: 'Braintree',
      product: 'Payment Gateway',
      description: 'Payment gateway for mobile and web applications',
      category: 'payment',
      logo: '🔵',
      status: 'available'
    },
    {
      id: 'worldpay',
      company: 'Worldpay',
      product: 'Payment Processing',
      description: 'Global payment technology and processing solutions',
      category: 'payment',
      logo: '🔴',
      status: 'available'
    },

    // Analytics & Reporting Integrations
    {
      id: 'google-analytics',
      company: 'Google',
      product: 'Analytics',
      description: 'Web analytics service for tracking website traffic',
      category: 'analytics',
      logo: '🔵',
      status: 'available'
    },
    {
      id: 'mixpanel',
      company: 'Mixpanel',
      product: 'Product Analytics',
      description: 'Product analytics platform for user behavior tracking',
      category: 'analytics',
      logo: '🟣',
      status: 'available'
    },
    {
      id: 'amplitude',
      company: 'Amplitude',
      product: 'Product Analytics',
      description: 'Product analytics platform for digital products',
      category: 'analytics',
      logo: '🟠',
      status: 'available'
    },
    {
      id: 'tableau',
      company: 'Tableau',
      product: 'Data Visualization',
      description: 'Business intelligence and data visualization platform',
      category: 'analytics',
      logo: '🟠',
      status: 'available'
    },
    {
      id: 'looker',
      company: 'Looker',
      product: 'Business Intelligence',
      description: 'Data platform for business intelligence and analytics',
      category: 'analytics',
      logo: '🟢',
      status: 'available'
    },
    {
      id: 'segment',
      company: 'Segment',
      product: 'Customer Data Platform',
      description: 'Customer data platform for collecting and routing data',
      category: 'analytics',
      logo: '🟣',
      status: 'available'
    },
    {
      id: 'hotjar',
      company: 'Hotjar',
      product: 'User Behavior Analytics',
      description: 'Website heatmaps and user behavior analytics',
      category: 'analytics',
      logo: '🟠',
      status: 'available'
    },
    {
      id: 'fullstory',
      company: 'FullStory',
      product: 'Digital Experience Intelligence',
      description: 'Digital experience intelligence platform for user insights',
      category: 'analytics',
      logo: '🔵',
      status: 'available'
    },

    // Productivity Integrations
    {
      id: 'notion',
      company: 'Notion',
      product: 'Workspace',
      description: 'All-in-one workspace for notes, docs, and collaboration',
      category: 'productivity',
      logo: '⚫',
      status: 'available'
    },
    {
      id: 'asana',
      company: 'Asana',
      product: 'Project Management',
      description: 'Work management platform for teams',
      category: 'productivity',
      logo: '🟠',
      status: 'available'
    },
    {
      id: 'trello',
      company: 'Trello',
      product: 'Task Management',
      description: 'Visual collaboration tool for organizing projects',
      category: 'productivity',
      logo: '🔵',
      status: 'available'
    },
    {
      id: 'monday',
      company: 'Monday.com',
      product: 'Work OS',
      description: 'Work operating system for teams and organizations',
      category: 'productivity',
      logo: '🟠',
      status: 'available'
    },

    // AI & Machine Learning
    {
      id: 'openai',
      company: 'OpenAI',
      product: 'AI Platform',
      description: 'Advanced AI models and APIs for developers',
      category: 'ai',
      logo: '🟢',
      status: 'available'
    },
    {
      id: 'anthropic',
      company: 'Anthropic',
      product: 'Claude AI',
      description: 'AI assistant for complex reasoning and analysis',
      category: 'ai',
      logo: '🟣',
      status: 'available'
    },
    {
      id: 'google-ai',
      company: 'Google',
      product: 'Gemini AI',
      description: 'Multimodal AI model for text and image understanding',
      category: 'ai',
      logo: '🔵',
      status: 'available'
    }
  ];

  // Filter integrations based on category and search
  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    const matchesSearch = integration.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddIntegration = (integration) => {
    // Mock function - would handle actual integration setup
    console.log(`Adding integration: ${integration.company} ${integration.product}`);
    alert(`${integration.company} ${integration.product} integration setup initiated!`);
  };

  return (
    <div className="integrations-page">
      {/* Page Header */}
      <div className="integrations-header">
        <h1 className="integrations-title">Integrations</h1>
        <p className="integrations-subtitle">Connect your favorite tools and platforms to streamline your workflow</p>
      </div>

      <div className="integrations-layout">
        {/* Left Sidebar - Categories */}
        <div className="integrations-sidebar">
          <h3 className="sidebar-title">CATEGORIES</h3>
          <div className="category-list">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="integrations-main">
          {/* Search Bar */}
          <div className="search-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search for any app..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Results Summary */}
          <div className="results-summary">
            <span className="results-count">
              {filteredIntegrations.length} integration{filteredIntegrations.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {/* Integrations Grid */}
          <div className="integrations-grid">
            {filteredIntegrations.map(integration => (
              <div key={integration.id} className="integration-tile" onClick={() => handleAddIntegration(integration)}>
                <div className="tile-logo">
                  <span className="logo-icon">{integration.logo}</span>
                </div>
                <div className="tile-content">
                  <h3 className="tile-title">{integration.company}</h3>
                  <p className="tile-subtitle">{integration.product}</p>
                  <p className="tile-description">{integration.description}</p>
                </div>
                <div className="tile-action">
                  <button className="add-btn">Add</button>
                </div>
              </div>
            ))}
          </div>

          {filteredIntegrations.length === 0 && (
            <div className="no-results">
              <p>No integrations found matching your criteria.</p>
              <button 
                className="clear-filters-btn"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Integrations; 