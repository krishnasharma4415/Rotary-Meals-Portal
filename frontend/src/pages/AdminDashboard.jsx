import { useState, useEffect } from "react";
import {
	Box,
	Container,
	Typography,
	Paper,
	Grid,
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
	TextField,
	FormControl,
	MenuItem,
	Select,
	InputLabel,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { toast } from "react-toastify";
import { getAllMeals, updateMealStatus } from "../services/api";

const AdminDashboard = () => {
	const [tabValue, setTabValue] = useState(0);
	const [meals, setMeals] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");
	const [dateRange, setDateRange] = useState([null, null]);
	const [updateLoading, setUpdateLoading] = useState(false);

	// Dialog state for meal status update
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedMeal, setSelectedMeal] = useState(null);
	const [newStatus, setNewStatus] = useState("");

	useEffect(() => {
		const fetchMeals = async () => {
			setLoading(true);
			try {
				const mealData = await getAllMeals();
				setMeals(mealData);
			} catch (error) {
				console.error("Error fetching meals:", error);
				setError("Failed to load meal bookings. Please try again.");
				toast.error("Failed to load meal bookings");
			} finally {
				setLoading(false);
			}
		};

		fetchMeals();
	}, []);

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleStatusFilterChange = (e) => {
		setFilterStatus(e.target.value);
	};

	const handleOpenUpdateDialog = (meal) => {
		setSelectedMeal(meal);
		setNewStatus(meal.paymentStatus);
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
		setSelectedMeal(null);
	};

	const handleStatusUpdate = async () => {
		if (!selectedMeal || !newStatus) return;

		setUpdateLoading(true);
		try {
			await updateMealStatus(selectedMeal._id, newStatus);

			// Update the meal status in the local state
			setMeals(
				meals.map((meal) => {
					if (meal._id === selectedMeal._id) {
						return { ...meal, paymentStatus: newStatus };
					}
					return meal;
				})
			);

			toast.success("Meal status updated successfully");
			handleCloseDialog();
		} catch (error) {
			console.error("Error updating meal status:", error);
			toast.error("Failed to update meal status");
		} finally {
			setUpdateLoading(false);
		}
	};

	// Calculate dashboard statistics
	const totalMeals = meals.reduce(
		(total, meal) =>
			total + meal.mealsPerDay * meal.numberOfMembers * meal.totalDays,
		0
	);

	const totalRevenue = meals.reduce(
		(total, meal) =>
			meal.paymentStatus === "completed" ? total + meal.totalAmount : total,
		0
	);

	const totalUsers = [
		...new Set(meals.map((meal) => meal.userId?._id || meal.userId)),
	].length;

	const pendingPayments = meals.reduce(
		(total, meal) =>
			meal.paymentStatus === "pending" ? total + meal.totalAmount : total,
		0
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

	// Filter and search functions
	const filteredMeals = meals.filter((meal) => {
		// Filter by status
		if (filterStatus !== "all" && meal.paymentStatus !== filterStatus) {
			return false;
		}

		// Filter by date range
		if (dateRange[0] && dateRange[1]) {
			const mealStart = new Date(meal.startDate);
			const mealEnd = new Date(meal.endDate);
			const filterStart = new Date(dateRange[0]);
			const filterEnd = new Date(dateRange[1]);

			if (mealEnd < filterStart || mealStart > filterEnd) {
				return false;
			}
		}

		// Search by user name, email, or ID
		const searchLower = searchTerm.toLowerCase();
		const userName = meal.userId?.name?.toLowerCase() || "";
		const userEmail = meal.userId?.email?.toLowerCase() || "";
		const mealId = meal._id?.toLowerCase() || "";

		return (
			!searchTerm ||
			userName.includes(searchLower) ||
			userEmail.includes(searchLower) ||
			mealId.includes(searchLower)
		);
	});

	// Active, pending, completed counts
	const activeMeals = filteredMeals.filter(
		(meal) =>
			new Date(meal.endDate) >= new Date() && meal.paymentStatus === "completed"
	);

	const pendingMeals = filteredMeals.filter(
		(meal) => meal.paymentStatus === "pending"
	);

	const completedMeals = filteredMeals.filter(
		(meal) =>
			new Date(meal.endDate) < new Date() && meal.paymentStatus === "completed"
	);

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
				case 2: // Pending Payment
					return meal.paymentStatus === "pending";
				case 3: // Completed
					return (
						new Date(meal.endDate) < new Date() &&
						meal.paymentStatus === "completed"
					);
				default:
					return true;
			}
		};

		const tabFilteredMeals = filteredMeals.filter(filterByTab);

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

		if (tabFilteredMeals.length === 0) {
			return (
				<Box sx={{ textAlign: "center", my: 4, py: 4 }}>
					<Typography variant="h6" color="text.secondary" gutterBottom>
						No meal bookings found matching your filters
					</Typography>
				</Box>
			);
		}

		return (
			<TableContainer component={Paper} elevation={0} sx={{ mt: 3 }}>
				<Table>
					<TableHead>
						<TableRow sx={{ backgroundColor: "primary.light" }}>
							<TableCell>Booking ID</TableCell>
							<TableCell>User</TableCell>
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
						{tabFilteredMeals.map((meal) => {
							const userName = meal.userId?.name || "User";
							const userEmail = meal.userId?.email || "No email";

							return (
								<TableRow key={meal._id}>
									<TableCell>
										<Typography variant="body2" fontWeight={500}>
											{meal._id.substring(0, 8)}...
										</Typography>
									</TableCell>
									<TableCell>
										<Typography variant="body2" fontWeight={500}>
											{userName}
										</Typography>
										<Typography variant="caption" color="text.secondary">
											{userEmail}
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
										<Button
											variant="outlined"
											size="small"
											onClick={() => handleOpenUpdateDialog(meal)}
										>
											Update
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Box sx={{ py: 4 }}>
				<Container>
					<Typography
						variant="h4"
						component="h1"
						gutterBottom
						fontWeight={600}
						color="primary"
					>
						Admin Dashboard
					</Typography>
					<Typography variant="body1" color="text.secondary" paragraph>
						Manage all meal bookings and user payments
					</Typography>

					<Grid container spacing={3} sx={{ mb: 4 }}>
						<Grid item xs={12} sm={6} md={3}>
							<Card elevation={2}>
								<CardContent sx={{ textAlign: "center", py: 3 }}>
									<RestaurantIcon color="primary" fontSize="large" />
									<Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
										{totalMeals}
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
									<AttachMoneyIcon color="primary" fontSize="large" />
									<Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
										₹{totalRevenue}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Total Revenue
									</Typography>
								</CardContent>
							</Card>
						</Grid>

						<Grid item xs={12} sm={6} md={3}>
							<Card elevation={2}>
								<CardContent sx={{ textAlign: "center", py: 3 }}>
									<ReceiptIcon color="primary" fontSize="large" />
									<Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
										₹{pendingPayments}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Pending Payments
									</Typography>
								</CardContent>
							</Card>
						</Grid>

						<Grid item xs={12} sm={6} md={3}>
							<Card elevation={2}>
								<CardContent sx={{ textAlign: "center", py: 3 }}>
									<PeopleIcon color="primary" fontSize="large" />
									<Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
										{totalUsers}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Total Users
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					</Grid>

					<Paper elevation={1} sx={{ p: 3, mb: 4 }}>
						<Typography variant="h6" gutterBottom>
							Filter and Search
						</Typography>

						<Grid container spacing={3} alignItems="center">
							<Grid item xs={12} md={4}>
								<TextField
									fullWidth
									label="Search by user name, email, or ID"
									value={searchTerm}
									onChange={handleSearchChange}
									size="small"
								/>
							</Grid>

							<Grid item xs={12} md={4}>
								<FormControl fullWidth size="small">
									<InputLabel id="status-filter-label">
										Payment Status
									</InputLabel>
									<Select
										labelId="status-filter-label"
										value={filterStatus}
										label="Payment Status"
										onChange={handleStatusFilterChange}
									>
										<MenuItem value="all">All Statuses</MenuItem>
										<MenuItem value="completed">Paid</MenuItem>
										<MenuItem value="pending">Pending</MenuItem>
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={12} md={4}>
								<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
									<DatePicker
										label="Start Date"
										value={dateRange[0]}
										onChange={(newValue) =>
											setDateRange([newValue, dateRange[1]])
										}
										slotProps={{
											textField: { size: "small", fullWidth: true },
										}}
									/>
									<Box sx={{ mx: 1 }}> to </Box>
									<DatePicker
										label="End Date"
										value={dateRange[1]}
										onChange={(newValue) =>
											setDateRange([dateRange[0], newValue])
										}
										slotProps={{
											textField: { size: "small", fullWidth: true },
										}}
									/>
								</Box>
							</Grid>
						</Grid>
					</Paper>

					<Box sx={{ mb: 2 }}>
						<Typography variant="h5" component="h2" fontWeight={600}>
							Meal Bookings
						</Typography>
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
							<Tab label={`All (${filteredMeals.length})`} />
							<Tab label={`Active (${activeMeals.length})`} />
							<Tab label={`Pending Payment (${pendingMeals.length})`} />
							<Tab label={`Completed (${completedMeals.length})`} />
						</Tabs>

						<Box sx={{ p: 2 }}>{renderTabContent()}</Box>
					</Paper>

					{/* Status Update Dialog */}
					<Dialog open={dialogOpen} onClose={handleCloseDialog}>
						<DialogTitle>Update Meal Status</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Update the payment status for this meal booking:
							</DialogContentText>
							<Box sx={{ mt: 2 }}>
								<FormControl fullWidth>
									<InputLabel id="update-status-label">Status</InputLabel>
									<Select
										labelId="update-status-label"
										value={newStatus}
										label="Status"
										onChange={(e) => setNewStatus(e.target.value)}
									>
										<MenuItem value="completed">Paid</MenuItem>
										<MenuItem value="pending">Pending</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleCloseDialog} color="inherit">
								Cancel
							</Button>
							<Button
								onClick={handleStatusUpdate}
								color="primary"
								variant="contained"
								disabled={updateLoading}
							>
								{updateLoading ? <CircularProgress size={24} /> : "Update"}
							</Button>
						</DialogActions>
					</Dialog>
				</Container>
			</Box>
		</LocalizationProvider>
	);
};

export default AdminDashboard;
