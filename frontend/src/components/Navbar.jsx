import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Avatar,
	Button,
	Tooltip,
	MenuItem,
	Drawer,
	List,
	ListItem,
	ListItemText,
	Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = ({ user, onLogout }) => {
	const navigate = useNavigate();
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setDrawerOpen(open);
	};

	const handleLogout = () => {
		handleCloseUserMenu();
		onLogout();
		navigate("/");
	};

	const navItems = [
		{ title: "Home", path: "/" },
		...(user ? [{ title: "Book Meal", path: "/book-meal" }] : []),
	];

	const userMenuItems = [
		{
			title: "Dashboard",
			path: user?.role === "admin" ? "/admin" : "/dashboard",
			onClick: handleCloseUserMenu,
		},
		{ title: "Logout", onClick: handleLogout },
	];

	const drawer = (
		<Box
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
			sx={{ width: 250 }}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					p: 2,
				}}
			>
				<RestaurantMenuIcon sx={{ mr: 1, color: "primary.main" }} />
				<Typography
					variant="h6"
					component="div"
					color="primary.main"
					fontWeight={700}
				>
					Rotary Meals
				</Typography>
			</Box>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem
						button
						component={RouterLink}
						to={item.path}
						key={item.title}
					>
						<ListItemText primary={item.title} />
					</ListItem>
				))}
			</List>
			<Divider />
			{!user ? (
				<Box sx={{ p: 2 }}>
					<Button
						component={RouterLink}
						to="/login"
						variant="contained"
						color="primary"
						fullWidth
						sx={{ mb: 1 }}
					>
						Login
					</Button>
					<Button
						component={RouterLink}
						to="/register"
						variant="outlined"
						color="primary"
						fullWidth
					>
						Register
					</Button>
				</Box>
			) : (
				<List>
					{userMenuItems.map((item) => (
						<ListItem
							button
							component={item.path ? RouterLink : "button"}
							to={item.path}
							onClick={item.onClick}
							key={item.title}
						>
							<ListItemText primary={item.title} />
						</ListItem>
					))}
				</List>
			)}
		</Box>
	);

	return (
		<AppBar
			position="sticky"
			color="default"
			elevation={1}
			sx={{ backgroundColor: "white" }}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{/* Logo for desktop */}
					<RestaurantMenuIcon
						sx={{
							display: { xs: "none", md: "flex" },
							mr: 1,
							color: "primary.main",
						}}
					/>
					<Typography
						variant="h6"
						noWrap
						component={RouterLink}
						to="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".1rem",
							color: "primary.main",
							textDecoration: "none",
						}}
					>
						ROTARY MEALS
					</Typography>

					{/* Mobile menu button */}
					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="menu"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={toggleDrawer(true)}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Drawer
							anchor="left"
							open={drawerOpen}
							onClose={toggleDrawer(false)}
						>
							{drawer}
						</Drawer>
					</Box>

					{/* Logo for mobile */}
					<RestaurantMenuIcon
						sx={{
							display: { xs: "flex", md: "none" },
							mr: 1,
							color: "primary.main",
						}}
					/>
					<Typography
						variant="h6"
						noWrap
						component={RouterLink}
						to="/"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".1rem",
							color: "primary.main",
							textDecoration: "none",
						}}
					>
						ROTARY MEALS
					</Typography>

					{/* Desktop navigation links */}
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{navItems.map((item) => (
							<Button
								key={item.title}
								component={RouterLink}
								to={item.path}
								sx={{ my: 2, color: "text.primary", display: "block", mx: 1 }}
							>
								{item.title}
							</Button>
						))}
					</Box>

					{/* User menu or login/register buttons */}
					<Box sx={{ flexGrow: 0 }}>
						{user ? (
							<>
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar alt={user.name} src="/static/avatar.jpg">
											{user.name ? (
												user.name.charAt(0).toUpperCase()
											) : (
												<AccountCircleIcon />
											)}
										</Avatar>
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: "45px" }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{userMenuItems.map((item) => (
										<MenuItem
											key={item.title}
											component={item.path ? RouterLink : undefined}
											to={item.path}
											onClick={item.onClick}
										>
											<Typography textAlign="center">{item.title}</Typography>
										</MenuItem>
									))}
								</Menu>
							</>
						) : (
							<Box sx={{ display: { xs: "none", md: "flex" } }}>
								<Button
									component={RouterLink}
									to="/login"
									sx={{ color: "text.primary", mx: 1 }}
								>
									Login
								</Button>
								<Button
									component={RouterLink}
									to="/register"
									variant="contained"
									color="primary"
									sx={{ mx: 1 }}
								>
									Register
								</Button>
							</Box>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
