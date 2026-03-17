import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/query';

/**
 * Sends a natural language query to the BI dashboard API
 * @param {string} query - The natural language query from the user
 * @returns {Promise<Object>} - The API response containing chart data and insights
 */
export const sendQuery = async (query) => {
  try {
    const response = await axios.post(
      API_BASE_URL,
      { query },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 second timeout
      }
    );
    
    return response.data;
  } catch (error) {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data?.message || 'Server error occurred');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Unable to connect to server. Please check your connection.');
    } else {
      // Something else went wrong
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
};