// Top navigation bar
// Renders different menus based on user role (admin / regular user)
// Displays cart indicator and logout action
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box } from '@mui/material'
import { ShoppingCart, Logout } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Logout as LogoutAction } from "../Store/authSlice"


function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const cartItems = useSelector(state => state.cart.items)
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    dispatch(LogoutAction())
    navigate('/')
  }

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        {/* Logo */}
        <Typography 
          variant="h6" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate(auth.isAdmin ? '/admin' : '/user')}
        >
          {auth.isAdmin ? 'Admin Panel' : 'MyShop'}
        </Typography>

        {/* Navigation Links */}
        {auth.isAdmin ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" onClick={() => navigate('/admin/categories')}>
              Categories
            </Button>
            <Button color="inherit" onClick={() => navigate('/admin/customers')}>
              Customers
            </Button>
            <Button color="inherit" onClick={() => navigate('/admin/products')}>
              Products
            </Button>
            <Button color="inherit" onClick={() => navigate('/admin/statistics')}>
              Statistics
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button color="inherit" onClick={() => navigate('/user/products')}>
              Products
            </Button>
            <Button color="inherit" onClick={() => navigate('/user/my-orders')}>
              My Orders
            </Button>
            <Button color="inherit" onClick={() => navigate('/user/acount')}>
              Account
            </Button>
            
            {/* Cart Icon */}
            <IconButton 
              color="inherit"
              onClick={() => navigate('/user/cart')}
            >
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Box>
        )}

        {/* Logout */}
        <IconButton color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar