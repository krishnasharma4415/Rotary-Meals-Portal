import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
	Box,
	Container,
	Typography,
	TextField,
	Button,
	Paper,
	Grid,
	Link,
	InputAdornment,
	IconButton,
	Alert,
	CircularProgress,
	Divider,
} from "@mui/material";
import {
	Visibility,
	VisibilityOff,
	LockOutlined,
	EmailOutlined,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { loginUser } from "../services/api";

const LoginPage = ({ setUser }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const response = await loginUser(formData);
			localStorage.setItem("token", response.token);
			localStorage.setItem("user", JSON.stringify(response.user));
			setUser(response.user);
			toast.success("Logged in successfully!");

			// Redirect based on user role
			if (response.user.role === "admin") {
				navigate("/admin");
			} else {
				navigate("/dashboard");
			}
		} catch (error) {
			console.error("Login error:", error);
			setError(
				error.response?.data?.error || "Login failed. Please try again."
			);
			toast.error("Login failed. Please check your credentials.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container maxWidth="sm" sx={{ py: 8 }}>
			<Paper
				elevation={6}
				sx={{
					p: { xs: 3, md: 5 },
					borderRadius: 3,
					background: "linear-gradient(to bottom right, #ffffff, #f9f9f9)",
					boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
					position: "relative",
					overflow: "hidden",
					"&::before": {
						content: '""',
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "5px",
						background: "linear-gradient(90deg, #1976d2, #42a5f5, #81d4fa)",
					},
				}}
			>
				<Box
					sx={{
						mb: 4,
						textAlign: "center",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Box
						sx={{
							bgcolor: "primary.main",
							color: "white",
							width: 60,
							height: 60,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							borderRadius: "50%",
							mb: 2,
							boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
						}}
					>
						<LockOutlined fontSize="large" />
					</Box>
					<Typography
						variant="h4"
						component="h1"
						gutterBottom
						fontWeight={700}
						sx={{
							background: "linear-gradient(45deg, #1976d2, #42a5f5)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							letterSpacing: "0.5px",
						}}
					>
						Welcome Back
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ maxWidth: "80%", mx: "auto" }}
					>
						Sign in to access your account and book nutritious meals
					</Typography>
				</Box>

				{error && (
					<Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
						{error}
					</Alert>
				)}

				<Box component="form" onSubmit={handleSubmit}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={formData.email}
						onChange={handleChange}
						sx={{
							mb: 2.5,
							"& .MuiOutlinedInput-root": {
								borderRadius: 2,
								"&:hover fieldset": {
									borderColor: "primary.main",
								},
							},
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<EmailOutlined color="primary" />
								</InputAdornment>
							),
						}}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type={showPassword ? "text" : "password"}
						id="password"
						autoComplete="current-password"
						value={formData.password}
						onChange={handleChange}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockOutlined color="primary" />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={toggleShowPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
						sx={{
							mb: 4,
							"& .MuiOutlinedInput-root": {
								borderRadius: 2,
								"&:hover fieldset": {
									borderColor: "primary.main",
								},
							},
						}}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						size="large"
						disabled={loading}
						sx={{
							py: 1.5,
							fontSize: "1.1rem",
							borderRadius: "30px",
							boxShadow: "0 4px 10px rgba(25, 118, 210, 0.3)",
							transition: "all 0.3s",
							"&:hover": {
								boxShadow: "0 6px 15px rgba(25, 118, 210, 0.4)",
								transform: "translateY(-2px)",
							},
						}}
					>
						{loading ? (
							<CircularProgress size={24} color="inherit" />
						) : (
							"Sign In"
						)}
					</Button>

					<Divider sx={{ my: 3, opacity: 0.7 }}>OR</Divider>

					<Grid container spacing={2} sx={{ mt: 1 }}>
						<Grid item xs={12} textAlign="center">
							<Typography variant="body1" sx={{ mb: 0.5 }}>
								Don't have an account?
							</Typography>
							<Link
								component={RouterLink}
								to="/register"
								sx={{
									color: "secondary.main",
									fontWeight: 600,
									textDecoration: "none",
									transition: "all 0.2s",
									"&:hover": {
										textDecoration: "underline",
										color: "secondary.dark",
									},
								}}
							>
								Register now
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Container>
	);
};

export default LoginPage;
