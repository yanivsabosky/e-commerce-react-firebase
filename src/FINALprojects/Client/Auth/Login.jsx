// Login page component
// Responsible for authenticating existing users and redirecting them
// based on their role (admin / regular user)

import { useState } from 'react'
import { LogginUser } from "./Services/loginService"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { LoginSuccess } from "../Store/authSlice"
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Alert
} from '@mui/material'
import { Login as LoginIcon } from '@mui/icons-material'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Local state for user credentials
  const [user, setUser] = useState({
    email: "",
    Password: ""
  })

  // Error message displayed on failed login
  const [error, setError] = useState("")

    // LOGIN HANDLER
  async function loginU(e) {
    e.preventDefault()
    setError("")

    try {
      const data = await LogginUser(user.email, user.Password)

      // Invalid credentials
      if (!data) {
        setError("Wrong email or password")
        return
      }

      // Save user in Redux store
      dispatch(LoginSuccess(data))

      // Redirect user based on role
      if (data.isAdmin) navigate("/admin")
      else navigate("/user")

    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <LoginIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography component="h1" variant="h4" fontWeight="bold">
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Sign in to continue to MyShop
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={loginU}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.Password}
              onChange={(e) => setUser({ ...user, Password: e.target.value })}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Sign In
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  underline="hover"
                  sx={{ fontWeight: 'medium' }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default Login


