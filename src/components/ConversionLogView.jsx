import { useEffect, useState } from 'react'
import api from '../services/api'
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
import { useNavigate } from 'react-router-dom'

const ConversionLogView = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api
      .get('/conversion-logs/')
      .then((response) => setLogs(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <CircularProgress />

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Conversion Logs
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>From Currency</TableCell>
            <TableCell>To Currency</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Converted Amount</TableCell>
            <TableCell>Conversion Rate</TableCell>
            <TableCell>Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.from_currency}</TableCell>
              <TableCell>{log.to_currency}</TableCell>
              <TableCell>{log.amount}</TableCell>
              <TableCell>{log.converted_amount}</TableCell>
              <TableCell>{log.conversion_rate}</TableCell>
              <TableCell>{log.timestamp}</TableCell>
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

export default ConversionLogView
