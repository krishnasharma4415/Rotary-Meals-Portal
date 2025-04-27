import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Container,
	Typography,
	Paper,
	Grid,
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
	Alert,
	CircularProgress,
	InputAdornment,
	Card,
	CardContent,
	Divider,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { toast } from "react-toastify";
import { bookMeal } from "../services/api";

const BookMealPage = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const [formData, setFormData] = useState({
		mealsPerDay: 1,
		numberOfMembers: 1,
		totalDays: 7,
		startDate: new Date(),
	});

	const [errors, setErrors] = useState({});

	// Calculate total amount
	const mealPrice = 70; // Rs. 70 per meal
	const totalAmount =
		formData.mealsPerDay *
		formData.numberOfMembers *
		formData.totalDays *
		mealPrice;

	const validateForm = () => {
		const newErrors = {};

		if (
			!formData.mealsPerDay ||
			formData.mealsPerDay < 1 ||
			formData.mealsPerDay > 2
		)
			newErrors.mealsPerDay = "Please select 1 or 2 meals per day";

		if (!formData.numberOfMembers || formData.numberOfMembers < 1)
			newErrors.numberOfMembers = "Number of members must be at least 1";

		if (!formData.totalDays || formData.totalDays < 1)
			newErrors.totalDays = "Total days must be at least 1";

		if (!formData.startDate) newErrors.startDate = "Start date is required";
		else if (formData.startDate < new Date(new Date().setHours(0, 0, 0, 0)))
			newErrors.startDate = "Start date cannot be in the past";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleDateChange = (newDate) => {
		setFormData({ ...formData, startDate: newDate });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		setError("");
		setLoading(true);

		try {
			const response = await bookMeal(formData);
			toast.success("Meal booked successfully!");
			navigate(`/payment/${response.mealId}`, {
				state: {
					totalAmount: response.totalAmount,
					mealDetails: formData,
				},
			});
		} catch (error) {
			console.error("Booking error:", error);
			setError(
				error.response?.data?.error || "Failed to book meal. Please try again."
			);
			toast.error("Failed to book meal. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Container maxWidth="lg" sx={{ py: 8 }}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<Typography
							variant="h4"
							component="h1"
							gutterBottom
							fontWeight={600}
							color="primary"
						>
							Book Your Meals
						</Typography>
						<Typography variant="body1" color="text.secondary" paragraph>
							Select your meal preferences and duration to continue
						</Typography>

						{error && (
							<Alert severity="error" sx={{ mb: 3 }}>
								{error}
							</Alert>
						)}

						<Paper elevation={3} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
							<Box component="form" onSubmit={handleSubmit}>
								<Grid container spacing={3}>
									<Grid item xs={12} sm={6}>
										<FormControl fullWidth error={Boolean(errors.mealsPerDay)}>
											<InputLabel id="meals-per-day-label">
												Meals Per Day
											</InputLabel>
											<Select
												labelId="meals-per-day-label"
												id="mealsPerDay"
												name="mealsPerDay"
												value={formData.mealsPerDay}
												label="Meals Per Day"
												onChange={handleChange}
											>
												<MenuItem value={1}>1 Meal</MenuItem>
												<MenuItem value={2}>2 Meals</MenuItem>
											</Select>
											{errors.mealsPerDay && (
												<FormHelperText>{errors.mealsPerDay}</FormHelperText>
											)}
										</FormControl>
									</Grid>

									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											id="numberOfMembers"
											name="numberOfMembers"
											label="Number of Members"
											type="number"
											value={formData.numberOfMembers}
											onChange={handleChange}
											InputProps={{
												inputProps: { min: 1 },
											}}
											error={Boolean(errors.numberOfMembers)}
											helperText={errors.numberOfMembers}
										/>
									</Grid>

									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											id="totalDays"
											name="totalDays"
											label="Duration (Days)"
											type="number"
											value={formData.totalDays}
											onChange={handleChange}
											InputProps={{
												inputProps: { min: 1 },
											}}
											error={Boolean(errors.totalDays)}
											helperText={errors.totalDays}
										/>
									</Grid>

									<Grid item xs={12} sm={6}>
										<DatePicker
											label="Start Date"
											value={formData.startDate}
											onChange={handleDateChange}
											minDate={new Date()}
											renderInput={(params) => (
												<TextField
													{...params}
													fullWidth
													error={Boolean(errors.startDate)}
													helperText={errors.startDate}
												/>
											)}
										/>
									</Grid>

									<Grid item xs={12}>
										<Button
											type="submit"
											fullWidth
											variant="contained"
											color="primary"
											size="large"
											disabled={loading}
											sx={{ mt: 2, py: 1.5, fontSize: "1.1rem" }}
										>
											{loading ? (
												<CircularProgress size={24} color="inherit" />
											) : (
												"Proceed to Payment"
											)}
										</Button>
									</Grid>
								</Grid>
							</Box>
						</Paper>
					</Grid>

					<Grid item xs={12} md={6}>
						<Card
							elevation={3}
							sx={{ position: "sticky", top: 24, height: "100%", p: { xs: 3, md: 4 }, borderRadius: 2 }}
						>
							<CardContent sx={{ p: 0 }}>
								<Typography
									variant="h5"
									component="h2"
									gutterBottom
									fontWeight={600}
									sx={{ mb: 3 }}
								>
									Your Order Summary
								</Typography>

								<Box sx={{ my: 4 }}>
									<Grid container spacing={3}>
										<Grid item xs={8}>
											<Typography variant="body1">Meals per day:</Typography>
										</Grid>
										<Grid item xs={4} sx={{ textAlign: "right" }}>
											<Typography variant="body1" fontWeight={500}>
												{formData.mealsPerDay}
											</Typography>
										</Grid>

										<Grid item xs={8}>
											<Typography variant="body1">
												Number of members:
											</Typography>
										</Grid>
										<Grid item xs={4} sx={{ textAlign: "right" }}>
											<Typography variant="body1" fontWeight={500}>
												{formData.numberOfMembers}
											</Typography>
										</Grid>

										<Grid item xs={8}>
											<Typography variant="body1">Duration:</Typography>
										</Grid>
										<Grid item xs={4} sx={{ textAlign: "right" }}>
											<Typography variant="body1" fontWeight={500}>
												{formData.totalDays} days
											</Typography>
										</Grid>

										<Grid item xs={8}>
											<Typography variant="body1">Cost per meal:</Typography>
										</Grid>
										<Grid item xs={4} sx={{ textAlign: "right" }}>
											<Typography variant="body1" fontWeight={500}>
												₹{mealPrice}
											</Typography>
										</Grid>

										<Grid item xs={8}>
											<Typography variant="body1">Total meals:</Typography>
										</Grid>
										<Grid item xs={4} sx={{ textAlign: "right" }}>
											<Typography variant="body1" fontWeight={500}>
												{formData.mealsPerDay *
													formData.numberOfMembers *
													formData.totalDays}
											</Typography>
										</Grid>
									</Grid>
								</Box>

								<Divider sx={{ my: 3 }} />

								<Box sx={{ mt: 3, mb: 4 }}>
									<Grid container spacing={2}>
										<Grid item xs={6}>
											<Typography variant="h6">Total Amount:</Typography>
										</Grid>
										<Grid item xs={6} sx={{ textAlign: "right" }}>
											<Typography variant="h6" fontWeight={700} color="primary">
												₹{totalAmount}
											</Typography>
										</Grid>
									</Grid>
								</Box>

								<Box
									sx={{
										mt: 5,
										p: 3,
										bgcolor: "#f5f5f5",
										borderRadius: 1,
										minHeight: "60px",
										display: "flex",
										alignItems: "center",
									}}
								>
									<Typography variant="body2" color="text.secondary">
										* Once you submit your booking, you will be directed to the
										payment page.
									</Typography>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</LocalizationProvider>
	);
};

export default BookMealPage;
