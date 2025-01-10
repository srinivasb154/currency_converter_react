import { useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material'

const CurrencyList = () => {
  const [currencies, setCurrencies] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api
      .get('/currencies/')
      .then((response) => setCurrencies(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <CircularProgress />

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Available Currencies
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencies.map((currency) => (
            <TableRow key={currency.id}>
              <TableCell>{currency.code}</TableCell>
              <TableCell>{currency.name}</TableCell>
              <TableCell>{currency.rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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

export default CurrencyList
