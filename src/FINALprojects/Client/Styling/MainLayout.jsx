// Main layout wrapper for the application
// Provides consistent Navbar, Footer and page structure
import { Box } from '@mui/material'
import Navbar from './Navbar'
import Footer from './Footer'

function MainLayout({ children }) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh' 
      }}
    >
      <Navbar />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          py: 3,
          backgroundColor: 'background.default'
        }}
      >
        {children}
      </Box>
      
      <Footer />
    </Box>
  )
}

export default MainLayout