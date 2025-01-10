import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import ConversionLogView from '../ConversionLogView'
import MockAdapter from 'axios-mock-adapter'
import api from '../../services/api'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

const mock = new MockAdapter(api)

describe('ConversionLogView Component', () => {
  it('should display conversion logs', async () => {
    const navigate = jest.fn()
    useNavigate.mockReturnValue(navigate)

    mock.onGet('/conversion-logs/').reply(200, [
      {
        id: 1,
        from_currency: 'USD',
        to_currency: 'EUR',
        amount: 100,
        converted_amount: 85,
        conversion_rate: 0.85,
        timestamp: '2025-01-09T12:00:00Z',
      },
    ])

    render(<ConversionLogView />)

    await waitFor(() => {
      expect(screen.getByText('USD')).toBeInTheDocument()
      expect(screen.getByText('85')).toBeInTheDocument()
    })
  })
})
