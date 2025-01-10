import { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { Container, TextField, Button, Typography } from '@mui/material'

const ConvertCurrency = () => {
  const [formData, setFormData] = useState({
    from_currency: '',
    to_currency: '',
    amount: '',
  })
  const [result, setResult] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    api
      .post('/convert/', formData)
      .then((response) => setResult(response.data))
      .catch((error) => console.error(error))
  }

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Convert Currency
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label='From Currency'
          name='from_currency'
          value={formData.from_currency}
          onChange={handleChange}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='To Currency'
          name='to_currency'
          value={formData.to_currency}
          onChange={handleChange}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='Amount'
          name='amount'
          value={formData.amount}
          onChange={handleChange}
          fullWidth
          margin='normal'
          type='number'
          required
        />
        <Button type='submit' variant='contained' color='primary' fullWidth>
          Convert
        </Button>
      </form>
      {result && (
        <Typography variant='h6' gutterBottom>
          Converted Amount: {result.converted_amount} (Rate:{' '}
          {result.conversion_rate})
        </Typography>
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

export default ConvertCurrency
