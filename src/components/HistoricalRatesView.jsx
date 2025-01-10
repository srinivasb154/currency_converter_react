import { useState } from 'react'
import api from '../services/api'
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const HistoricalRatesView = () => {
  const [date, setDate] = useState('')
  const [rates, setRates] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchRates = () => {
    setLoading(true)
    api
      .post('/historical-rates/', { date })
      .then((response) => setRates(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Historical Rates
      </Typography>
      <TextField
        label='Date (YYYY-MM-DD)'
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        margin='normal'
        required
      />
      <Button
        variant='contained'
        color='primary'
        onClick={fetchRates}
        style={{ marginBottom: '16px' }}
      >
        Fetch Rates
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell>Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rates.map((rate, index) => (
              <TableRow key={index}>
                <TableCell>{rate.code}</TableCell>
                <TableCell>{rate.rate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Button
        variant='contained'
        color='primary'
        onClick={() => navigate('/')}
        style={{ marginTop: '16px' }}
      >
        Back to Main
      </Button>
    </Container>
  )
}

export default HistoricalRatesView
