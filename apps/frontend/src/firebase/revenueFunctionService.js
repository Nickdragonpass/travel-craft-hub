import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  getDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db, COLLECTIONS } from './config.js';

/**
 * Revenue Function Service
 * Handles all Firebase operations for revenue functions
 */
class RevenueFunctionService {
  
  constructor() {
    console.log('RevenueFunctionService initialized');
  }
  
  /**
   * Save a new revenue function (draft or completed)
   * @param {Object} functionData - The complete function data
   * @param {string} status - 'draft' or 'completed'
   * @returns {Promise<string>} Document ID
   */
  async saveRevenueFunction(functionData, status = 'draft') {
    try {
      const functionToSave = {
        ...functionData,
        status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        version: 1
      };

      const docRef = await addDoc(collection(db, COLLECTIONS.REVENUE_FUNCTIONS), functionToSave);
      console.log('Revenue function saved with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error saving revenue function:', error);
      
      // If Firebase is not configured, show a helpful message
      if (error.message.includes('Firebase not configured') || error.message.includes('Firebase initialization failed')) {
        throw new Error('Firebase is not configured. Please update the Firebase configuration in src/firebase/config.js');
      }
      
      throw error;
    }
  }

  /**
   * Update an existing revenue function
   * @param {string} functionId - The document ID
   * @param {Object} functionData - The updated function data
   * @param {string} status - 'draft' or 'completed'
   * @returns {Promise<void>}
   */
  async updateRevenueFunction(functionId, functionData, status = 'draft') {
    try {
      const functionToUpdate = {
        ...functionData,
        status,
        updatedAt: serverTimestamp()
      };

      const docRef = doc(db, COLLECTIONS.REVENUE_FUNCTIONS, functionId);
      await updateDoc(docRef, functionToUpdate);
      console.log('Revenue function updated:', functionId);
    } catch (error) {
      console.error('Error updating revenue function:', error);
      throw error;
    }
  }

  /**
   * Get a specific revenue function by ID
   * @param {string} functionId - The document ID
   * @returns {Promise<Object>} The function data
   */
  async getRevenueFunction(functionId) {
    try {
      const docRef = doc(db, COLLECTIONS.REVENUE_FUNCTIONS, functionId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        throw new Error('Revenue function not found');
      }
    } catch (error) {
      console.error('Error getting revenue function:', error);
      throw error;
    }
  }

  /**
   * Get all revenue functions with optional filtering
   * @param {Object} filters - Optional filters
   * @returns {Promise<Array>} Array of revenue functions
   */
  async getAllRevenueFunctions(filters = {}) {
    try {
      let q = collection(db, COLLECTIONS.REVENUE_FUNCTIONS);
      
      // Apply filters
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }
      
      if (filters.functionType) {
        q = query(q, where('functionType', '==', filters.functionType));
      }
      
      // Always order by creation date (newest first)
      q = query(q, orderBy('createdAt', 'desc'));
      
      const querySnapshot = await getDocs(q);
      const functions = [];
      
      querySnapshot.forEach((doc) => {
        functions.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return functions;
    } catch (error) {
      console.error('Error getting revenue functions:', error);
      throw error;
    }
  }

  /**
   * Get all draft functions
   * @returns {Promise<Array>} Array of draft functions
   */
  async getDraftFunctions() {
    return this.getAllRevenueFunctions({ status: 'draft' });
  }

  /**
   * Get all completed functions
   * @returns {Promise<Array>} Array of completed functions
   */
  async getCompletedFunctions() {
    return this.getAllRevenueFunctions({ status: 'completed' });
  }

  /**
   * Delete a revenue function
   * @param {string} functionId - The document ID
   * @returns {Promise<void>}
   */
  async deleteRevenueFunction(functionId) {
    try {
      const docRef = doc(db, COLLECTIONS.REVENUE_FUNCTIONS, functionId);
      await deleteDoc(docRef);
      console.log('Revenue function deleted:', functionId);
    } catch (error) {
      console.error('Error deleting revenue function:', error);
      throw error;
    }
  }

  /**
   * Save a template
   * @param {Object} templateData - The template data
   * @returns {Promise<string>} Document ID
   */
  async saveTemplate(templateData) {
    try {
      const templateToSave = {
        ...templateData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, COLLECTIONS.TEMPLATES), templateToSave);
      console.log('Template saved with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error saving template:', error);
      throw error;
    }
  }

  /**
   * Get all templates
   * @returns {Promise<Array>} Array of templates
   */
  async getAllTemplates() {
    try {
      const q = query(collection(db, COLLECTIONS.TEMPLATES), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const templates = [];
      
      querySnapshot.forEach((doc) => {
        templates.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return templates;
    } catch (error) {
      console.error('Error getting templates:', error);
      throw error;
    }
  }

  /**
   * Get analytics data for revenue functions
   * @returns {Promise<Object>} Analytics data
   */
  async getAnalytics() {
    try {
      const allFunctions = await this.getAllRevenueFunctions();
      
      const analytics = {
        total: allFunctions.length,
        drafts: allFunctions.filter(f => f.status === 'draft').length,
        completed: allFunctions.filter(f => f.status === 'completed').length,
        byType: {},
        byObjective: {},
        recentActivity: allFunctions.slice(0, 10) // Last 10 functions
      };

      // Group by function type
      allFunctions.forEach(func => {
        const type = func.functionType || 'Unknown';
        analytics.byType[type] = (analytics.byType[type] || 0) + 1;
      });

      // Group by objectives
      allFunctions.forEach(func => {
        if (func.objectives && Array.isArray(func.objectives)) {
          func.objectives.forEach(objective => {
            analytics.byObjective[objective] = (analytics.byObjective[objective] || 0) + 1;
          });
        }
      });

      return analytics;
    } catch (error) {
      console.error('Error getting analytics:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const revenueFunctionService = new RevenueFunctionService();
export default revenueFunctionService; 