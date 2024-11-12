// client/src/Services/EventService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';

export const getEvents = async () => {
  return await axios.get(API_URL);
};

export const createEvent = async (event) => {
  return await axios.post(API_URL, event);
};

export const updateEvent = async (id, event) => {
  return await axios.put(`${API_URL}/${id}`, event);
};

export const deleteEvent = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
