import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const memberService = {
  async getMentors(filter = {}) {
    try {
      const queryParams = new URLSearchParams(filter).toString();
      const response = await axios.get(`${API_BASE_URL}/mentors?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async getMentor(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/mentors/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async contactMentor(mentorId, message) {
    try {
      const response = await axios.post(`${API_BASE_URL}/mentors/${mentorId}/contact`, {
        message
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async getUserProfile(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async updateUserProfile(userId, profileData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${userId}`, profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async getUserPosts(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/posts`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async getUserActivities(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/activities`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};