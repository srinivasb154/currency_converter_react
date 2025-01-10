import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import HistoricalRatesView from '../HistoricalRatesView'
import MockAdapter from 'axios-mock-adapter'
import api from '../../services/api'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

const mock = new MockAdapter(api)

describe('HistoricalRatesView Component', () => {
  it('should fetch and display historical rates', async () => {
    const navigate = jest.fn()
    useNavigate.mockReturnValue(navigate)

    mock.onPost('/historical-rates/').reply(200, [
      { code: 'USD', rate: 1.0 },
      { code: 'EUR', rate: 0.85 },
    ])

    render(<HistoricalRatesView />)

    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: '2025-01-01' },
    })
    fireEvent.click(screen.getByText(/Fetch Rates/i))

    await waitFor(() => {
      expect(screen.getByText('USD')).toBeInTheDocument()
      expect(screen.getByText('0.85')).toBeInTheDocument()
    })
  })
})
