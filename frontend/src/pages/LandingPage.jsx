import { Link as RouterLink } from "react-router-dom";
import {
	Box,
	Button,
	Container,
	Typography,
	Grid,
	Card,
	CardContent,
	CardMedia,
	Stack,
	Divider,
	Paper,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import WaterIcon from "@mui/icons-material/Water";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import HandshakeIcon from "@mui/icons-material/Handshake";

const LandingPage = () => {
	return (
		<Box>
			{/* Hero Section */}
			<Box
				sx={{
					bgcolor: "primary.main",
					color: "white",
					py: { xs: 8, md: 12 },
					textAlign: "center",
					backgroundImage:
						"linear-gradient(135deg, rgba(12, 60, 96, 0.9), rgba(25, 118, 210, 0.8)), url(https://source.unsplash.com/random/1600x800/?food,indian)",
					backgroundSize: "cover",
					backgroundPosition: "center",
					boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
					borderRadius: { xs: 0, md: "0 0 16px 16px" },
					position: "relative",
					overflow: "hidden",
				}}
			>
				<Container maxWidth="md">
					<Typography
						variant="h2"
						component="h1"
						gutterBottom
						sx={{
							fontWeight: 700,
							fontSize: { xs: "2.5rem", md: "3.75rem" },
							textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
							mb: 3,
							background: "linear-gradient(45deg, #fff, #e0f2ff)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						Affordable Meal Service
					</Typography>
					<Typography
						variant="h5"
						component="p"
						sx={{
							mb: 5,
							fontWeight: 400,
							maxWidth: "800px",
							mx: "auto",
							lineHeight: 1.6,
							fontSize: { xs: "1.1rem", md: "1.3rem" },
							opacity: 0.9,
						}}
					>
						A Rotary Club Unjha initiative to provide nutritious meals at just
						Rs. 70 per meal
					</Typography>
					<Stack
						direction={{ xs: "column", sm: "row" }}
						spacing={3}
						justifyContent="center"
					>
						<Button
							component={RouterLink}
							to="/register"
							variant="contained"
							color="secondary"
							size="large"
							sx={{
								px: 4,
								py: 1.5,
								fontWeight: 600,
								borderRadius: "30px",
								boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
								transition: "all 0.3s",
								"&:hover": {
									transform: "translateY(-3px)",
									boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
								},
							}}
						>
							Register Now
						</Button>
					</Stack>
				</Container>
			</Box>

			{/* Key Features */}
			<Container maxWidth="lg" sx={{ py: 8 }}>
				<Typography
					variant="h3"
					component="h2"
					align="center"
					gutterBottom
					sx={{ mb: 6, fontWeight: 600 }}
				>
					Why Choose Our Meal Service?
				</Typography>

				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						gap: 3,
						justifyContent: "space-between",
					}}
				>
					{/* Feature 1 */}
					<Card
						elevation={3}
						sx={{
							borderRadius: 2,
							width: { xs: "100%", md: "32%" },
							mb: { xs: 3, md: 0 },
						}}
					>
						<Box
							sx={{
								p: 3,
								textAlign: "center",
								bgcolor: "primary.main",
								color: "white",
							}}
						>
							<LocalAtmIcon sx={{ fontSize: 60 }} />
						</Box>
						<CardContent sx={{ p: 3 }}>
							<Typography
								variant="h5"
								component="h3"
								gutterBottom
								fontWeight={600}
								sx={{ textAlign: "center", mb: 2 }}
							>
								Affordable Price
							</Typography>
							<Typography sx={{ textAlign: "center" }}>
								Only Rs. 70 per meal, making nutritious food accessible to
								everyone in our community. Our affordable pricing ensures no one
								goes hungry.
							</Typography>
						</CardContent>
					</Card>

					{/* Feature 2 */}
					<Card
						elevation={3}
						sx={{
							borderRadius: 2,
							width: { xs: "100%", md: "32%" },
							mb: { xs: 3, md: 0 },
						}}
					>
						<Box
							sx={{
								p: 3,
								textAlign: "center",
								bgcolor: "secondary.main",
								color: "white",
							}}
						>
							<RestaurantIcon sx={{ fontSize: 60 }} />
						</Box>
						<CardContent sx={{ p: 3 }}>
							<Typography
								variant="h5"
								component="h3"
								gutterBottom
								fontWeight={600}
								sx={{ textAlign: "center", mb: 2 }}
							>
								Nutritious Meals
							</Typography>
							<Typography sx={{ textAlign: "center" }}>
								Balanced and healthy meals prepared by experienced chefs using
								fresh ingredients, providing all essential nutrients.
							</Typography>
						</CardContent>
					</Card>

					{/* Feature 3 */}
					<Card
						elevation={3}
						sx={{
							borderRadius: 2,
							width: { xs: "100%", md: "32%" },
						}}
					>
						<Box
							sx={{
								p: 3,
								textAlign: "center",
								bgcolor: "primary.main",
								color: "white",
							}}
						>
							<PeopleIcon sx={{ fontSize: 60 }} />
						</Box>
						<CardContent sx={{ p: 3 }}>
							<Typography
								variant="h5"
								component="h3"
								gutterBottom
								fontWeight={600}
								sx={{ textAlign: "center", mb: 2 }}
							>
								Community Support
							</Typography>
							<Typography sx={{ textAlign: "center" }}>
								A Rotary Club initiative designed to serve the community and
								support families with access to quality food at affordable
								rates.
							</Typography>
						</CardContent>
					</Card>
				</Box>
			</Container>

			{/* Core Values Section */}
			<Container maxWidth="lg" sx={{ py: 8 }}>
				<Typography
					variant="h3"
					component="h2"
					align="center"
					gutterBottom
					sx={{ mb: 1, fontWeight: 600 }}
				>
					Our Core Values
				</Typography>
				<Typography
					variant="subtitle1"
					align="center"
					color="text.secondary"
					sx={{ mb: 6, maxWidth: "700px", mx: "auto" }}
				>
					These principles guide everything we do in service to our community
				</Typography>

				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", sm: "row" },
						flexWrap: { sm: "wrap" },
						gap: 3,
						justifyContent: "center",
					}}
				>
					{/* Service Value */}
					<Card
						elevation={3}
						sx={{
							borderRadius: 4,
							width: { xs: "100%", sm: "45%", md: "45%", lg: "22%" },
							mb: { xs: 3, md: 0 },
							transform: "rotate(-1deg)",
							transition: "transform 0.3s",
							"&:hover": {
								transform: "rotate(0deg) scale(1.03)",
							},
						}}
					>
						<Box
							sx={{
								p: 3,
								textAlign: "center",
								background: "linear-gradient(45deg, #1565c0, #0d47a1)",
								color: "white",
							}}
						>
							<VolunteerActivismIcon sx={{ fontSize: 60 }} />
						</Box>
						<CardContent sx={{ p: 3 }}>
							<Typography
								variant="h5"
								component="h3"
								gutterBottom
								fontWeight={600}
								sx={{ textAlign: "center", mb: 2 }}
							>
								Service
							</Typography>
							<Typography sx={{ textAlign: "center" }}>
								We prioritize service above self, dedicating our resources to
								help those in need.
							</Typography>
						</CardContent>
					</Card>

					{/* Integrity Value */}
					<Card
						elevation={3}
						sx={{
							borderRadius: 4,
							width: { xs: "100%", sm: "45%", md: "45%", lg: "22%" },
							mb: { xs: 3, md: 0 },
							transform: "rotate(1deg)",
							transition: "transform 0.3s",
							"&:hover": {
								transform: "rotate(0deg) scale(1.03)",
							},
						}}
					>
						<Box
							sx={{
								p: 3,
								textAlign: "center",
								background: "linear-gradient(45deg, #f44336, #d32f2f)",
								color: "white",
							}}
						>
							<AccessibilityNewIcon sx={{ fontSize: 60 }} />
						</Box>
						<CardContent sx={{ p: 3 }}>
							<Typography
								variant="h5"
								component="h3"
								gutterBottom
								fontWeight={600}
								sx={{ textAlign: "center", mb: 2 }}
							>
								Integrity
							</Typography>
							<Typography sx={{ textAlign: "center" }}>
								We uphold the highest standards of honesty, transparency and
								ethical conduct.
							</Typography>
						</CardContent>
					</Card>

					{/* Innovation Value */}
					<Card
						elevation={4}
						sx={{
							borderRadius: 4,
							width: { xs: "100%", sm: "45%", md: "45%", lg: "22%" },
							mb: { xs: 3, sm: 0 },
							transform: "rotate(-1deg)",
							transition: "transform 0.3s",
							"&:hover": {
								transform: "rotate(0deg) scale(1.03)",
							},
						}}
					>
						<Box
							sx={{
								p: 3,
								textAlign: "center",
								background: "linear-gradient(45deg, #4caf50, #2e7d32)",
								color: "white",
							}}
						>
							<EmojiObjectsIcon sx={{ fontSize: 60 }} />
						</Box>
						<CardContent sx={{ p: 3 }}>
							<Typography
								variant="h5"
								component="h3"
								gutterBottom
								fontWeight={600}
								sx={{ textAlign: "center", mb: 2 }}
							>
								Innovation
							</Typography>
							<Typography sx={{ textAlign: "center" }}>
								We embrace creative solutions to address community challenges
								effectively.
							</Typography>
						</CardContent>
					</Card>

					{/* Collaboration Value */}
					<Card
						elevation={4}
						sx={{
							borderRadius: 4,
							width: { xs: "100%", sm: "45%", md: "45%", lg: "22%" },
							transform: "rotate(1deg)",
							transition: "transform 0.3s",
							"&:hover": {
								transform: "rotate(0deg) scale(1.03)",
							},
						}}
					>
						<Box
							sx={{
								p: 3,
								textAlign: "center",
								background: "linear-gradient(45deg, #673ab7, #4527a0)",
								color: "white",
							}}
						>
							<HandshakeIcon sx={{ fontSize: 60 }} />
						</Box>
						<CardContent sx={{ p: 3 }}>
							<Typography
								variant="h5"
								component="h3"
								gutterBottom
								fontWeight={600}
								sx={{ textAlign: "center", mb: 2 }}
							>
								Collaboration
							</Typography>
							<Typography sx={{ textAlign: "center" }}>
								We work together with communities and partners to create lasting
								change.
							</Typography>
						</CardContent>
					</Card>
				</Box>
			</Container>

			{/* How It Works */}
			<Box sx={{ bgcolor: "#f5f5f5", py: 8 }}>
				<Container maxWidth="lg">
					<Typography
						variant="h3"
						component="h2"
						align="center"
						gutterBottom
						sx={{ mb: 6, fontWeight: 600 }}
					>
						How It Works
					</Typography>

					<Grid container spacing={4} alignItems="center">
						<Grid item xs={12} md={6}>
							<Card elevation={0} sx={{ bgcolor: "transparent" }}>
								<CardContent>
									<List>
										<ListItem>
											<ListItemIcon>
												<CheckCircleOutlineIcon color="secondary" />
											</ListItemIcon>
											<ListItemText
												primary="Register with a valid Aadhar Card"
												secondary="Create an account with your details and upload your Aadhar card as ID proof"
											/>
										</ListItem>
										<ListItem>
											<ListItemIcon>
												<CheckCircleOutlineIcon color="secondary" />
											</ListItemIcon>
											<ListItemText
												primary="Book your meals"
												secondary="Select number of meals per day (up to 2), number of members, and duration"
											/>
										</ListItem>
										<ListItem>
											<ListItemIcon>
												<CheckCircleOutlineIcon color="secondary" />
											</ListItemIcon>
											<ListItemText
												primary="Make payment"
												secondary="Pay securely online or at our center"
											/>
										</ListItem>
										<ListItem>
											<ListItemIcon>
												<CheckCircleOutlineIcon color="secondary" />
											</ListItemIcon>
											<ListItemText
												primary="Enjoy your meals"
												secondary="Pick up your meals from our designated centers"
											/>
										</ListItem>
									</List>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={6}>
							<Paper elevation={4} sx={{ overflow: "hidden", borderRadius: 2 }}>
								<CardMedia
									component="img"
									height="400"
									image="https://source.unsplash.com/random/600x400/?food,indian,meal"
									alt="Meal service"
								/>
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</Box>

			{/* Pricing Details */}
			<Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
				<Typography
					variant="h3"
					component="h2"
					gutterBottom
					sx={{ mb: 2, fontWeight: 600 }}
				>
					Our Affordable Pricing
				</Typography>
				<Typography variant="h5" color="text.secondary" paragraph>
					Simple and transparent pricing for everyone
				</Typography>

				<Box
					sx={{
						bgcolor: "primary.main",
						color: "white",
						py: 5,
						px: 3,
						borderRadius: 4,
						mt: 4,
						position: "relative",
						overflow: "hidden",
					}}
				>
					<Box
						sx={{
							position: "absolute",
							top: 0,
							right: 0,
							width: 150,
							height: 150,
							bgcolor: "secondary.main",
							transform: "rotate(45deg) translate(30%, -70%)",
							opacity: 0.8,
							zIndex: 0,
						}}
					/>

					<Typography
						variant="h2"
						component="p"
						sx={{ fontWeight: 700, position: "relative", zIndex: 1 }}
					>
						₹70
						<Typography component="span" variant="h5">
							{" "}
							/ meal
						</Typography>
					</Typography>

					<Divider
						sx={{
							my: 3,
							bgcolor: "rgba(255,255,255,0.3)",
							position: "relative",
							zIndex: 1,
						}}
					/>

					<Grid
						container
						spacing={2}
						justifyContent="center"
						sx={{ position: "relative", zIndex: 1 }}
					>
						<Grid item xs={12} sm={4}>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<RestaurantIcon sx={{ fontSize: 40, mb: 1 }} />
								<Typography variant="h6" gutterBottom>
									Up to 2 meals daily
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<PeopleIcon sx={{ fontSize: 40, mb: 1 }} />
								<Typography variant="h6" gutterBottom>
									Multiple members
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<AccessTimeIcon sx={{ fontSize: 40, mb: 1 }} />
								<Typography variant="h6" gutterBottom>
									Flexible duration
								</Typography>
							</Box>
						</Grid>
					</Grid>

					<Button
						component={RouterLink}
						to="/register"
						variant="contained"
						color="secondary"
						size="large"
						sx={{
							mt: 4,
							px: 4,
							py: 1.5,
							fontWeight: 600,
							position: "relative",
							zIndex: 1,
						}}
					>
						Get Started Today
					</Button>
				</Box>

				<Typography variant="body1" sx={{ mt: 4, color: "text.secondary" }}>
					For bulk orders or special arrangements, please contact us directly
				</Typography>
			</Container>

			{/* CTA Section */}
			<Box
				sx={{
					bgcolor: "secondary.main",
					py: 6,
					textAlign: "center",
					color: "white",
				}}
			>
				<Container maxWidth="md">
					<Typography variant="h4" component="h2" gutterBottom fontWeight={600}>
						Ready to join our meal program?
					</Typography>
					<Typography variant="h6" paragraph sx={{ mb: 4 }}>
						Register now and help us create a hunger-free community
					</Typography>
					<Button
						component={RouterLink}
						to="/register"
						variant="contained"
						color="primary"
						size="large"
						sx={{ px: 4, py: 1.5 }}
					>
						Register Now
					</Button>
				</Container>
			</Box>
		</Box>
	);
};

export default LandingPage;
