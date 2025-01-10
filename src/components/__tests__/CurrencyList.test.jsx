import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import CurrencyList from '../CurrencyList'
import MockAdapter from 'axios-mock-adapter'
import api from '../../services/api'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

const mock = new MockAdapter(api)

describe('CurrencyList Component', () => {
  it('should display a list of currencies', async () => {
    const navigate = jest.fn()
    useNavigate.mockReturnValue(navigate)

    mock.onGet('/currencies/').reply(200, [
      { id: 1, code: 'USD', name: 'United States Dollar', rate: 1.0 },
      { id: 2, code: 'EUR', name: 'Euro', rate: 0.85 },
    ])

    render(<CurrencyList />)

    await waitFor(() => {
      expect(screen.getByText('USD')).toBeInTheDocument()
      expect(screen.getByText('Euro')).toBeInTheDocument()
    })
  })

  it('should show a loading indicator while fetching data', () => {
    render(<CurrencyList />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
