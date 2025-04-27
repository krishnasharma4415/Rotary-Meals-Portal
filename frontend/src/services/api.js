import axios from "axios";

const API_URL = "http://localhost:5500/api";

// Create axios instance
const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add a request interceptor for JWT authentication
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Authentication APIs
export const registerUser = async (userData) => {
	try {
		const response = await api.post("/auth/register", userData);
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const loginUser = async (credentials) => {
	console.log("Attempting login with credentials:", credentials);
	try {
		console.log("Sending request to:", `${API_URL}/auth/login`);
		const response = await api.post("/auth/login", credentials);
		console.log("Login response received:", response.data);
		// Store token and user data in localStorage
		localStorage.setItem("token", response.data.token);
		localStorage.setItem("user", JSON.stringify(response.data.user));
		return response.data;
	} catch (error) {
		console.error("Login error details:", error);
		console.error("Response data:", error.response?.data);
		console.error("Status code:", error.response?.status);
		throw error.response?.data || error;
	}
};

// Meal APIs
export const bookMeal = async (mealData) => {
	try {
		const response = await api.post("/meals", mealData);
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const getUserMeals = async () => {
	try {
		const response = await api.get("/meals/user");
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const getAllMeals = async () => {
	try {
		const response = await api.get("/meals");
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const processPayment = async (mealId) => {
	try {
		const response = await api.post(`/payments/${mealId}`);
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const updateMealStatus = async (mealId, status) => {
	try {
		const response = await api.patch(`/meals/${mealId}/status`, { status });
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

// User APIs
export const getUserProfile = async () => {
	try {
		const response = await api.get("/users/profile");
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const updateUserProfile = async (userData) => {
	try {
		const response = await api.put("/users/profile", userData);
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

// Admin APIs
export const getDashboardStats = async () => {
	try {
		const response = await api.get("/admin/stats");
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const getAllUsers = async () => {
	try {
		const response = await api.get("/admin/users");
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export default api;
