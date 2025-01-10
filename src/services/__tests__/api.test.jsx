import MockAdapter from 'axios-mock-adapter'
import api from '../api'

describe('API Service', () => {
  const mock = new MockAdapter(api)

  afterEach(() => {
    mock.reset()
  })

  it('should fetch currencies successfully', async () => {
    const mockData = [
      { id: 1, code: 'USD', name: 'United States Dollar', rate: 1.0 },
      { id: 2, code: 'EUR', name: 'Euro', rate: 0.85 },
    ]
    mock.onGet('/currencies/').reply(200, mockData)

    const response = await api.get('/currencies/')
    expect(response.data).toEqual(mockData)
  })

  it('should handle errors in fetching currencies', async () => {
    mock.onGet('/currencies/').reply(500)

    await expect(api.get('/currencies/')).rejects.toThrow()
  })
})
