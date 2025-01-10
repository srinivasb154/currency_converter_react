import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import MainScreen from './components/MainScreen'
import CurrencyList from './components/CurrencyList'
import ConvertCurrency from './components/ConvertCurrency'
import ConversionLogView from './components/ConversionLogView'
import HistoricalRatesView from './components/HistoricalRatesView'
import NotFound from './pages/NotFound'
import theme from './theme'

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path='/' element={<MainScreen />} /> {/* Default view */}
        <Route path='/currencies' element={<CurrencyList />} />
        <Route path='/convert' element={<ConvertCurrency />} />
        <Route path='/conversion-logs' element={<ConversionLogView />} />
        <Route path='/historical-rates' element={<HistoricalRatesView />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  </ThemeProvider>
)

export default App
