import { Container, Typography } from '@mui/material'
import CurrencyList from '../components/CurrencyList'
import ConvertCurrency from '../components/ConvertCurrency'

const HomePage = () => (
  <Container>
    <Typography variant='h2' align='center' gutterBottom>
      Currency Converter
    </Typography>
    <CurrencyList />
    <ConvertCurrency />
  </Container>
)

export default HomePage
