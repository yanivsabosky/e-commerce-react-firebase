 // User Account Page
import { useState, useEffect, useCallback  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Logout as LogoutAction, LoginSuccess } from '../Store/authSlice'
import { useNavigate } from 'react-router-dom'

import { db, auth } from '../Data'
import { doc, updateDoc } from 'firebase/firestore'
import { updatePassword } from 'firebase/auth'

import {
  Container,
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Alert,
  Stack,
  Divider,
} from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

function UserAcount() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)

  const [fullname, setFullname] = useState('')
  const [allowOthersToSeeMyOrders, setAllowOthersToSeeMyOrders] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Redux data
  useEffect(() => {
    if (authState) {
      setFullname(authState.fullname || '')
      setAllowOthersToSeeMyOrders(
        authState.allowOthersToSeeMyOrders ?? false
      )
    }
  }, [authState])

  async function handleSave(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      // Validation
      if (newPassword || confirmPassword) {
        if (newPassword.length < 6) {
          throw new Error('Password must be at least 6 characters')
        }
        if (newPassword !== confirmPassword) {
          throw new Error('Passwords do not match')
        }
      }

      if (!authState.uid) {
        throw new Error('User not logged in')
      }

      // Update Doc on firebase
      const userRef = doc(db, 'users', authState.uid)
      const updateData = {
        fullname,
        allowOthersToSeeMyOrders,
      }

      await updateDoc(userRef, updateData)

      // Update Password on FireBase
      if (newPassword) {
        const currentUser = auth.currentUser
        if (currentUser) {
          await updatePassword(currentUser, newPassword)
        }
      }

      // 4. Update Redux (authSlice)
      dispatch(
        LoginSuccess({
          uid: authState.uid,
          fullname,
          email: authState.email,
          isAdmin: authState.isAdmin,
          allowOthersToSeeMyOrders,
        })
      )

      setSuccess('Details saved successfully')
      setNewPassword('')
      setConfirmPassword('')

    } catch (err) {
      setError(err.message || 'Something went wrong')
    }
  }

  function handleLogout() {
    dispatch(LogoutAction())
    navigate('/')
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 6,
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
          {/* Header with icon */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <AccountCircle
              sx={{ fontSize: 64, color: 'primary.main', mb: 1 }}
            />
            <Typography component="h1" variant="h4" fontWeight="bold">
              My Account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Manage your personal details and privacy settings
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSave}>
            <Stack spacing={2}>
              {/* Full name */}
              <TextField
                label="Full Name"
                fullWidth
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />

              {/* Email – Reading Only*/}
              <TextField
                label="Email"
                fullWidth
                value={authState.email}
                disabled
              />

              <Divider sx={{ my: 1 }} />

              {/* Password section */}
              <Typography variant="subtitle1" fontWeight="bold">
                Change Password (optional)
              </Typography>

              <TextField
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Divider sx={{ my: 1 }} />

              {/* Allow others to see my stats */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allowOthersToSeeMyOrders}
                    onChange={(e) =>
                      setAllowOthersToSeeMyOrders(e.target.checked)
                    }
                    color="primary"
                  />
                }
                label="Allow others to see my order statistics"
              />

              {/* Buttons */}
              <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 2, justifyContent: 'space-between' }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ flex: 1 }}
                >
                  Save Changes
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleLogout}
                  sx={{ flexBasis: '30%' }}
                >
                  Logout
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default UserAcount




