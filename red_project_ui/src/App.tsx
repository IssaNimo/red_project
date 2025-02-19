import { useEffect, useState } from 'react'
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper,
  CircularProgress,
  Alert
} from '@mui/material'
import './App.css'
import api from './lib/api'

function App() {
  const [message, setMessage] = useState('Connecting to API...')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.get('/api/test')
      .then(response => {
        console.log('API Response:', response.data)
        setMessage(response.data.message)
        setError(null)
      })
      .catch(error => {
        console.error('API Error:', error.response?.data || error.message)
        setMessage('Error connecting to API')
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            React + AdonisJS App
          </Typography>
          
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ my: 2 }}>
              {error}
            </Alert>
          ) : (
            <Alert severity="success" sx={{ my: 2 }}>
              {message}
            </Alert>
          )}

          <Button 
            variant="contained" 
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Refresh Connection
          </Button>
        </Paper>
      </Box>
    </Container>
  )
}

export default App
