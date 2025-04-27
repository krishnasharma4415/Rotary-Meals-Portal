import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BookMealPage from "./pages/BookMealPage";
import PaymentPage from "./pages/PaymentPage";

// Styles
import "./App.css";

// Create a theme with Rotary Club colors
const theme = createTheme({
	palette: {
		primary: {
			main: "#0C3C60", // Rotary blue
			light: "#4e7aa9",
			dark: "#00113a",
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#F7A81B", // Rotary gold
			light: "#ffda4e",
			dark: "#bf7900",
			contrastText: "#000000",
		},
	},
	typography: {
		fontFamily: [
			"Roboto",
			"-apple-system",
			"BlinkMacSystemFont",
			"Segoe UI",
			"Helvetica",
			"Arial",
			"sans-serif",
		].join(","),
		h1: {
			fontWeight: 700,
		},
		h2: {
			fontWeight: 600,
		},
		h3: {
			fontWeight: 600,
		},
		button: {
			textTransform: "none",
			fontWeight: 500,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					overflow: "hidden",
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
				},
			},
		},
	},
});

// Protected Route component
const ProtectedRoute = ({ children, requiredRole = null }) => {
	const user = JSON.parse(localStorage.getItem("user") || "null");

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	// If a specific role is required, check if the user has it
	if (requiredRole && user.role !== requiredRole) {
		return <Navigate to="/" replace />;
	}

	return children;
};

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		// Check if user is logged in
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<div className="app">
					<Navbar user={user} onLogout={handleLogout} />
					<main className="main-content">
						<Routes>
							<Route path="/" element={<LandingPage />} />
							<Route path="/login" element={<LoginPage setUser={setUser} />} />
							<Route path="/register" element={<RegisterPage />} />

							{/* Protected routes */}
							<Route
								path="/dashboard"
								element={
									<ProtectedRoute>
										<UserDashboard />
									</ProtectedRoute>
								}
							/>

							<Route
								path="/admin"
								element={
									<ProtectedRoute requiredRole="admin">
										<AdminDashboard />
									</ProtectedRoute>
								}
							/>

							<Route
								path="/book-meal"
								element={
									<ProtectedRoute>
										<BookMealPage />
									</ProtectedRoute>
								}
							/>

							<Route
								path="/payment/:mealId"
								element={
									<ProtectedRoute>
										<PaymentPage />
									</ProtectedRoute>
								}
							/>

							{/* Fallback route */}
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
					</main>
					<Footer />
				</div>
			</Router>

			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</ThemeProvider>
	);
}

export default App;
