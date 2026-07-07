import axios from "axios";

// Base URL comes from the client's .env file (VITE_API_URL). Falling back
// to localhost keeps things working out of the box in local development.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Submits the recruiter contact form.
 * @param {object} formData - matches the Mongoose Contact schema fields
 * @returns {Promise<object>} the created contact record from the API
 */
export const submitContact = async (formData) => {
  const response = await api.post("/contacts", formData);
  return response.data;
};

/**
 * Fetches all recruiter contact submissions - used by the admin dashboard.
 */
export const fetchContacts = async () => {
  const response = await api.get("/contacts");
  return response.data;
};

export default api;
