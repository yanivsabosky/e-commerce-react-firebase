// Register page component
// Handles user registration, validation, Firebase Auth creation
// and Firestore user document creation

import { useState } from 'react'
import { validateRegister, createAuthUser, createUserDocument } from "./Services/authService"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { RegisterSuccess } from "../Store/authSlice"
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  FormControlLabel,
  Checkbox,
  Alert
} from '@mui/material'
import { PersonAdd as PersonAddIcon } from '@mui/icons-material'

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

   // Registration form state
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    Password: "",
    ConfirmPassword: "",
    isAdmin: false,
    allowOthersToSeeMyOrders: false
  })

  // Error message state 
  const [error, setError] = useState("")

   // REGISTER HANDLER
  async function registerU(e) {
    e.preventDefault()
    setError("")

    try {
      if (validateRegister(user) !== "success") {
        throw new Error("Some fields are incorrect")
      }

      const userCredential = await createAuthUser(user.email, user.Password)

      if (!userCredential) {
        throw new Error("Failed to create user in Firebase Auth")
      }

      const uid = userCredential.user.uid
      await createUserDocument(uid, user)

       // Save user in Redux store  
      dispatch(RegisterSuccess({
        uid,
        fullname: user.fullname,
        email: user.email,
        isAdmin: user.isAdmin,
        allowOthersToSeeMyOrders: user.allowOthersToSeeMyOrders
      }))

      // Redirect to user area after successful registration
      navigate("/user")

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
            <PersonAddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography component="h1" variant="h4" fontWeight="bold">
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Join MyShop today
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={registerU}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullname"
              label="Full Name"
              name="fullname"
              autoFocus
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              value={user.Password}
              onChange={(e) => setUser({ ...user, Password: e.target.value })}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={user.ConfirmPassword}
              onChange={(e) => setUser({ ...user, ConfirmPassword: e.target.value })}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={user.allowOthersToSeeMyOrders}
                  onChange={(e) => setUser({ ...user, allowOthersToSeeMyOrders: e.target.checked })}
                  color="primary"
                />
              }
              label="Allow others to see my order statistics"
              sx={{ mt: 1 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Sign Up
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/"
                  underline="hover"
                  sx={{ fontWeight: 'medium' }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default Register

