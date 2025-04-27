import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
	Box,
	Container,
	Typography,
	Paper,
	Grid,
	Button,
	Stepper,
	Step,
	StepLabel,
	Card,
	CardContent,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Divider,
	CircularProgress,
	Alert,
} from "@mui/material";
import { toast } from "react-toastify";
import { processPayment } from "../services/api";

const PaymentPage = () => {
	const { mealId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const [activeStep, setActiveStep] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// Payment form data
	const [paymentData, setPaymentData] = useState({
		cardNumber: "",
		cardName: "",
		expMonth: "",
		expYear: "",
		cvv: "",
		paymentMethod: "card",
	});

	// Get data from location state
	const totalAmount = location.state?.totalAmount || 0;
	const mealDetails = location.state?.mealDetails || {};

	useEffect(() => {
		if (!location.state || !mealId) {
			// If no state is passed, redirect to book meal page
			navigate("/book-meal");
			toast.error("Please book your meal first.");
		}
	}, [location.state, mealId, navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPaymentData({ ...paymentData, [name]: value });
	};

	const handleNext = () => {
		setActiveStep((prevStep) => prevStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevStep) => prevStep - 1);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await processPayment(mealId);
			toast.success("Payment successful! Your meals have been booked.");
			navigate("/dashboard");
		} catch (error) {
			console.error("Payment error:", error);
			setError(
				error.response?.data?.error || "Payment failed. Please try again."
			);
			toast.error("Payment failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const steps = ["Review Order", "Payment Method", "Confirmation"];

	const getYears = () => {
		const currentYear = new Date().getFullYear();
		const years = [];
		for (let i = 0; i < 10; i++) {
			years.push(currentYear + i);
		}
		return years;
	};

	const getMonths = () => {
		return Array.from({ length: 12 }, (_, i) => i + 1);
	};

	const renderStepContent = (stepIndex) => {
		switch (stepIndex) {
			case 0:
				return (
					<Box>
						<Typography variant="h6" gutterBottom>
							Meal Booking Details
						</Typography>

						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Typography>Meals per day:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography fontWeight={500}>
									{mealDetails.mealsPerDay}
								</Typography>
							</Grid>

							<Grid item xs={6}>
								<Typography>Number of members:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography fontWeight={500}>
									{mealDetails.numberOfMembers}
								</Typography>
							</Grid>

							<Grid item xs={6}>
								<Typography>Duration:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography fontWeight={500}>
									{mealDetails.totalDays} days
								</Typography>
							</Grid>

							<Grid item xs={6}>
								<Typography>Start date:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography fontWeight={500}>
									{new Date(mealDetails.startDate).toLocaleDateString()}
								</Typography>
							</Grid>

							<Grid item xs={6}>
								<Typography>Total amount:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography fontWeight={700} color="primary">
									₹{totalAmount}
								</Typography>
							</Grid>
						</Grid>
					</Box>
				);

			case 1:
				return (
					<Box>
						<FormControl fullWidth sx={{ mb: 3 }}>
							<InputLabel id="payment-method-label">Payment Method</InputLabel>
							<Select
								labelId="payment-method-label"
								id="paymentMethod"
								name="paymentMethod"
								value={paymentData.paymentMethod}
								label="Payment Method"
								onChange={handleChange}
							>
								<MenuItem value="card">Credit/Debit Card</MenuItem>
								<MenuItem value="upi">UPI</MenuItem>
								<MenuItem value="netbanking">Net Banking</MenuItem>
							</Select>
						</FormControl>

						{paymentData.paymentMethod === "card" && (
							<Box>
								<TextField
									fullWidth
									margin="normal"
									id="cardNumber"
									name="cardNumber"
									label="Card Number"
									placeholder="XXXX XXXX XXXX XXXX"
									value={paymentData.cardNumber}
									onChange={handleChange}
								/>

								<TextField
									fullWidth
									margin="normal"
									id="cardName"
									name="cardName"
									label="Cardholder Name"
									value={paymentData.cardName}
									onChange={handleChange}
								/>

								<Grid container spacing={2} sx={{ mt: 1 }}>
									<Grid item xs={4}>
										<FormControl fullWidth>
											<InputLabel id="exp-month-label">Month</InputLabel>
											<Select
												labelId="exp-month-label"
												id="expMonth"
												name="expMonth"
												value={paymentData.expMonth}
												label="Month"
												onChange={handleChange}
											>
												{getMonths().map((month) => (
													<MenuItem key={month} value={month}>
														{month.toString().padStart(2, "0")}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>

									<Grid item xs={4}>
										<FormControl fullWidth>
											<InputLabel id="exp-year-label">Year</InputLabel>
											<Select
												labelId="exp-year-label"
												id="expYear"
												name="expYear"
												value={paymentData.expYear}
												label="Year"
												onChange={handleChange}
											>
												{getYears().map((year) => (
													<MenuItem key={year} value={year}>
														{year}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>

									<Grid item xs={4}>
										<TextField
											fullWidth
											id="cvv"
											name="cvv"
											label="CVV"
											type="password"
											value={paymentData.cvv}
											onChange={handleChange}
											inputProps={{ maxLength: 4 }}
										/>
									</Grid>
								</Grid>
							</Box>
						)}

						{paymentData.paymentMethod === "upi" && (
							<Box sx={{ mt: 2 }}>
								<TextField
									fullWidth
									margin="normal"
									id="upiId"
									name="upiId"
									label="UPI ID"
									placeholder="username@bank"
									onChange={handleChange}
								/>
							</Box>
						)}

						{paymentData.paymentMethod === "netbanking" && (
							<Box sx={{ mt: 2 }}>
								<FormControl fullWidth>
									<InputLabel>Select Bank</InputLabel>
									<Select
										label="Select Bank"
										name="bank"
										onChange={handleChange}
									>
										<MenuItem value="sbi">State Bank of India</MenuItem>
										<MenuItem value="hdfc">HDFC Bank</MenuItem>
										<MenuItem value="icici">ICICI Bank</MenuItem>
										<MenuItem value="axis">Axis Bank</MenuItem>
										<MenuItem value="other">Other Bank</MenuItem>
									</Select>
								</FormControl>
							</Box>
						)}
					</Box>
				);

			case 2:
				return (
					<Box>
						<Alert severity="success" sx={{ mb: 3 }}>
							Click 'Complete Payment' to confirm and process your payment.
						</Alert>

						<Typography variant="h6" gutterBottom>
							Payment Summary
						</Typography>

						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Typography>Total amount:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography fontWeight={700} color="primary">
									₹{totalAmount}
								</Typography>
							</Grid>

							<Grid item xs={6}>
								<Typography>Payment method:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography fontWeight={500}>
									{paymentData.paymentMethod === "card"
										? "Credit/Debit Card"
										: paymentData.paymentMethod === "upi"
										? "UPI"
										: "Net Banking"}
								</Typography>
							</Grid>
						</Grid>
					</Box>
				);

			default:
				return "Unknown step";
		}
	};

	return (
		<Container maxWidth="lg" sx={{ py: 8 }}>
			<Paper elevation={3} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
				<Typography
					variant="h4"
					component="h1"
					gutterBottom
					fontWeight={600}
					color="primary"
				>
					Payment Process
				</Typography>

				<Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>

				{error && (
					<Alert severity="error" sx={{ mb: 3 }}>
						{error}
					</Alert>
				)}

				<Grid container spacing={4}>
					<Grid item xs={12} md={8}>
						<Box sx={{ p: 2 }}>{renderStepContent(activeStep)}</Box>

						<Box
							sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
						>
							<Button
								color="inherit"
								disabled={activeStep === 0 || loading}
								onClick={handleBack}
							>
								Back
							</Button>
							<Box sx={{ flex: "1 1 auto" }} />
							{activeStep === steps.length - 1 ? (
								<Button
									variant="contained"
									color="primary"
									onClick={handleSubmit}
									disabled={loading}
								>
									{loading ? (
										<CircularProgress size={24} color="inherit" />
									) : (
										"Complete Payment"
									)}
								</Button>
							) : (
								<Button
									variant="contained"
									color="primary"
									onClick={handleNext}
								>
									Next
								</Button>
							)}
						</Box>
					</Grid>

					<Grid item xs={12} md={4}>
						<Card elevation={2}>
							<CardContent>
								<Typography variant="h6" gutterBottom fontWeight={600}>
									Order Summary
								</Typography>

								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ mb: 2 }}
								>
									Meal ID: {mealId}
								</Typography>

								<Divider sx={{ my: 2 }} />

								<Grid container spacing={1}>
									<Grid item xs={7}>
										<Typography>Subtotal:</Typography>
									</Grid>
									<Grid item xs={5} sx={{ textAlign: "right" }}>
										<Typography>₹{totalAmount}</Typography>
									</Grid>

									<Grid item xs={7}>
										<Typography>Tax:</Typography>
									</Grid>
									<Grid item xs={5} sx={{ textAlign: "right" }}>
										<Typography>₹0</Typography>
									</Grid>

									<Grid item xs={7}>
										<Typography variant="h6" fontWeight={600} sx={{ mt: 1 }}>
											Total:
										</Typography>
									</Grid>
									<Grid item xs={5} sx={{ textAlign: "right" }}>
										<Typography
											variant="h6"
											fontWeight={700}
											color="primary"
											sx={{ mt: 1 }}
										>
											₹{totalAmount}
										</Typography>
									</Grid>
								</Grid>

								<Box sx={{ mt: 3, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
									<Typography variant="body2" color="text.secondary">
										* This is a secure payment process. Your payment information
										is encrypted.
									</Typography>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};

export default PaymentPage;
