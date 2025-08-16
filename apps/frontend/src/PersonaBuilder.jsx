import React, { useMemo, useState } from 'react';
import './App.css';

function PersonaBuilder() {
  const [personas, setPersonas] = useState([]);
  const [activePersonaId, setActivePersonaId] = useState(null);
  const [draft, setDraft] = useState({
    name: '',
    description: '',
    demographics: '',
    behaviors: '',
    goals: '',
    painPoints: '',
    dataSources: { yourData: true, ourData: true, industryData: true },
  });
  const [importPreview, setImportPreview] = useState(null);
  const [assignmentIndex, setAssignmentIndex] = useState({
    bookings: {},
    functions: {},
    rewards: {},
  });

  const activePersona = useMemo(
    () => personas.find(p => p.id === activePersonaId) || null,
    [personas, activePersonaId]
  );

  function resetDraft() {
    setDraft({
      name: '',
      description: '',
      demographics: '',
      behaviors: '',
      goals: '',
      painPoints: '',
      dataSources: { yourData: true, ourData: true, industryData: true },
    });
  }

  function handleSavePersona() {
    if (!draft.name.trim()) return;
    const now = new Date().toISOString();
    if (activePersona) {
      setPersonas(prev => prev.map(p => p.id === activePersona.id ? { ...p, ...draft, updatedAt: now } : p));
    } else {
      setPersonas(prev => prev.concat({ id: crypto.randomUUID(), createdAt: now, updatedAt: now, ...draft }));
    }
    resetDraft();
    setActivePersonaId(null);
  }

  function handleEditPersona(id) {
    const persona = personas.find(p => p.id === id);
    if (!persona) return;
    setActivePersonaId(id);
    setDraft({
      name: persona.name,
      description: persona.description,
      demographics: persona.demographics,
      behaviors: persona.behaviors,
      goals: persona.goals,
      painPoints: persona.painPoints,
      dataSources: persona.dataSources || { yourData: true, ourData: true, industryData: true },
    });
  }

  function handleDeletePersona(id) {
    setPersonas(prev => prev.filter(p => p.id !== id));
    if (activePersonaId === id) {
      resetDraft();
      setActivePersonaId(null);
    }
  }

  function handleImport(fileText) {
    try {
      const parsed = JSON.parse(fileText);
      const list = Array.isArray(parsed) ? parsed : [parsed];
      const normalized = list.map(p => ({
        id: p.id || crypto.randomUUID(),
        name: p.name || 'Untitled Persona',
        description: p.description || '',
        demographics: p.demographics || '',
        behaviors: p.behaviors || '',
        goals: p.goals || '',
        painPoints: p.painPoints || '',
        dataSources: p.dataSources || { yourData: true, ourData: true, industryData: true },
        createdAt: p.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      setImportPreview(normalized);
    } catch (e) {
      alert('Invalid JSON file');
    }
  }

  function commitImport() {
    if (Array.isArray(importPreview) && importPreview.length) {
      setPersonas(prev => {
        const existingByName = new Map(prev.map(p => [p.name, p]));
        const merged = [...prev];
        importPreview.forEach(p => {
          const existing = existingByName.get(p.name);
          if (existing) {
            const updated = { ...existing, ...p, id: existing.id, updatedAt: new Date().toISOString() };
            const idx = merged.findIndex(m => m.id === existing.id);
            merged[idx] = updated;
          } else {
            merged.push(p);
          }
        });
        return merged;
      });
      setImportPreview(null);
    }
  }

  function handleFileUpload(evt) {
    const file = evt.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => handleImport(String(reader.result || ''));
    reader.readAsText(file);
  }

  function aiSuggestPersonaImprovements(persona) {
    const suggestions = [
      'Consider narrowing demographics to top-performing age groups.',
      'Incorporate loyalty tier as a key behavioral segment.',
      'Add industry trend: increased interest in wellness lounges.',
    ];
    alert(`AI Suggestions for ${persona.name}:\n\n- ${suggestions.join('\n- ')}`);
  }

  function aiSuggestAssignmentOptimizations(persona) {
    const ideas = [
      'Increase assignment to Upsell Function A for premium travelers.',
      'Test cross-sell Function C for bookings with long layovers.',
      'Bundle Reward Package Silver+ for mid-tier spenders.',
    ];
    alert(`AI Assignment Ideas for ${persona.name}:\n\n- ${ideas.join('\n- ')}`);
  }

  return (
    <div className="persona-builder-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Persona Builder</h1>
        </div>
      </div>
      <div className="page-subtitle">
        <p>Build and manage personas using your data, our data, and industry data.</p>
      </div>

      <section className="analytics-section">
        <h2 className="section-title">Create / Edit Persona</h2>
        <div className="form-grid persona-form-grid">
          <label>
            <span>Name</span>
            <input className="form-input" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} placeholder="e.g., Frequent Business Traveler" />
          </label>
          <label>
            <span>Description</span>
            <textarea className="form-input" value={draft.description} onChange={e => setDraft({ ...draft, description: e.target.value })} placeholder="Short overview of this persona" />
          </label>
          <label>
            <span>Demographics</span>
            <textarea className="form-input" value={draft.demographics} onChange={e => setDraft({ ...draft, demographics: e.target.value })} placeholder="Age, location, income, etc." />
          </label>
          <label>
            <span>Behaviors</span>
            <textarea className="form-input" value={draft.behaviors} onChange={e => setDraft({ ...draft, behaviors: e.target.value })} placeholder="Booking patterns, channel preference, loyalty, etc." />
          </label>
          <label>
            <span>Goals</span>
            <textarea className="form-input" value={draft.goals} onChange={e => setDraft({ ...draft, goals: e.target.value })} placeholder="What this persona aims to achieve" />
          </label>
          <label>
            <span>Pain Points</span>
            <textarea className="form-input" value={draft.painPoints} onChange={e => setDraft({ ...draft, painPoints: e.target.value })} placeholder="Friction, objections, unmet needs" />
          </label>
          <fieldset className="inline-options persona-inline-options">
            <legend>Data Sources</legend>
            <label><input type="checkbox" checked={draft.dataSources.yourData} onChange={e => setDraft({ ...draft, dataSources: { ...draft.dataSources, yourData: e.target.checked } })} /> Your Data</label>
            <label><input type="checkbox" checked={draft.dataSources.ourData} onChange={e => setDraft({ ...draft, dataSources: { ...draft.dataSources, ourData: e.target.checked } })} /> Our Data</label>
            <label><input type="checkbox" checked={draft.dataSources.industryData} onChange={e => setDraft({ ...draft, dataSources: { ...draft.dataSources, industryData: e.target.checked } })} /> Industry Data</label>
          </fieldset>
        </div>
        <div className="actions">
          <button onClick={handleSavePersona} className="btn primary">{activePersona ? 'Save Changes' : 'Create Persona'}</button>
          {activePersona && <button onClick={() => { resetDraft(); setActivePersonaId(null); }} className="btn secondary">Cancel Edit</button>}
        </div>
      </section>

      <section className="analytics-section">
        <h2 className="section-title">Existing Personas</h2>
        {personas.length === 0 && <p className="page-subtitle" style={{ margin: 0 }}>No personas yet. Create one above or import.</p>}
        <div className="programs-grid">
          {personas.map(p => (
            <div key={p.id} className="program-card">
              <div className="program-header">
                <div className="program-info">
                  <h4>{p.name}</h4>
                  <p>{p.description || '—'}</p>
                </div>
                <div className="program-meta">
                  <span className="chip chip-outline">Updated {new Date(p.updatedAt).toLocaleString()}</span>
                </div>
              </div>
              <div className="program-details">
                <div className="detail-row"><span className="detail-label">Demographics:</span><span className="detail-value">{p.demographics || '—'}</span></div>
                <div className="detail-row"><span className="detail-label">Behaviors:</span><span className="detail-value">{p.behaviors || '—'}</span></div>
                <div className="detail-row"><span className="detail-label">Goals:</span><span className="detail-value">{p.goals || '—'}</span></div>
                <div className="detail-row"><span className="detail-label">Pain Points:</span><span className="detail-value">{p.painPoints || '—'}</span></div>
              </div>
              <div className="program-actions">
                <button onClick={() => handleEditPersona(p.id)} className="action-btn secondary">Edit</button>
                <button onClick={() => aiSuggestPersonaImprovements(p)} className="action-btn secondary">AI Improve</button>
                <button onClick={() => aiSuggestAssignmentOptimizations(p)} className="action-btn secondary">AI Assignments</button>
                <button onClick={() => handleDeletePersona(p.id)} className="action-btn secondary">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="analytics-section">
        <h2 className="section-title">Import Personas</h2>
        <p className="page-subtitle" style={{ margin: '0 0 12px 0' }}>Upload a JSON file containing a persona or an array of personas.</p>
        <input className="form-input" type="file" accept="application/json" onChange={handleFileUpload} />
        {Array.isArray(importPreview) && importPreview.length > 0 && (
          <div className="preview-box" style={{ marginTop: 16 }}>
            <div className="preview-title">Preview</div>
            <div className="preview-content">
              <div className="programs-grid">
                {importPreview.map(p => (
                  <div key={p.id} className="program-card">
                    <div className="program-header">
                      <div className="program-info">
                        <h4>{p.name}</h4>
                        <p>{p.description || '—'}</p>
                      </div>
                      <div className="program-meta">
                        <span className="chip chip-outline">Sources: {Object.entries(p.dataSources || {}).filter(([, v]) => !!v).map(([k]) => k).join(', ') || 'None'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer" style={{ padding: 0, borderTop: 'none', marginTop: 12 }}>
              <button onClick={commitImport} className="btn primary">Import</button>
              <button onClick={() => setImportPreview(null)} className="btn secondary">Cancel</button>
            </div>
          </div>
        )}
      </section>

      <section className="analytics-section">
        <h2 className="section-title">Assignment Tracking</h2>
        <p className="page-subtitle" style={{ margin: '0 0 12px 0' }}>Track where personas are assigned across Bookings, Upsell/Cross-sell functions, and Reward packages.</p>
        <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div>
            <h3>Bookings</h3>
            <p className="page-subtitle" style={{ margin: 0 }}>Coming soon: View bookings tagged with personas.</p>
          </div>
          <div>
            <h3>Upsell / Cross-sell Functions</h3>
            <p className="page-subtitle" style={{ margin: 0 }}>Coming soon: See which functions target each persona.</p>
          </div>
          <div>
            <h3>Reward Packages</h3>
            <p className="page-subtitle" style={{ margin: 0 }}>Coming soon: See reward packages linked to personas.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PersonaBuilder; 