// Dashboard View Service
// Handles saving and loading custom dashboard configurations

const STORAGE_KEY = 'analytics_custom_dashboards';

class DashboardViewService {
  constructor() {
    this.storageKey = STORAGE_KEY;
  }

  /**
   * Get all saved dashboard views
   * @returns {Array} Array of saved dashboard views
   */
  getAllViews() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return [];
      
      const views = JSON.parse(stored);
      return Array.isArray(views) ? views : [];
    } catch (error) {
      console.error('Error loading dashboard views:', error);
      return [];
    }
  }

  /**
   * Get a specific dashboard view by ID
   * @param {string} viewId - The ID of the view to retrieve
   * @returns {Object|null} The dashboard view or null if not found
   */
  getView(viewId) {
    const views = this.getAllViews();
    return views.find(view => view.id === viewId) || null;
  }

  /**
   * Save a dashboard view
   * @param {Object} viewData - The dashboard view data to save
   * @param {string} viewData.name - Name of the dashboard view
   * @param {Array} viewData.widgets - Array of widgets in the dashboard
   * @param {string} viewData.id - Optional ID, will be generated if not provided
   * @returns {Object} The saved view with generated ID if needed
   */
  saveView(viewData) {
    try {
      const views = this.getAllViews();
      const now = new Date().toISOString();
      
      let view = {
        ...viewData,
        updatedAt: now
      };

      // If no ID provided or view doesn't exist, create new
      if (!view.id || !views.find(v => v.id === view.id)) {
        view.id = view.id || `dashboard-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        view.createdAt = now;
        views.push(view);
      } else {
        // Update existing view
        const index = views.findIndex(v => v.id === view.id);
        if (index !== -1) {
          views[index] = { ...views[index], ...view };
        }
      }

      localStorage.setItem(this.storageKey, JSON.stringify(views));
      return view;
    } catch (error) {
      console.error('Error saving dashboard view:', error);
      throw error;
    }
  }

  /**
   * Delete a dashboard view
   * @param {string} viewId - The ID of the view to delete
   * @returns {boolean} True if deleted, false if not found
   */
  deleteView(viewId) {
    try {
      const views = this.getAllViews();
      const filtered = views.filter(view => view.id !== viewId);
      
      if (filtered.length === views.length) {
        return false; // View not found
      }

      localStorage.setItem(this.storageKey, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting dashboard view:', error);
      return false;
    }
  }

  /**
   * Update a dashboard view name
   * @param {string} viewId - The ID of the view to update
   * @param {string} newName - The new name for the view
   * @returns {boolean} True if updated, false if not found
   */
  updateViewName(viewId, newName) {
    try {
      const views = this.getAllViews();
      const view = views.find(v => v.id === viewId);
      
      if (!view) return false;

      view.name = newName;
      view.updatedAt = new Date().toISOString();
      
      localStorage.setItem(this.storageKey, JSON.stringify(views));
      return true;
    } catch (error) {
      console.error('Error updating dashboard view name:', error);
      return false;
    }
  }

  /**
   * Check if a view name already exists
   * @param {string} name - The name to check
   * @param {string} excludeViewId - Optional view ID to exclude from check (for rename)
   * @returns {boolean} True if name exists, false otherwise
   */
  viewNameExists(name, excludeViewId = null) {
    const views = this.getAllViews();
    return views.some(view => 
      view.name.toLowerCase() === name.toLowerCase().trim() &&
      (!excludeViewId || view.id !== excludeViewId)
    );
  }
}

export default new DashboardViewService();

