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
	Stepper,
	Step,
	StepLabel,
} from "@mui/material";
import {
	Visibility,
	VisibilityOff,
	PersonOutline,
	EmailOutlined,
	PhoneOutlined,
	LockOutlined,
	HowToRegOutlined,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { registerUser } from "../services/api";

const RegisterPage = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState({});

	const validateStep = (step) => {
		const newErrors = {};

		if (step === 0) {
			if (!formData.name) newErrors.name = "Name is required";
			if (!formData.email) newErrors.email = "Email is required";
			else if (!/\S+@\S+\.\S+/.test(formData.email))
				newErrors.email = "Email address is invalid";

			if (!formData.phone) newErrors.phone = "Phone number is required";
			else if (!/^\d{10}$/.test(formData.phone))
				newErrors.phone = "Phone number must be 10 digits";
		} else if (step === 1) {
			if (!formData.password) newErrors.password = "Password is required";
			else if (formData.password.length < 6)
				newErrors.password = "Password must be at least 6 characters";

			if (!formData.confirmPassword)
				newErrors.confirmPassword = "Confirm Password is required";
			else if (formData.confirmPassword !== formData.password)
				newErrors.confirmPassword = "Passwords do not match";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleNext = (e) => {
		e.preventDefault();

		if (validateStep(activeStep)) {
			setActiveStep((prevStep) => prevStep + 1);
		}
	};

	const handleBack = () => {
		setActiveStep((prevStep) => prevStep - 1);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateStep(activeStep)) return;

		setError("");
		setLoading(true);

		try {
			await registerUser(formData);
			toast.success("Registration successful! Please login.");
			navigate("/login");
		} catch (error) {
			console.error("Registration error:", error);
			setError(
				error.response?.data?.error || "Registration failed. Please try again."
			);
			toast.error("Registration failed. Please check your details.");
		} finally {
			setLoading(false);
		}
	};

	const steps = ["Personal Details", "Account Security"];

	const renderStepContent = (stepIndex) => {
		switch (stepIndex) {
			case 0:
				return (
					<>
						<TextField
							margin="normal"
							required
							fullWidth
							id="name"
							label="Full Name"
							name="name"
							autoComplete="name"
							autoFocus
							value={formData.name}
							onChange={handleChange}
							error={Boolean(errors.name)}
							helperText={errors.name}
							sx={{
								mb: 2,
								"& .MuiOutlinedInput-root": {
									borderRadius: 2,
								},
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<PersonOutline color="primary" />
									</InputAdornment>
								),
							}}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							value={formData.email}
							onChange={handleChange}
							error={Boolean(errors.email)}
							helperText={errors.email}
							sx={{
								mb: 2,
								"& .MuiOutlinedInput-root": {
									borderRadius: 2,
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
							id="phone"
							label="Phone Number"
							name="phone"
							autoComplete="tel"
							value={formData.phone}
							onChange={handleChange}
							error={Boolean(errors.phone)}
							helperText={errors.phone}
							sx={{
								mb: 3,
								"& .MuiOutlinedInput-root": {
									borderRadius: 2,
								},
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<PhoneOutlined color="primary" />
									</InputAdornment>
								),
							}}
						/>
					</>
				);
			case 1:
				return (
					<>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type={showPassword ? "text" : "password"}
							id="password"
							autoComplete="new-password"
							value={formData.password}
							onChange={handleChange}
							error={Boolean(errors.password)}
							helperText={errors.password}
							sx={{
								mb: 2,
								"& .MuiOutlinedInput-root": {
									borderRadius: 2,
								},
							}}
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
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="confirmPassword"
							label="Confirm Password"
							type={showPassword ? "text" : "password"}
							id="confirmPassword"
							autoComplete="new-password"
							value={formData.confirmPassword}
							onChange={handleChange}
							error={Boolean(errors.confirmPassword)}
							helperText={errors.confirmPassword}
							sx={{
								mb: 3,
								"& .MuiOutlinedInput-root": {
									borderRadius: 2,
								},
							}}
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
						/>
					</>
				);
			default:
				return "Unknown step";
		}
	};

	return (
		<Container maxWidth="md" sx={{ py: 8 }}>
			<Paper
				elevation={6}
				sx={{
					p: { xs: 3, md: 5 },
					borderRadius: 3,
					background: "linear-gradient(to bottom right, #ffffff, #f7f9fc)",
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
						background: "linear-gradient(90deg, #7b1fa2, #9c27b0, #ba68c8)",
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
							bgcolor: "secondary.main",
							color: "white",
							width: 60,
							height: 60,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							borderRadius: "50%",
							mb: 2,
							boxShadow: "0 4px 8px rgba(156, 39, 176, 0.3)",
						}}
					>
						<HowToRegOutlined fontSize="large" />
					</Box>
					<Typography
						variant="h4"
						component="h1"
						gutterBottom
						fontWeight={700}
						sx={{
							background: "linear-gradient(45deg, #7b1fa2, #ba68c8)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							letterSpacing: "0.5px",
						}}
					>
						Create Your Account
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ maxWidth: "80%", mx: "auto", mb: 3 }}
					>
						Join the Rotary Meals community to start enjoying nutritious meals
					</Typography>
				</Box>

				{error && (
					<Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
						{error}
					</Alert>
				)}

				<Stepper activeStep={activeStep} sx={{ mb: 4 }}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>

				<Box
					component="form"
					onSubmit={(e) => {
						e.preventDefault();
						if (activeStep === steps.length - 1) {
							handleSubmit(e);
						} else {
							handleNext(e);
						}
					}}
				>
					{renderStepContent(activeStep)}

					<Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
						<Button
							color="inherit"
							disabled={activeStep === 0 || loading}
							onClick={handleBack}
							sx={{ mr: 1 }}
						>
							Back
						</Button>
						<Box sx={{ flex: "1 1 auto" }} />
						<Button
							variant="contained"
							color="primary"
							type="submit"
							disabled={loading}
							sx={{
								px: 4,
								py: 1.2,
								borderRadius: "30px",
								boxShadow: "0 4px 10px rgba(156, 39, 176, 0.3)",
								transition: "all 0.3s",
								"&:hover": {
									boxShadow: "0 6px 15px rgba(156, 39, 176, 0.4)",
									transform: "translateY(-2px)",
								},
							}}
						>
							{loading ? (
								<CircularProgress size={24} color="inherit" />
							) : activeStep === steps.length - 1 ? (
								"Register"
							) : (
								"Next"
							)}
						</Button>
					</Box>

					<Divider sx={{ my: 4, opacity: 0.7 }}>OR</Divider>

					<Grid container justifyContent="center" spacing={2}>
						<Grid item textAlign="center">
							<Typography variant="body1" sx={{ mb: 0.5 }}>
								Already have an account?
							</Typography>
							<Link
								component={RouterLink}
								to="/login"
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
								Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Container>
	);
};

export default RegisterPage;
