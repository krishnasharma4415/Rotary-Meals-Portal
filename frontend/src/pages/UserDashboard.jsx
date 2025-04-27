import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	Box,
	Container,
	Typography,
	Paper,
	Grid,
	Button,
	Divider,
	Card,
	CardContent,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Chip,
	CircularProgress,
	Alert,
	Tabs,
	Tab,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import EventIcon from "@mui/icons-material/Event";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";
import { getUserMeals } from "../services/api";

const UserDashboard = () => {
	const [tabValue, setTabValue] = useState(0);
	const [meals, setMeals] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const user = JSON.parse(localStorage.getItem("user") || "{}");

	useEffect(() => {
		const fetchMeals = async () => {
			setLoading(true);
			try {
				const mealData = await getUserMeals();
				setMeals(mealData);
			} catch (error) {
				console.error("Error fetching meals:", error);
				setError("Failed to load meal bookings. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchMeals();
	}, []);

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	// Calculate dashboard statistics
	const totalMealsBooked = meals.reduce(
		(total, meal) =>
			total + meal.mealsPerDay * meal.numberOfMembers * meal.totalDays,
		0
	);

	const totalSpent = meals.reduce((total, meal) => total + meal.totalAmount, 0);

	const activeMeals = meals.filter(
		(meal) =>
			new Date(meal.endDate) >= new Date() && meal.paymentStatus === "completed"
	);

	const upcomingMeals = meals.filter(
		(meal) =>
			new Date(meal.startDate) > new Date() &&
			meal.paymentStatus === "completed"
	);

	const pendingMeals = meals.filter((meal) => meal.paymentStatus === "pending");

	const completedMeals = meals.filter(
		(meal) =>
			new Date(meal.endDate) < new Date() && meal.paymentStatus === "completed"
	);

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString();
	};

	const getStatusChip = (status) => {
		switch (status) {
			case "completed":
				return <Chip label="Paid" color="success" size="small" />;
			case "pending":
				return <Chip label="Pending" color="warning" size="small" />;
			default:
				return <Chip label={status} size="small" />;
		}
	};

	const renderTabContent = () => {
		const filterByTab = (meal) => {
			switch (tabValue) {
				case 0: // All
					return true;
				case 1: // Active
					return (
						new Date(meal.endDate) >= new Date() &&
						meal.paymentStatus === "completed"
					);
				case 2: // Upcoming
					return (
						new Date(meal.startDate) > new Date() &&
						meal.paymentStatus === "completed"
					);
				case 3: // Pending Payment
					return meal.paymentStatus === "pending";
				case 4: // Completed
					return (
						new Date(meal.endDate) < new Date() &&
						meal.paymentStatus === "completed"
					);
				default:
					return true;
			}
		};

		const filteredMeals = meals.filter(filterByTab);

		if (loading) {
			return (
				<Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
					<CircularProgress />
				</Box>
			);
		}

		if (error) {
			return (
				<Alert severity="error" sx={{ my: 2 }}>
					{error}
				</Alert>
			);
		}

		if (filteredMeals.length === 0) {
			return (
				<Box sx={{ textAlign: "center", my: 4, py: 4 }}>
					<Typography variant="h6" color="text.secondary" gutterBottom>
						No meal bookings found in this category
					</Typography>
					<Button
						component={RouterLink}
						to="/book-meal"
						variant="contained"
						color="primary"
						sx={{ mt: 2 }}
					>
						Book a Meal Now
					</Button>
				</Box>
			);
		}

		return (
			<TableContainer component={Paper} elevation={0} sx={{ mt: 3 }}>
				<Table>
					<TableHead>
						<TableRow sx={{ backgroundColor: "primary.light" }}>
							<TableCell>Booking ID</TableCell>
							<TableCell>Meals/Day</TableCell>
							<TableCell>Members</TableCell>
							<TableCell>Duration</TableCell>
							<TableCell>Dates</TableCell>
							<TableCell>Amount</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredMeals.map((meal) => (
							<TableRow key={meal._id}>
								<TableCell>
									<Typography variant="body2" fontWeight={500}>
										{meal._id.substring(0, 8)}...
									</Typography>
								</TableCell>
								<TableCell>{meal.mealsPerDay}</TableCell>
								<TableCell>{meal.numberOfMembers}</TableCell>
								<TableCell>{meal.totalDays} days</TableCell>
								<TableCell>
									{formatDate(meal.startDate)} - {formatDate(meal.endDate)}
								</TableCell>
								<TableCell>₹{meal.totalAmount}</TableCell>
								<TableCell>{getStatusChip(meal.paymentStatus)}</TableCell>
								<TableCell>
									{meal.paymentStatus === "pending" && (
										<Button
											component={RouterLink}
											to={`/payment/${meal._id}`}
											state={{ totalAmount: meal.totalAmount }}
											variant="contained"
											color="secondary"
											size="small"
										>
											Pay Now
										</Button>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	};

	return (
		<Box sx={{ py: 4 }}>
			<Container>
				<Typography
					variant="h4"
					component="h1"
					gutterBottom
					fontWeight={600}
					color="primary"
				>
					My Dashboard
				</Typography>
				<Typography variant="body1" color="text.secondary" paragraph>
					Welcome back, {user.name}! Here's an overview of your meal bookings.
				</Typography>

				<Grid container spacing={3} sx={{ mb: 4 }}>
					<Grid item xs={12} sm={6} md={3}>
						<Card elevation={2}>
							<CardContent sx={{ textAlign: "center", py: 3 }}>
								<RestaurantIcon color="primary" fontSize="large" />
								<Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
									{totalMealsBooked}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Total Meals Booked
								</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<Card elevation={2}>
							<CardContent sx={{ textAlign: "center", py: 3 }}>
								<ReceiptIcon color="primary" fontSize="large" />
								<Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
									₹{totalSpent}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Total Amount Spent
								</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<Card elevation={2}>
							<CardContent sx={{ textAlign: "center", py: 3 }}>
								<EventIcon color="primary" fontSize="large" />
								<Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
									{activeMeals.length}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Active Meal Plans
								</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<Card elevation={2}>
							<CardContent sx={{ textAlign: "center", py: 3 }}>
								<PeopleIcon color="primary" fontSize="large" />
								<Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
									{meals.reduce(
										(total, meal) => total + meal.numberOfMembers,
										0
									)}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Total Members Served
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>

				<Box
					sx={{
						mb: 2,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="h5" component="h2" fontWeight={600}>
						My Meal Bookings
					</Typography>
					<Button
						component={RouterLink}
						to="/book-meal"
						variant="contained"
						color="primary"
					>
						Book New Meal
					</Button>
				</Box>

				<Paper elevation={1}>
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						sx={{ borderBottom: 1, borderColor: "divider" }}
					>
						<Tab label={`All (${meals.length})`} />
						<Tab label={`Active (${activeMeals.length})`} />
						<Tab label={`Upcoming (${upcomingMeals.length})`} />
						<Tab label={`Pending Payment (${pendingMeals.length})`} />
						<Tab label={`Completed (${completedMeals.length})`} />
					</Tabs>

					<Box sx={{ p: 2 }}>{renderTabContent()}</Box>
				</Paper>
			</Container>
		</Box>
	);
};

export default UserDashboard;
