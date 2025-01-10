import { Link as RouterLink } from 'react-router-dom'
import { Container, Typography, Button, Box } from '@mui/material'

const MainScreen = () => (
  <Container>
    <Typography variant='h3' align='center' gutterBottom>
      Currency Converter
    </Typography>
    <Box display='flex' flexDirection='column' alignItems='center' gap={2}>
      <Button
        variant='contained'
        color='primary'
        component={RouterLink}
        to='/currencies'
      >
        View Currencies
      </Button>
      <Button
        variant='contained'
        color='secondary'
        component={RouterLink}
        to='/convert'
      >
        Convert Currency
      </Button>
      <Button
        variant='contained'
        color='primary'
        component={RouterLink}
        to='/conversion-logs'
      >
        View Conversion Logs
      </Button>
      <Button
        variant='contained'
        color='secondary'
        component={RouterLink}
        to='/historical-rates'
      >
        Fetch Historical Rates
      </Button>
    </Box>
  </Container>
)

export default MainScreen
