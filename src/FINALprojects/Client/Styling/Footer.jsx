// Application footer component
// Displayed across all pages using MainLayout
// Contains static information and legal links
import { Box, Container, Typography, Link } from '@mui/material'

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} MyShop. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center">
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            Privacy Policy
          </Link>
          |
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer