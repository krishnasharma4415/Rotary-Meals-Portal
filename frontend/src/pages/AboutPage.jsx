import {
	Box,
	Container,
	Typography,
	Grid,
	Card,
	CardContent,
	CardMedia,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import WaterIcon from "@mui/icons-material/Water";

const AboutPage = () => {
	const coreValues = [
		{
			title: "Service",
			icon: (
				<VolunteerActivismIcon
					fontSize="large"
					sx={{ color: "secondary.main" }}
				/>
			),
			description:
				"We believe in service above self, focusing on making a positive difference in our community.",
		},
		{
			title: "Fellowship",
			icon: <PeopleAltIcon fontSize="large" sx={{ color: "secondary.main" }} />,
			description:
				"We foster lasting friendships and provide opportunities for connection with our community.",
		},
		{
			title: "Integrity",
			icon: (
				<CheckCircleIcon fontSize="large" sx={{ color: "secondary.main" }} />
			),
			description:
				"We adhere to high ethical standards in all our actions and dealings with the public.",
		},
		{
			title: "Global Impact",
			icon: <PublicIcon fontSize="large" sx={{ color: "secondary.main" }} />,
			description:
				"We leverage our local actions to contribute to positive global change and improvement.",
		},
	];

	const focusAreas = [
		{
			title: "Education",
			icon: <SchoolIcon fontSize="large" />,
			description:
				"Supporting literacy and educational programs for underprivileged children.",
		},
		{
			title: "Health",
			icon: <MedicalServicesIcon fontSize="large" />,
			description:
				"Organizing medical camps and promoting healthcare awareness in the community.",
		},
		{
			title: "Community Development",
			icon: <AccessibilityNewIcon fontSize="large" />,
			description:
				"Working on infrastructure improvements and societal welfare projects.",
		},
		{
			title: "Water & Sanitation",
			icon: <WaterIcon fontSize="large" />,
			description:
				"Ensuring clean water access and improved sanitation facilities.",
		},
	];

	return (
		<Box>
			{/* Hero Section */}
			<Box
				sx={{
					bgcolor: "primary.main",
					color: "white",
					py: { xs: 6, md: 10 },
					textAlign: "center",
					backgroundImage:
						"linear-gradient(rgba(12, 60, 96, 0.9), rgba(12, 60, 96, 0.9)), url(https://source.unsplash.com/random/1600x800/?rotary,club)",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<Container maxWidth="md">
					<Typography
						variant="h2"
						component="h1"
						gutterBottom
						sx={{ fontWeight: 700 }}
					>
						About Rotary Club Unjha
					</Typography>
					<Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>
						Serving humanity since 1985
					</Typography>
					<Divider
						sx={{
							my: 3,
							bgcolor: "rgba(255,255,255,0.3)",
							width: "50%",
							mx: "auto",
						}}
					/>
					<Typography variant="body1" sx={{ maxWidth: "800px", mx: "auto" }}>
						Rotary Club of Unjha is a part of Rotary International, a global
						network of 1.4 million neighbors, friends, leaders, and
						problem-solvers who see a world where people unite and take action
						to create lasting change – across the globe, in our communities, and
						in ourselves.
					</Typography>
				</Container>
			</Box>

			{/* Our History */}
			<Container maxWidth="lg" sx={{ py: 8 }}>
				<Grid container spacing={6} alignItems="center">
					<Grid item xs={12} md={6}>
						<Typography
							variant="h3"
							component="h2"
							gutterBottom
							sx={{ fontWeight: 600 }}
						>
							Our History
						</Typography>
						<Typography variant="body1" paragraph>
							Established in 1985, Rotary Club of Unjha has been at the
							forefront of community service in the Unjha region of Gujarat,
							India. Our club was founded by a group of local business leaders
							who wanted to make a positive impact in the community.
						</Typography>
						<Typography variant="body1" paragraph>
							Over the decades, we have implemented numerous projects focusing
							on education, healthcare, water conservation, and community
							development. Our members come from diverse professional
							backgrounds but share a common commitment to service above self.
						</Typography>
						<Typography variant="body1">
							Today, with over 50 active members, Rotary Club of Unjha continues
							to expand its reach and impact, addressing the most pressing needs
							of our community while upholding the core values of Rotary
							International.
						</Typography>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper elevation={3} sx={{ overflow: "hidden", borderRadius: 2 }}>
							<CardMedia
								component="img"
								height="400"
								image="https://source.unsplash.com/random/600x400/?community,service"
								alt="Rotary Club history"
							/>
						</Paper>
					</Grid>
				</Grid>
			</Container>

			{/* Our Core Values */}
			<Box sx={{ bgcolor: "#f5f5f5", py: 8 }}>
				<Container maxWidth="lg">
					<Typography
						variant="h3"
						component="h2"
						align="center"
						gutterBottom
						sx={{ mb: 6, fontWeight: 600 }}
					>
						Our Core Values
					</Typography>

					<Grid container spacing={4}>
						{coreValues.map((value, index) => (
							<Grid item xs={12} sm={6} md={3} key={index}>
								<Card elevation={2} sx={{ height: "100%" }}>
									<CardContent sx={{ textAlign: "center", p: 3 }}>
										{value.icon}
										<Typography
											variant="h5"
											component="h3"
											sx={{ my: 2, fontWeight: 600 }}
										>
											{value.title}
										</Typography>
										<Typography variant="body2">{value.description}</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>

			{/* Our Impact */}
			<Container maxWidth="lg" sx={{ py: 8 }}>
				<Grid container spacing={6} alignItems="center">
					<Grid item xs={12} md={6}>
						<Paper elevation={3} sx={{ overflow: "hidden", borderRadius: 2 }}>
							<CardMedia
								component="img"
								height="400"
								image="https://source.unsplash.com/random/600x400/?charity,help"
								alt="Our impact"
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} md={6}>
						<Typography
							variant="h3"
							component="h2"
							gutterBottom
							sx={{ fontWeight: 600 }}
						>
							Our Impact
						</Typography>
						<Typography variant="body1" paragraph>
							At Rotary Club Unjha, we measure our success by the lives we've
							touched and the positive changes we've brought to our community.
							Over the years, our impact has been significant and far-reaching.
						</Typography>
						<List>
							<ListItem>
								<ListItemIcon>
									<CheckCircleIcon color="secondary" />
								</ListItemIcon>
								<ListItemText primary="Provided education support to over 500 underprivileged children" />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<CheckCircleIcon color="secondary" />
								</ListItemIcon>
								<ListItemText primary="Organized 100+ health camps serving thousands of patients" />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<CheckCircleIcon color="secondary" />
								</ListItemIcon>
								<ListItemText primary="Implemented water conservation projects benefiting 20+ villages" />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<CheckCircleIcon color="secondary" />
								</ListItemIcon>
								<ListItemText primary="Distributed relief materials during natural disasters and emergencies" />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<CheckCircleIcon color="secondary" />
								</ListItemIcon>
								<ListItemText primary="Launched the affordable meal service program in 2022" />
							</ListItem>
						</List>
					</Grid>
				</Grid>
			</Container>

			{/* Our Focus Areas */}
			<Box sx={{ bgcolor: "primary.main", color: "white", py: 8 }}>
				<Container maxWidth="lg">
					<Typography
						variant="h3"
						component="h2"
						align="center"
						gutterBottom
						sx={{ mb: 6, fontWeight: 600 }}
					>
						Our Focus Areas
					</Typography>

					<Grid container spacing={4} justifyContent="center">
						{focusAreas.map((area, index) => (
							<Grid item xs={12} sm={6} md={6} lg={5} key={index}>
								<Card
									sx={{
										height: "100%",
										bgcolor: "rgba(255,255,255,0.15)",
										color: "white",
										backdropFilter: "blur(5px)",
										transition: "transform 0.3s, box-shadow 0.3s",
										"&:hover": {
											transform: "translateY(-5px)",
											boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
										},
										display: "flex",
										flexDirection: "column",
										borderRadius: 2,
									}}
								>
									<CardContent
										sx={{
											textAlign: "center",
											p: 4,
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											gap: 2,
										}}
									>
										<Box
											sx={{
												bgcolor: "rgba(255,255,255,0.1)",
												borderRadius: "50%",
												p: 2,
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												mb: 1,
											}}
										>
											{area.icon}
										</Box>
										<Typography
											variant="h4"
											component="h3"
											sx={{ mb: 2, fontWeight: 600 }}
										>
											{area.title}
										</Typography>
										<Typography variant="body1">{area.description}</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>

			{/* Meal Service Program */}
			<Container maxWidth="lg" sx={{ py: 8 }}>
				<Typography
					variant="h3"
					component="h2"
					align="center"
					gutterBottom
					sx={{ mb: 6, fontWeight: 600 }}
				>
					Our Affordable Meal Service Program
				</Typography>

				<Grid container spacing={6} alignItems="center">
					<Grid item xs={12} md={6}>
						<Typography variant="h5" gutterBottom color="primary.main">
							Addressing Food Security in Our Community
						</Typography>
						<Typography variant="body1" paragraph>
							The Affordable Meal Service Program is one of our flagship
							initiatives, started in response to the rising food costs and
							increasing food insecurity in our region. We recognized that many
							families and individuals were struggling to access nutritious
							meals regularly.
						</Typography>
						<Typography variant="body1" paragraph>
							Our program provides nutritionally balanced meals at just Rs. 70
							per meal, making it accessible to everyone in the community. Users
							can book up to two meals per day for themselves and their family
							members. The program operates on a sustainable model that ensures
							quality while maintaining affordability.
						</Typography>
						<Typography variant="body1">
							Through partnerships with local businesses, generous donations
							from our members, and efficient operations, we've been able to
							serve over 10,000 meals since the program's inception. We remain
							committed to expanding this service and reaching more people in
							need.
						</Typography>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper elevation={3} sx={{ overflow: "hidden", borderRadius: 2 }}>
							<CardMedia
								component="img"
								height="400"
								image="https://source.unsplash.com/random/600x400/?food,serving,community"
								alt="Meal service program"
							/>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default AboutPage;
