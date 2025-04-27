import { Box, Container, Link, Typography, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<Box
			component="footer"
			sx={{
				bgcolor: "#0e2e47",
				color: "white",
				py: 3,
				mt: "auto",
			}}
		>
			<Container maxWidth="lg">
				<Stack
					direction={{ xs: "column", sm: "row" }}
					justifyContent="space-between"
					alignItems="center"
					spacing={{ xs: 2, sm: 0 }}
				>
					<Typography variant="body2" sx={{ opacity: 0.9 }}>
						© {currentYear} Rotary Club of Unjha
					</Typography>

					<Typography variant="body2" sx={{ opacity: 0.9 }}>
						+91 98765 43210 | info@rotaryunjha.org
					</Typography>

					<Stack direction="row" spacing={2}>
						<Link href="https://facebook.com" target="_blank" color="inherit">
							<FacebookIcon fontSize="small" />
						</Link>
						<Link href="https://twitter.com" target="_blank" color="inherit">
							<TwitterIcon fontSize="small" />
						</Link>
						<Link href="https://instagram.com" target="_blank" color="inherit">
							<InstagramIcon fontSize="small" />
						</Link>
						<Link href="https://linkedin.com" target="_blank" color="inherit">
							<LinkedInIcon fontSize="small" />
						</Link>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
};

export default Footer;
